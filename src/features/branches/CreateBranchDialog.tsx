import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { useMutation } from '@tanstack/react-query';
import {
    Dialog, DialogTitle, DialogContent, DialogActions,
    Button, TextField, Stack, Typography, IconButton,
} from '@mui/material';
import { Close } from '@mui/icons-material';
import { branchApi, CreateBranchPayload } from './api/branch.api';

const schema = z.object({
    name: z.string().min(1, 'Tên cơ sở là bắt buộc'),
    code: z.string().min(1, 'Mã cơ sở là bắt buộc').max(20, 'Mã tối đa 20 ký tự'),
    address: z.string().optional(),
    phone: z.string().optional(),
    email: z.string().optional(),
});

type FormValues = z.infer<typeof schema>;

interface Props {
    open: boolean;
    onClose: () => void;
    onSuccess: () => void;
    onError: (msg: string) => void;
}

export const CreateBranchDialog = ({ open, onClose, onSuccess, onError }: Props) => {
    const { register, handleSubmit, reset, formState: { errors } } = useForm<FormValues>({
        resolver: zodResolver(schema),
        defaultValues: { name: '', code: '', address: '', phone: '', email: '' },
    });

    const mutation = useMutation({
        mutationFn: (payload: CreateBranchPayload) => branchApi.create(payload),
        onSuccess: () => {
            reset();
            onSuccess();
        },
        onError: (err: any) => {
            onError(err?.response?.data?.message || 'Có lỗi xảy ra, vui lòng thử lại.');
        },
    });

    const onSubmit = (data: FormValues) => {
        mutation.mutate({
            name: data.name,
            code: data.code.toUpperCase(),
            address: data.address || undefined,
            phone: data.phone || undefined,
            email: data.email || undefined,
        });
    };

    const handleClose = () => {
        if (mutation.isPending) return;
        reset();
        onClose();
    };

    return (
        <Dialog open={open} onClose={handleClose} maxWidth="sm" fullWidth>
            <DialogTitle sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', pb: 1 }}>
                <Typography variant="h4" component="span">Thêm Cơ sở Mới</Typography>
                <IconButton size="small" onClick={handleClose} disabled={mutation.isPending}>
                    <Close />
                </IconButton>
            </DialogTitle>

            <form onSubmit={handleSubmit(onSubmit)}>
                <DialogContent dividers sx={{ py: 3 }}>
                    <Stack spacing={2.5}>
                        <TextField
                            label="Tên cơ sở *"
                            placeholder="VD: Cơ sở Hà Nội"
                            fullWidth
                            {...register('name')}
                            error={!!errors.name}
                            helperText={errors.name?.message}
                        />
                        <TextField
                            label="Mã cơ sở *"
                            placeholder="VD: HN01"
                            fullWidth
                            {...register('code')}
                            error={!!errors.code}
                            helperText={errors.code?.message ?? 'Mã định danh duy nhất, không thể thay đổi sau khi tạo'}
                            inputProps={{ style: { textTransform: 'uppercase' } }}
                        />
                        <TextField
                            label="Địa chỉ"
                            placeholder="VD: 123 Phố Huế, Hà Nội"
                            fullWidth
                            {...register('address')}
                        />
                        <Stack direction="row" spacing={2}>
                            <TextField
                                label="Số điện thoại"
                                placeholder="VD: 0901234567"
                                fullWidth
                                {...register('phone')}
                            />
                            <TextField
                                label="Email"
                                placeholder="VD: hanoi@lcms.vn"
                                type="email"
                                fullWidth
                                {...register('email')}
                                error={!!errors.email}
                                helperText={errors.email?.message}
                            />
                        </Stack>
                    </Stack>
                </DialogContent>

                <DialogActions sx={{ px: 3, py: 2, gap: 1 }}>
                    <Button onClick={handleClose} disabled={mutation.isPending}>
                        Hủy
                    </Button>
                    <Button type="submit" variant="contained" disabled={mutation.isPending}>
                        {mutation.isPending ? 'Đang tạo...' : 'Tạo cơ sở'}
                    </Button>
                </DialogActions>
            </form>
        </Dialog>
    );
};
