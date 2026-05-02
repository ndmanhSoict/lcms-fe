import { useEffect } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import {
    Dialog, DialogTitle, DialogContent, DialogActions,
    Button, TextField, Stack, Typography, IconButton, Box, Chip,
} from '@mui/material';
import { Close } from '@mui/icons-material';
import { userApi } from '../api/user.api';
import { editUserSchema, type EditUserFormValues } from '../schemas/user.schemas';
import { getApiError } from '@/lib/apiError';
import type { User } from '../types/user.types';

interface Props {
    user: User | null;
    onClose: () => void;
    onSuccess: () => void;
    onError: (msg: string) => void;
}

export function EditUserDialog({ user, onClose, onSuccess, onError }: Props) {
    const queryClient = useQueryClient();
    const { register, handleSubmit, reset, formState: { errors } } = useForm<EditUserFormValues>({
        resolver: zodResolver(editUserSchema),
    });

    useEffect(() => {
        if (user) {
            reset({ full_name: user.fullName, phone: user.phone ?? '', email: user.email });
        }
    }, [user, reset]);

    const mutation = useMutation({
        mutationFn: (data: EditUserFormValues) => userApi.update(user!._id, {
            full_name: data.full_name,
            phone: data.phone || undefined,
            email: data.email,
        }),
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ['branch-users'] });
            onSuccess();
        },
        onError: (err: unknown) => onError(getApiError(err)),
    });

    const handleClose = () => {
        if (mutation.isPending) return;
        onClose();
    };

    return (
        <Dialog open={!!user} onClose={handleClose} maxWidth="sm" fullWidth>
            <DialogTitle sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', pb: 1 }}>
                <Typography variant="h4" component="span">Chỉnh sửa Tài khoản</Typography>
                <IconButton size="small" onClick={handleClose} disabled={mutation.isPending}>
                    <Close />
                </IconButton>
            </DialogTitle>

            <form onSubmit={handleSubmit(data => mutation.mutate(data))}>
                <DialogContent dividers sx={{ py: 3 }}>
                    <Stack spacing={2.5}>
                        {user?.userCode && (
                            <Box>
                                <Typography variant="caption" color="text.secondary" display="block" mb={1}>
                                    MÃ TÀI KHOẢN
                                </Typography>
                                <Chip label={user.userCode} variant="outlined" size="small" />
                            </Box>
                        )}
                        <TextField
                            label="Họ và tên *" fullWidth {...register('full_name')}
                            error={!!errors.full_name} helperText={errors.full_name?.message}
                        />
                        <TextField
                            label="Email *" type="email" fullWidth {...register('email')}
                            error={!!errors.email} helperText={errors.email?.message}
                        />
                        <TextField label="Số điện thoại" fullWidth {...register('phone')} />
                    </Stack>
                </DialogContent>

                <DialogActions sx={{ px: 3, py: 2, gap: 1 }}>
                    <Button onClick={handleClose} disabled={mutation.isPending}>Hủy</Button>
                    <Button type="submit" variant="contained" disabled={mutation.isPending}>
                        {mutation.isPending ? 'Đang lưu...' : 'Lưu thay đổi'}
                    </Button>
                </DialogActions>
            </form>
        </Dialog>
    );
}
