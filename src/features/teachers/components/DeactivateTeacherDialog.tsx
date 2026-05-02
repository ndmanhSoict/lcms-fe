import { useMutation, useQueryClient } from '@tanstack/react-query';
import {
    Dialog, DialogContent, DialogActions,
    Button, Typography, Box, alpha,
} from '@mui/material';
import { DeleteOutlined } from '@mui/icons-material';
import { teacherApi } from '../api/teacher.api';
import { getApiError } from '@/lib/apiError';
import type { Teacher } from '../types/teacher.types';

interface Props {
    teacher: Teacher | null;
    onClose: () => void;
    onSuccess: () => void;
    onError: (msg: string) => void;
}

export function DeactivateTeacherDialog({ teacher, onClose, onSuccess, onError }: Props) {
    const queryClient = useQueryClient();

    const mutation = useMutation({
        mutationFn: () => teacherApi.delete(teacher!._id),
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
        <Dialog open={!!teacher} onClose={handleClose} maxWidth="xs" fullWidth>
            <DialogContent sx={{ pt: 4, pb: 2 }}>
                <Box sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 2.5, textAlign: 'center' }}>
                    <Box
                        sx={{
                            width: 68, height: 68, borderRadius: '50%',
                            display: 'flex', alignItems: 'center', justifyContent: 'center',
                            backgroundColor: theme => alpha(theme.palette.error.main, 0.10),
                            color: 'error.main',
                        }}
                    >
                        <DeleteOutlined sx={{ fontSize: 34 }} />
                    </Box>
                    <Box>
                        <Typography variant="h4" gutterBottom>Xóa giáo viên?</Typography>
                        <Typography variant="body1" color="text.secondary">
                            Bạn có chắc muốn xóa giáo viên <strong>{teacher?.fullName}</strong>?{' '}
                            Hành động này không thể hoàn tác nếu giáo viên đang được phân công lớp học.
                        </Typography>
                    </Box>
                </Box>
            </DialogContent>

            <DialogActions sx={{ px: 3, pb: 3, gap: 1 }}>
                <Button fullWidth variant="outlined" onClick={handleClose} disabled={mutation.isPending}>Hủy</Button>
                <Button fullWidth variant="contained" color="error" disabled={mutation.isPending} onClick={() => mutation.mutate()}>
                    {mutation.isPending ? 'Đang xử lý...' : 'Xóa giáo viên'}
                </Button>
            </DialogActions>
        </Dialog>
    );
}
