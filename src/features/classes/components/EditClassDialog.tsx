import { useEffect } from 'react';
import { type Resolver, useForm, Controller } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import {
    Dialog, DialogTitle, DialogContent, DialogActions,
    Button, TextField, Stack, Typography, IconButton,
    MenuItem, Box, Chip, CircularProgress, InputAdornment,
} from '@mui/material';
import { Close } from '@mui/icons-material';
import { classApi } from '../api/class.api';
import { teacherApi } from '@/features/teachers/api/teacher.api';
import { editClassSchema, type EditClassFormValues } from '../schemas/class.schemas';
import { getApiError } from '@/lib/apiError';
import type { ClassItem } from '../types/class.types';

interface Props {
    classItem: ClassItem | null;
    onClose: () => void;
    onSuccess: () => void;
    onError: (msg: string) => void;
}

export function EditClassDialog({ classItem, onClose, onSuccess, onError }: Props) {
    const queryClient = useQueryClient();
    const { register, handleSubmit, reset, control, formState: { errors } } = useForm<EditClassFormValues>({
        resolver: zodResolver(editClassSchema) as Resolver<EditClassFormValues>,
    });

    useEffect(() => {
        if (classItem) {
            reset({
                name: classItem.name,
                teacher_id: classItem.teacherId,
                subject_name: classItem.subjectName,
                tuition_fee: classItem.tuitionFee,
                max_students: classItem.maxStudents ?? '',
                schedule: classItem.schedule ?? '',
            });
        }
    }, [classItem, reset]);

    const { data: teacherData, isLoading: teachersLoading } = useQuery({
        queryKey: ['teachers-list', ''],
        queryFn: () => teacherApi.getAll({ limit: 100 }),
        enabled: !!classItem,
    });
    const teachers = teacherData?.data ?? [];

    const mutation = useMutation({
        mutationFn: (data: EditClassFormValues) => classApi.update(classItem!._id, {
            name: data.name,
            teacher_id: data.teacher_id,
            subject_name: data.subject_name,
            tuition_fee: data.tuition_fee,
            max_students: data.max_students ? Number(data.max_students) : undefined,
            schedule: data.schedule || undefined,
        }),
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ['classes'] });
            queryClient.invalidateQueries({ queryKey: ['class-detail', classItem?._id] });
            onSuccess();
        },
        onError: (err: unknown) => onError(getApiError(err)),
    });

    const handleClose = () => {
        if (mutation.isPending) return;
        onClose();
    };

    return (
        <Dialog open={!!classItem} onClose={handleClose} maxWidth="sm" fullWidth>
            <DialogTitle sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', pb: 1 }}>
                <Typography variant="h4" component="span">Chỉnh sửa Lớp học</Typography>
                <IconButton size="small" onClick={handleClose} disabled={mutation.isPending}>
                    <Close />
                </IconButton>
            </DialogTitle>

            <form onSubmit={handleSubmit(data => mutation.mutate(data))}>
                <DialogContent dividers sx={{ py: 3 }}>
                    <Stack spacing={2.5}>
                        {classItem?.code && (
                            <Box>
                                <Typography variant="caption" color="text.secondary" display="block" mb={1}>MÃ LỚP</Typography>
                                <Chip label={classItem.code} variant="outlined" size="small" />
                            </Box>
                        )}
                        <TextField
                            label="Tên lớp *" fullWidth {...register('name')}
                            error={!!errors.name} helperText={errors.name?.message}
                        />
                        <Controller
                            name="teacher_id"
                            control={control}
                            render={({ field }) => (
                                <TextField
                                    {...field} select label="Giáo viên *" fullWidth
                                    error={!!errors.teacher_id} helperText={errors.teacher_id?.message}
                                    slotProps={{
                                        input: {
                                            startAdornment: teachersLoading ? (
                                                <InputAdornment position="start"><CircularProgress size={16} /></InputAdornment>
                                            ) : undefined,
                                        },
                                    }}
                                >
                                    {teachers.map(t => (
                                        <MenuItem key={t._id} value={t._id}>{t.fullName}</MenuItem>
                                    ))}
                                </TextField>
                            )}
                        />
                        <TextField
                            label="Môn học *" fullWidth {...register('subject_name')}
                            error={!!errors.subject_name} helperText={errors.subject_name?.message}
                        />
                        <Stack direction="row" spacing={2}>
                            <TextField
                                label="Học phí (VNĐ) *" type="number" fullWidth {...register('tuition_fee')}
                                error={!!errors.tuition_fee} helperText={errors.tuition_fee?.message} inputProps={{ min: 0 }}
                            />
                            <TextField label="Sĩ số tối đa" type="number" fullWidth {...register('max_students')} inputProps={{ min: 1 }} />
                        </Stack>
                        <TextField label="Lịch học" placeholder="VD: Thứ 2, 4, 6 — 18:00-20:00" fullWidth {...register('schedule')} />
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
