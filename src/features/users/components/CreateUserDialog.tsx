import { useForm, Controller } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import {
    Dialog, DialogTitle, DialogContent, DialogActions,
    Button, TextField, Stack, Typography, IconButton, MenuItem,
} from '@mui/material';
import { Close } from '@mui/icons-material';
import { userApi } from '../api/user.api';
import { createUserSchema, ROLE_OPTIONS, type CreateUserFormValues } from '../schemas/user.schemas';
import { getApiError } from '@/lib/apiError';
import { useAuthStore } from '@/store/authStore';

interface Props {
    open: boolean;
    onClose: () => void;
    onSuccess: () => void;
    onError: (msg: string) => void;
}

export function CreateUserDialog({ open, onClose, onSuccess, onError }: Props) {
    const queryClient = useQueryClient();
    const authUser = useAuthStore(state => state.user);
    const { register, handleSubmit, reset, control, formState: { errors } } = useForm<CreateUserFormValues>({
        resolver: zodResolver(createUserSchema),
        defaultValues: { full_name: '', email: '', phone: '', role: 'STAFF', password: '' },
    });

    const mutation = useMutation({
        mutationFn: userApi.create,
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ['branch-users'] });
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

    const onSubmit = (data: CreateUserFormValues) => {
        mutation.mutate({
            full_name: data.full_name,
            email: data.email,
            phone: data.phone || undefined,
            role: data.role,
            password: data.password,
            branch_id: authUser?.branchId ?? undefined,
        });
    };

    return (
        <Dialog open={open} onClose={handleClose} maxWidth="sm" fullWidth>
            <DialogTitle sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', pb: 1 }}>
                <Typography variant="h4" component="span">Thêm Tài khoản Mới</Typography>
                <IconButton size="small" onClick={handleClose} disabled={mutation.isPending}>
                    <Close />
                </IconButton>
            </DialogTitle>

            <form onSubmit={handleSubmit(onSubmit)}>
                <DialogContent dividers sx={{ py: 3 }}>
                    <Stack spacing={2.5}>
                        <Controller
                            name="role"
                            control={control}
                            render={({ field }) => (
                                <TextField {...field} select label="Vai trò *" fullWidth error={!!errors.role} helperText={errors.role?.message}>
                                    {ROLE_OPTIONS.map(opt => (
                                        <MenuItem key={opt.value} value={opt.value}>{opt.label}</MenuItem>
                                    ))}
                                </TextField>
                            )}
                        />
                        <TextField
                            label="Họ và tên *" placeholder="VD: Nguyễn Văn A" fullWidth
                            {...register('full_name')} error={!!errors.full_name} helperText={errors.full_name?.message}
                        />
                        <TextField
                            label="Email *" placeholder="VD: nhanvien@lcms.vn" type="email" fullWidth
                            {...register('email')} error={!!errors.email} helperText={errors.email?.message}
                        />
                        <TextField label="Số điện thoại" placeholder="VD: 0901234567" fullWidth {...register('phone')} />
                        <TextField
                            label="Mật khẩu *" type="password" fullWidth
                            {...register('password')} error={!!errors.password}
                            helperText={errors.password?.message ?? 'Tối thiểu 6 ký tự'}
                        />
                    </Stack>
                </DialogContent>

                <DialogActions sx={{ px: 3, py: 2, gap: 1 }}>
                    <Button onClick={handleClose} disabled={mutation.isPending}>Hủy</Button>
                    <Button type="submit" variant="contained" disabled={mutation.isPending}>
                        {mutation.isPending ? 'Đang tạo...' : 'Thêm tài khoản'}
                    </Button>
                </DialogActions>
            </form>
        </Dialog>
    );
}
