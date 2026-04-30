import { useEffect } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { useMutation } from '@tanstack/react-query';
import {
    Dialog, DialogTitle, DialogContent, DialogActions,
    Button, TextField, Stack, Typography, IconButton, Box, Chip,
} from '@mui/material';
import { Close } from '@mui/icons-material';
import { branchApi, Branch, UpdateBranchPayload } from './api/branch.api';

const schema = z.object({
    name: z.string().min(1, 'Tên cơ sở là bắt buộc'),
    address: z.string().optional(),
    phone: z.string().optional(),
    email: z.string().optional(),
});

type FormValues = z.infer<typeof schema>;

interface Props {
    branch: Branch | null;
    onClose: () => void;
    onSuccess: () => void;
    onError: (msg: string) => void;
}

export const EditBranchDialog = ({ branch, onClose, onSuccess, onError }: Props) => {
    const { register, handleSubmit, reset, formState: { errors } } = useForm<FormValues>({
        resolver: zodResolver(schema),
    });

    useEffect(() => {
        if (branch) {
            reset({
                name: branch.name,
                address: branch.address ?? '',
                phone: branch.phone ?? '',
                email: branch.email ?? '',
            });
        }
    }, [branch, reset]);

    const mutation = useMutation({
        mutationFn: (payload: UpdateBranchPayload) => branchApi.update(branch!._id, payload),
        onSuccess: () => {
            onSuccess();
        },
        onError: (err: any) => {
            onError(err?.response?.data?.message || 'Có lỗi xảy ra, vui lòng thử lại.');
        },
    });

    const onSubmit = (data: FormValues) => {
        mutation.mutate({
            name: data.name,
            address: data.address || undefined,
            phone: data.phone || undefined,
            email: data.email || undefined,
        });
    };

    const handleClose = () => {
        if (mutation.isPending) return;
        onClose();
    };

    return (
        <Dialog open={!!branch} onClose={handleClose} maxWidth="sm" fullWidth>
            <DialogTitle sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', pb: 1 }}>
                <Typography variant="h4" component="span">Chỉnh sửa Cơ sở</Typography>
                <IconButton size="small" onClick={handleClose} disabled={mutation.isPending}>
                    <Close />
                </IconButton>
            </DialogTitle>

            <form onSubmit={handleSubmit(onSubmit)}>
                <DialogContent dividers sx={{ py: 3 }}>
                    <Stack spacing={2.5}>
                        <Box>
                            <Typography variant="caption" color="text.secondary" display="block" mb={1}>
                                MÃ CƠ SỞ (không thể thay đổi)
                            </Typography>
                            <Chip label={branch?.code} color="primary" variant="outlined" size="small" />
                        </Box>

                        <TextField
                            label="Tên cơ sở *"
                            fullWidth
                            {...register('name')}
                            error={!!errors.name}
                            helperText={errors.name?.message}
                        />
                        <TextField
                            label="Địa chỉ"
                            fullWidth
                            {...register('address')}
                        />
                        <Stack direction="row" spacing={2}>
                            <TextField
                                label="Số điện thoại"
                                fullWidth
                                {...register('phone')}
                            />
                            <TextField
                                label="Email"
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
                        {mutation.isPending ? 'Đang lưu...' : 'Lưu thay đổi'}
                    </Button>
                </DialogActions>
            </form>
        </Dialog>
    );
};
