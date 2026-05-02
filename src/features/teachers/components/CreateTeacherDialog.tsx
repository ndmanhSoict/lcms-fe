import { useForm, Controller } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import {
    Dialog, DialogTitle, DialogContent, DialogActions,
    Button, TextField, Stack, Typography, IconButton, MenuItem,
} from '@mui/material';
import { Close } from '@mui/icons-material';
import { teacherApi } from '../api/teacher.api';
import { createTeacherSchema, GENDER_OPTIONS, type CreateTeacherFormValues } from '../schemas/teacher.schemas';
import { getApiError } from '@/lib/apiError';

interface Props {
    open: boolean;
    onClose: () => void;
    onSuccess: () => void;
    onError: (msg: string) => void;
}

export function CreateTeacherDialog({ open, onClose, onSuccess, onError }: Props) {
    const queryClient = useQueryClient();
    const { register, handleSubmit, reset, control, formState: { errors } } = useForm<CreateTeacherFormValues>({
        resolver: zodResolver(createTeacherSchema),
        defaultValues: {
            fullName: '', email: '', phone: '', password: '',
            dateOfBirth: '', gender: undefined, subjects: '', joinDate: '',
        },
    });

    const mutation = useMutation({
        mutationFn: teacherApi.create,
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ['teachers-list'] });
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

    const onSubmit = (data: CreateTeacherFormValues) => {
        const subjects = data.subjects
            ? data.subjects.split(',').map(s => s.trim()).filter(Boolean)
            : undefined;

        mutation.mutate({
            fullName: data.fullName,
            email: data.email,
            phone: data.phone || undefined,
            password: data.password,
            dateOfBirth: data.dateOfBirth || undefined,
            gender: data.gender,
            teacherInfo: (subjects?.length || data.joinDate)
                ? { subjects, joinDate: data.joinDate || undefined }
                : undefined,
        });
    };

    return (
        <Dialog open={open} onClose={handleClose} maxWidth="sm" fullWidth>
            <DialogTitle sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', pb: 1 }}>
                <Typography variant="h4" component="span">Thêm Giáo viên Mới</Typography>
                <IconButton size="small" onClick={handleClose} disabled={mutation.isPending}>
                    <Close />
                </IconButton>
            </DialogTitle>

            <form onSubmit={handleSubmit(onSubmit)}>
                <DialogContent dividers sx={{ py: 3 }}>
                    <Stack spacing={2.5}>
                        <TextField
                            label="Họ và tên *" placeholder="VD: Nguyễn Thị Lan" fullWidth
                            {...register('fullName')} error={!!errors.fullName} helperText={errors.fullName?.message}
                        />
                        <TextField
                            label="Email *" placeholder="VD: lan@lcms.vn" type="email" fullWidth
                            {...register('email')} error={!!errors.email} helperText={errors.email?.message}
                        />
                        <TextField label="Số điện thoại" placeholder="VD: 0901234567" fullWidth {...register('phone')} />
                        <TextField
                            label="Mật khẩu *" type="password" fullWidth
                            {...register('password')} error={!!errors.password}
                            helperText={errors.password?.message ?? 'Tối thiểu 8 ký tự, có chữ hoa, chữ thường, số và ký tự đặc biệt'}
                        />
                        <TextField
                            label="Ngày sinh" type="date" fullWidth {...register('dateOfBirth')}
                            slotProps={{ inputLabel: { shrink: true } }}
                        />
                        <Controller
                            name="gender"
                            control={control}
                            render={({ field }) => (
                                <TextField {...field} value={field.value ?? ''} select label="Giới tính" fullWidth>
                                    <MenuItem value="">-- Chọn giới tính --</MenuItem>
                                    {GENDER_OPTIONS.map(opt => (
                                        <MenuItem key={opt.value} value={opt.value}>{opt.label}</MenuItem>
                                    ))}
                                </TextField>
                            )}
                        />
                        <TextField
                            label="Môn học" placeholder="VD: Toán, Lý, Hóa (cách nhau bằng dấu phẩy)"
                            fullWidth {...register('subjects')} helperText="Nhập các môn học cách nhau bằng dấu phẩy"
                        />
                        <TextField
                            label="Ngày vào làm" type="date" fullWidth {...register('joinDate')}
                            slotProps={{ inputLabel: { shrink: true } }}
                        />
                    </Stack>
                </DialogContent>

                <DialogActions sx={{ px: 3, py: 2, gap: 1 }}>
                    <Button onClick={handleClose} disabled={mutation.isPending}>Hủy</Button>
                    <Button type="submit" variant="contained" disabled={mutation.isPending}>
                        {mutation.isPending ? 'Đang tạo...' : 'Thêm giáo viên'}
                    </Button>
                </DialogActions>
            </form>
        </Dialog>
    );
}
