import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import {
    Dialog, DialogTitle, DialogContent, DialogActions,
    Button, TextField, Stack, Typography, IconButton,
} from '@mui/material';
import { Close } from '@mui/icons-material';
import { studentApi } from '../api/student.api';
import { createStudentSchema, type CreateStudentFormValues } from '../schemas/student.schemas';
import { getApiError } from '@/lib/apiError';

interface Props {
    open: boolean;
    onClose: () => void;
    onSuccess: () => void;
    onError: (msg: string) => void;
}

export function CreateStudentDialog({ open, onClose, onSuccess, onError }: Props) {
    const queryClient = useQueryClient();
    const { register, handleSubmit, reset, formState: { errors } } = useForm<CreateStudentFormValues>({
        resolver: zodResolver(createStudentSchema),
        defaultValues: { full_name: '', email: '', phone: '', date_of_birth: '' },
    });

    const mutation = useMutation({
        mutationFn: studentApi.create,
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ['students'] });
            reset();
            onSuccess();
        },
        onError: (err: unknown) => onError(getApiError(err)),
    });

    const handleClose = () => {
        if (mutation.isPending) return;
        reset();
        onClose();
    };

    const onSubmit = (data: CreateStudentFormValues) => {
        mutation.mutate({
            full_name: data.full_name,
            email: data.email || undefined,
            phone: data.phone || undefined,
            date_of_birth: data.date_of_birth || undefined,
        });
    };

    return (
        <Dialog open={open} onClose={handleClose} maxWidth="sm" fullWidth>
            <DialogTitle sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', pb: 1 }}>
                <Typography variant="h4" component="span">Thêm Học sinh Mới</Typography>
                <IconButton size="small" onClick={handleClose} disabled={mutation.isPending}>
                    <Close />
                </IconButton>
            </DialogTitle>

            <form onSubmit={handleSubmit(onSubmit)}>
                <DialogContent dividers sx={{ py: 3 }}>
                    <Stack spacing={2.5}>
                        <TextField
                            label="Họ và tên *"
                            placeholder="VD: Nguyễn Văn An"
                            fullWidth
                            {...register('full_name')}
                            error={!!errors.full_name}
                            helperText={errors.full_name?.message}
                        />
                        <TextField
                            label="Ngày sinh"
                            type="date"
                            fullWidth
                            {...register('date_of_birth')}
                            slotProps={{ inputLabel: { shrink: true } }}
                        />
                        <Stack direction="row" spacing={2}>
                            <TextField label="Số điện thoại" placeholder="VD: 0901234567" fullWidth {...register('phone')} />
                            <TextField label="Email" placeholder="VD: an@example.com" type="email" fullWidth {...register('email')} />
                        </Stack>
                    </Stack>
                </DialogContent>

                <DialogActions sx={{ px: 3, py: 2, gap: 1 }}>
                    <Button onClick={handleClose} disabled={mutation.isPending}>Hủy</Button>
                    <Button type="submit" variant="contained" disabled={mutation.isPending}>
                        {mutation.isPending ? 'Đang tạo...' : 'Thêm học sinh'}
                    </Button>
                </DialogActions>
            </form>
        </Dialog>
    );
}
