import { type Resolver, useForm, Controller } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import {
    Dialog, DialogTitle, DialogContent, DialogActions,
    Button, TextField, Stack, Typography, IconButton,
    MenuItem, InputAdornment, CircularProgress,
} from '@mui/material';
import { Close } from '@mui/icons-material';
import { classApi } from '../api/class.api';
import { teacherApi } from '@/features/teachers/api/teacher.api';
import { createClassSchema, type CreateClassFormValues } from '../schemas/class.schemas';
import { getApiError } from '@/lib/apiError';

interface Props {
    open: boolean;
    onClose: () => void;
    onSuccess: () => void;
    onError: (msg: string) => void;
}

export function CreateClassDialog({ open, onClose, onSuccess, onError }: Props) {
    const queryClient = useQueryClient();
    const { register, handleSubmit, reset, control, formState: { errors } } = useForm<CreateClassFormValues>({
        resolver: zodResolver(createClassSchema) as Resolver<CreateClassFormValues>,
        defaultValues: {
            name: '', teacher_id: '', subject_name: '',
            tuition_fee: 0, max_students: '', schedule: '',
            start_date: '', end_date: '',
        },
    });

    const { data: teacherData, isLoading: teachersLoading } = useQuery({
        queryKey: ['teachers-list', ''],
        queryFn: () => teacherApi.getAll({ limit: 100 }),
        enabled: open,
    });
    const teachers = teacherData?.data ?? [];

    const mutation = useMutation({
        mutationFn: classApi.create,
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ['classes'] });
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

    const onSubmit = (data: CreateClassFormValues) => {
        mutation.mutate({
            name: data.name,
            teacher_id: data.teacher_id,
            subject_name: data.subject_name,
            tuition_fee: data.tuition_fee,
            max_students: data.max_students ? Number(data.max_students) : undefined,
            schedule: data.schedule || undefined,
            start_date: data.start_date || undefined,
            end_date: data.end_date || undefined,
        });
    };

    return (
        <Dialog open={open} onClose={handleClose} maxWidth="sm" fullWidth>
            <DialogTitle sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', pb: 1 }}>
                <Typography variant="h4" component="span">Thêm Lớp học Mới</Typography>
                <IconButton size="small" onClick={handleClose} disabled={mutation.isPending}>
                    <Close />
                </IconButton>
            </DialogTitle>

            <form onSubmit={handleSubmit(onSubmit)}>
                <DialogContent dividers sx={{ py: 3 }}>
                    <Stack spacing={2.5}>
                        <TextField
                            label="Tên lớp *" placeholder="VD: Toán nâng cao K1-2025" fullWidth
                            {...register('name')} error={!!errors.name} helperText={errors.name?.message}
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
                                    <MenuItem value="" disabled>Chọn giáo viên...</MenuItem>
                                    {teachers.map(t => (
                                        <MenuItem key={t._id} value={t._id}>{t.fullName}</MenuItem>
                                    ))}
                                </TextField>
                            )}
                        />
                        <TextField
                            label="Môn học *" placeholder="VD: Toán học, Tiếng Anh..." fullWidth
                            {...register('subject_name')} error={!!errors.subject_name} helperText={errors.subject_name?.message}
                        />
                        <Stack direction="row" spacing={2}>
                            <TextField
                                label="Học phí (VNĐ) *" type="number" fullWidth {...register('tuition_fee')}
                                error={!!errors.tuition_fee} helperText={errors.tuition_fee?.message} inputProps={{ min: 0 }}
                            />
                            <TextField label="Sĩ số tối đa" type="number" fullWidth {...register('max_students')} inputProps={{ min: 1 }} />
                        </Stack>
                        <TextField label="Lịch học" placeholder="VD: Thứ 2, 4, 6 — 18:00-20:00" fullWidth {...register('schedule')} />
                        <Stack direction="row" spacing={2}>
                            <TextField label="Ngày bắt đầu" type="date" fullWidth {...register('start_date')} slotProps={{ inputLabel: { shrink: true } }} />
                            <TextField label="Ngày kết thúc" type="date" fullWidth {...register('end_date')} slotProps={{ inputLabel: { shrink: true } }} />
                        </Stack>
                    </Stack>
                </DialogContent>

                <DialogActions sx={{ px: 3, py: 2, gap: 1 }}>
                    <Button onClick={handleClose} disabled={mutation.isPending}>Hủy</Button>
                    <Button type="submit" variant="contained" disabled={mutation.isPending}>
                        {mutation.isPending ? 'Đang tạo...' : 'Tạo lớp học'}
                    </Button>
                </DialogActions>
            </form>
        </Dialog>
    );
}
