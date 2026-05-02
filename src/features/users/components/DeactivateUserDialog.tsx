import { useMutation, useQueryClient } from '@tanstack/react-query';
import {
    Dialog, DialogContent, DialogActions,
    Button, Typography, Box, alpha,
} from '@mui/material';
import { ManageAccountsOutlined } from '@mui/icons-material';
import { userApi } from '../api/user.api';
import { getApiError } from '@/lib/apiError';
import type { User } from '../types/user.types';

interface Props {
    user: User | null;
    onClose: () => void;
    onSuccess: () => void;
    onError: (msg: string) => void;
}

export function DeactivateUserDialog({ user, onClose, onSuccess, onError }: Props) {
    const queryClient = useQueryClient();

    const mutation = useMutation({
        mutationFn: () => userApi.deactivate(user!._id),
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ['branch-users'] });
            onSuccess();
        },
        onError: (err: unknown) => onError(getApiError(err)),
    });

    const handleClose = () => {
        if (mutation.isPending) return;
        onClose();
    };

    return (
        <Dialog open={!!user} onClose={handleClose} maxWidth="xs" fullWidth>
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
                        <ManageAccountsOutlined sx={{ fontSize: 34 }} />
                    </Box>
                    <Box>
                        <Typography variant="h4" gutterBottom>Vô hiệu hóa tài khoản?</Typography>
                        <Typography variant="body1" color="text.secondary">
                            Bạn có chắc muốn vô hiệu hóa tài khoản <strong>{user?.fullName}</strong>?{' '}
                            Tài khoản sẽ không thể đăng nhập cho đến khi được kích hoạt lại.
                        </Typography>
                    </Box>
                </Box>
            </DialogContent>

            <DialogActions sx={{ px: 3, pb: 3, gap: 1 }}>
                <Button fullWidth variant="outlined" onClick={handleClose} disabled={mutation.isPending}>Hủy</Button>
                <Button fullWidth variant="contained" color="error" disabled={mutation.isPending} onClick={() => mutation.mutate()}>
                    {mutation.isPending ? 'Đang xử lý...' : 'Vô hiệu hóa'}
                </Button>
            </DialogActions>
        </Dialog>
    );
}
