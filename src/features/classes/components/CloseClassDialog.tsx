import { useMutation, useQueryClient } from '@tanstack/react-query';
import {
    Dialog, DialogContent, DialogActions,
    Button, Typography, Box, alpha,
} from '@mui/material';
import { LockOutlined } from '@mui/icons-material';
import { classApi } from '../api/class.api';
import { getApiError } from '@/lib/apiError';
import type { ClassItem } from '../types/class.types';

interface Props {
    classItem: ClassItem | null;
    onClose: () => void;
    onSuccess: () => void;
    onError: (msg: string) => void;
}

export function CloseClassDialog({ classItem, onClose, onSuccess, onError }: Props) {
    const queryClient = useQueryClient();

    const mutation = useMutation({
        mutationFn: () => classApi.close(classItem!._id),
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
        <Dialog open={!!classItem} onClose={handleClose} maxWidth="xs" fullWidth>
            <DialogContent sx={{ pt: 4, pb: 2 }}>
                <Box sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 2.5, textAlign: 'center' }}>
                    <Box
                        sx={{
                            width: 68, height: 68, borderRadius: '50%',
                            display: 'flex', alignItems: 'center', justifyContent: 'center',
                            backgroundColor: theme => alpha(theme.palette.warning.main, 0.12),
                            color: 'warning.main',
                        }}
                    >
                        <LockOutlined sx={{ fontSize: 34 }} />
                    </Box>
                    <Box>
                        <Typography variant="h4" gutterBottom>Đóng lớp học?</Typography>
                        <Typography variant="body1" color="text.secondary">
                            Bạn có chắc muốn đóng lớp <strong>{classItem?.name}</strong>?{' '}
                            Lớp sẽ chuyển sang trạng thái <strong>đã đóng</strong> và không thể đăng ký thêm học sinh.
                        </Typography>
                    </Box>
                </Box>
            </DialogContent>

            <DialogActions sx={{ px: 3, pb: 3, gap: 1 }}>
                <Button fullWidth variant="outlined" onClick={handleClose} disabled={mutation.isPending}>Hủy</Button>
                <Button fullWidth variant="contained" color="warning" disabled={mutation.isPending} onClick={() => mutation.mutate()}>
                    {mutation.isPending ? 'Đang đóng...' : 'Đóng lớp'}
                </Button>
            </DialogActions>
        </Dialog>
    );
}
