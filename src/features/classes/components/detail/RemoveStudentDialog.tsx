import { useState } from 'react';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import {
    Dialog, DialogContent, DialogActions,
    Button, Typography, Box, alpha, TextField,
} from '@mui/material';
import { PersonRemoveOutlined } from '@mui/icons-material';
import { enrollmentApi } from '../../api/enrollment.api';
import { getApiError } from '@/lib/apiError';
import type { ClassStudentItem } from '../../types/class.types';

interface Props {
    student: ClassStudentItem | null;
    classId: string;
    onClose: () => void;
    onSuccess: () => void;
    onError: (msg: string) => void;
}

export function RemoveStudentDialog({ student, classId, onClose, onSuccess, onError }: Props) {
    const queryClient = useQueryClient();
    const [reason, setReason] = useState('');

    const mutation = useMutation({
        mutationFn: () => enrollmentApi.leave(student!._id, { reason: reason || undefined }),
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ['class-students', classId] });
            queryClient.invalidateQueries({ queryKey: ['class-detail', classId] });
            setReason('');
            onSuccess();
        },
        onError: (err: unknown) => onError(getApiError(err)),
    });

    const handleClose = () => {
        if (mutation.isPending) return;
        setReason('');
        onClose();
    };

    return (
        <Dialog open={!!student} onClose={handleClose} maxWidth="xs" fullWidth>
            <DialogContent sx={{ pt: 4, pb: 2 }}>
                <Box sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 2.5, textAlign: 'center' }}>
                    <Box
                        sx={{
                            width: 68, height: 68, borderRadius: '50%',
                            display: 'flex', alignItems: 'center', justifyContent: 'center',
                            backgroundColor: theme => alpha(theme.palette.warning.main, 0.10),
                            color: 'warning.main',
                        }}
                    >
                        <PersonRemoveOutlined sx={{ fontSize: 34 }} />
                    </Box>
                    <Box sx={{ width: '100%' }}>
                        <Typography variant="h4" gutterBottom>Rút khỏi lớp?</Typography>
                        <Typography variant="body2" color="text.secondary" sx={{ mb: 2 }}>
                            Học sinh <strong>{student?.studentId.fullName ?? ''}</strong> sẽ được rút khỏi lớp học này.
                        </Typography>
                        <TextField
                            label="Lý do (tùy chọn)"
                            placeholder="VD: Học sinh xin nghỉ do..."
                            value={reason}
                            onChange={e => setReason(e.target.value)}
                            fullWidth multiline rows={2} size="small" sx={{ textAlign: 'left' }}
                        />
                    </Box>
                </Box>
            </DialogContent>

            <DialogActions sx={{ px: 3, pb: 3, gap: 1 }}>
                <Button fullWidth variant="outlined" onClick={handleClose} disabled={mutation.isPending}>Hủy</Button>
                <Button fullWidth variant="contained" color="warning" disabled={mutation.isPending} onClick={() => mutation.mutate()}>
                    {mutation.isPending ? 'Đang xử lý...' : 'Rút khỏi lớp'}
                </Button>
            </DialogActions>
        </Dialog>
    );
}
