import { useEffect } from 'react';
import { useForm, Controller } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import {
    Dialog, DialogTitle, DialogContent, DialogActions,
    Button, TextField, Stack, Typography, IconButton, Box, Chip, MenuItem,
} from '@mui/material';
import { Close } from '@mui/icons-material';
import { teacherApi } from '../api/teacher.api';
import { editTeacherSchema, GENDER_OPTIONS, type EditTeacherFormValues } from '../schemas/teacher.schemas';
import { getApiError } from '@/lib/apiError';
import type { Teacher } from '../types/teacher.types';

interface Props {
    teacher: Teacher | null;
    onClose: () => void;
    onSuccess: () => void;
    onError: (msg: string) => void;
}

export function EditTeacherDialog({ teacher, onClose, onSuccess, onError }: Props) {
    const queryClient = useQueryClient();
    const { register, handleSubmit, reset, control, formState: { errors } } = useForm<EditTeacherFormValues>({
        resolver: zodResolver(editTeacherSchema),
    });

    useEffect(() => {
        if (teacher) {
            reset({
                fullName: teacher.fullName,
                phone: teacher.phone ?? '',
                dateOfBirth: teacher.teacherInfo?.joinDate ?? '',
                gender: (teacher as { gender?: 'male' | 'female' | 'other' }).gender ?? undefined,
                subjects: teacher.teacherInfo?.subjects?.join(', ') ?? '',
                joinDate: teacher.teacherInfo?.joinDate ?? '',
            });
        }
    }, [teacher, reset]);

    const mutation = useMutation({
        mutationFn: (data: EditTeacherFormValues) => {
            const subjects = data.subjects
                ? data.subjects.split(',').map(s => s.trim()).filter(Boolean)
                : undefined;

            return teacherApi.update(teacher!._id, {
                fullName: data.fullName,
                phone: data.phone || undefined,
                dateOfBirth: data.dateOfBirth || undefined,
                gender: data.gender,
                teacherInfo: { subjects: subjects ?? [], joinDate: data.joinDate || undefined },
            });
        },
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ['teachers-list'] });
            onSuccess();
        },
        onError: (err: unknown) => onError(getApiError(err)),
    });

    const handleClose = () => {
        if (mutation.isPending) return;
        onClose();
    };

    return (
        <Dialog open={!!teacher} onClose={handleClose} maxWidth="sm" fullWidth>
            <DialogTitle sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', pb: 1 }}>
                <Typography variant="h4" component="span">Chỉnh sửa Giáo viên</Typography>
                <IconButton size="small" onClick={handleClose} disabled={mutation.isPending}>
                    <Close />
                </IconButton>
            </DialogTitle>

            <form onSubmit={handleSubmit(data => mutation.mutate(data))}>
                <DialogContent dividers sx={{ py: 3 }}>
                    <Stack spacing={2.5}>
                        {teacher?.userCode && (
                            <Box>
                                <Typography variant="caption" color="text.secondary" display="block" mb={1}>
                                    MÃ GIÁO VIÊN
                                </Typography>
                                <Chip label={teacher.userCode} variant="outlined" size="small" />
                            </Box>
                        )}
                        <TextField
                            label="Họ và tên *" fullWidth {...register('fullName')}
                            error={!!errors.fullName} helperText={errors.fullName?.message}
                        />
                        <TextField label="Số điện thoại" fullWidth {...register('phone')} />
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
                            label="Môn học" placeholder="VD: Toán, Lý, Hóa" fullWidth {...register('subjects')}
                            helperText="Nhập các môn học cách nhau bằng dấu phẩy"
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
                        {mutation.isPending ? 'Đang lưu...' : 'Lưu thay đổi'}
                    </Button>
                </DialogActions>
            </form>
        </Dialog>
    );
}
