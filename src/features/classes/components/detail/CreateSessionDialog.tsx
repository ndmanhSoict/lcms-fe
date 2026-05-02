import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import {
    Dialog, DialogTitle, DialogContent, DialogActions,
    Button, TextField, Stack, Typography, IconButton,
} from '@mui/material';
import { Close } from '@mui/icons-material';
import { sessionApi } from '../../api/session.api';
import { createSessionSchema, type CreateSessionFormValues } from '../../schemas/class.schemas';
import { getApiError } from '@/lib/apiError';

interface Props {
    open: boolean;
    classId: string;
    onClose: () => void;
    onSuccess: () => void;
    onError: (msg: string) => void;
}

export function CreateSessionDialog({ open, classId, onClose, onSuccess, onError }: Props) {
    const queryClient = useQueryClient();
    const { register, handleSubmit, reset, formState: { errors } } = useForm<CreateSessionFormValues>({
        resolver: zodResolver(createSessionSchema),
        defaultValues: { session_date: '', start_time: '', end_time: '', topic: '' },
    });

    const mutation = useMutation({
        mutationFn: sessionApi.create.bind(null, classId),
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ['sessions', classId] });
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

    return (
        <Dialog open={open} onClose={handleClose} maxWidth="xs" fullWidth>
            <DialogTitle sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', pb: 1 }}>
                <Typography variant="h4" component="span">Thêm Tiết học</Typography>
                <IconButton size="small" onClick={handleClose} disabled={mutation.isPending}>
                    <Close />
                </IconButton>
            </DialogTitle>

            <form onSubmit={handleSubmit(data => mutation.mutate(data))}>
                <DialogContent dividers sx={{ py: 3 }}>
                    <Stack spacing={2.5}>
                        <TextField
                            label="Ngày học *" type="date" fullWidth {...register('session_date')}
                            error={!!errors.session_date} helperText={errors.session_date?.message}
                            slotProps={{ inputLabel: { shrink: true } }}
                        />
                        <Stack direction="row" spacing={2}>
                            <TextField
                                label="Giờ bắt đầu *" type="time" fullWidth {...register('start_time')}
                                error={!!errors.start_time} helperText={errors.start_time?.message}
                                slotProps={{ inputLabel: { shrink: true } }}
                            />
                            <TextField
                                label="Giờ kết thúc *" type="time" fullWidth {...register('end_time')}
                                error={!!errors.end_time} helperText={errors.end_time?.message}
                                slotProps={{ inputLabel: { shrink: true } }}
                            />
                        </Stack>
                        <TextField label="Chủ đề buổi học" placeholder="VD: Ôn tập chương 1" fullWidth {...register('topic')} />
                    </Stack>
                </DialogContent>

                <DialogActions sx={{ px: 3, py: 2, gap: 1 }}>
                    <Button onClick={handleClose} disabled={mutation.isPending}>Hủy</Button>
                    <Button type="submit" variant="contained" disabled={mutation.isPending}>
                        {mutation.isPending ? 'Đang thêm...' : 'Thêm tiết học'}
                    </Button>
                </DialogActions>
            </form>
        </Dialog>
    );
}
