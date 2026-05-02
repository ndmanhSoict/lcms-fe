import { useEffect } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import {
    Dialog, DialogTitle, DialogContent, DialogActions,
    Button, TextField, Stack, Typography, IconButton, Box, Chip,
} from '@mui/material';
import { Close } from '@mui/icons-material';
import { studentApi } from '../api/student.api';
import { editStudentSchema, type EditStudentFormValues } from '../schemas/student.schemas';
import { getStudentName } from '../utils/student.utils';
import { getApiError } from '@/lib/apiError';
import type { Student } from '../types/student.types';

interface Props {
    student: Student | null;
    onClose: () => void;
    onSuccess: () => void;
    onError: (msg: string) => void;
}

export function EditStudentDialog({ student, onClose, onSuccess, onError }: Props) {
    const queryClient = useQueryClient();
    const { register, handleSubmit, reset, formState: { errors } } = useForm<EditStudentFormValues>({
        resolver: zodResolver(editStudentSchema),
    });

    useEffect(() => {
        if (student) {
            reset({
                full_name: getStudentName(student),
                phone: student.phone ?? '',
                email: student.email ?? '',
                date_of_birth: '',
            });
        }
    }, [student, reset]);

    const mutation = useMutation({
        mutationFn: (data: EditStudentFormValues) => studentApi.update(student!._id, {
            full_name: data.full_name,
            phone: data.phone || undefined,
            email: data.email || undefined,
            date_of_birth: data.date_of_birth || undefined,
        }),
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ['students'] });
            onSuccess();
        },
        onError: (err: unknown) => onError(getApiError(err)),
    });

    const handleClose = () => {
        if (mutation.isPending) return;
        onClose();
    };

    return (
        <Dialog open={!!student} onClose={handleClose} maxWidth="sm" fullWidth>
            <DialogTitle sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', pb: 1 }}>
                <Typography variant="h4" component="span">Chỉnh sửa Học sinh</Typography>
                <IconButton size="small" onClick={handleClose} disabled={mutation.isPending}>
                    <Close />
                </IconButton>
            </DialogTitle>

            <form onSubmit={handleSubmit(data => mutation.mutate(data))}>
                <DialogContent dividers sx={{ py: 3 }}>
                    <Stack spacing={2.5}>
                        {student?.userCode && (
                            <Box>
                                <Typography variant="caption" color="text.secondary" display="block" mb={1}>
                                    MÃ HỌC SINH
                                </Typography>
                                <Chip label={student.userCode} variant="outlined" size="small" />
                            </Box>
                        )}
                        <TextField
                            label="Họ và tên *"
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
                            <TextField label="Số điện thoại" fullWidth {...register('phone')} />
                            <TextField label="Email" type="email" fullWidth {...register('email')} />
                        </Stack>
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
