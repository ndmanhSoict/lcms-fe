import { useMutation, useQueryClient } from '@tanstack/react-query';
import {
    Dialog, DialogContent, DialogActions,
    Button, Typography, Box, alpha,
} from '@mui/material';
import { PowerSettingsNew } from '@mui/icons-material';
import { branchApi } from '../api/branch.api';
import { getApiError } from '@/lib/apiError';
import type { Branch } from '../types/branch.types';

interface Props {
    branch: Branch | null;
    onClose: () => void;
    onSuccess: () => void;
    onError: (msg: string) => void;
}

export function ToggleConfirmDialog({ branch, onClose, onSuccess, onError }: Props) {
    const queryClient = useQueryClient();
    const isDeactivating = branch?.isActive ?? false;

    const mutation = useMutation({
        mutationFn: () => branchApi.toggleActive(branch!._id),
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ['branches'] });
            onSuccess();
        },
        onError: (err: unknown) => onError(getApiError(err)),
    });

    const handleClose = () => {
        if (mutation.isPending) return;
        onClose();
    };

    return (
        <Dialog open={!!branch} onClose={handleClose} maxWidth="xs" fullWidth>
            <DialogContent sx={{ pt: 4, pb: 2 }}>
                <Box sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 2.5, textAlign: 'center' }}>
                    <Box
                        sx={{
                            width: 68, height: 68, borderRadius: '50%',
                            display: 'flex', alignItems: 'center', justifyContent: 'center',
                            backgroundColor: theme => alpha(
                                isDeactivating ? theme.palette.error.main : theme.palette.success.main, 0.10,
                            ),
                            color: isDeactivating ? 'error.main' : 'success.main',
                        }}
                    >
                        <PowerSettingsNew sx={{ fontSize: 34 }} />
                    </Box>
                    <Box>
                        <Typography variant="h4" gutterBottom>
                            {isDeactivating ? 'Vô hiệu hóa cơ sở?' : 'Kích hoạt cơ sở?'}
                        </Typography>
                        <Typography variant="body1" color="text.secondary">
                            {isDeactivating ? (
                                <>Bạn có chắc muốn vô hiệu hóa cơ sở <strong>{branch?.name}</strong>? Cơ sở sẽ tạm thời ngừng hoạt động trong hệ thống.</>
                            ) : (
                                <>Bạn có chắc muốn kích hoạt lại cơ sở <strong>{branch?.name}</strong>?</>
                            )}
                        </Typography>
                    </Box>
                </Box>
            </DialogContent>

            <DialogActions sx={{ px: 3, pb: 3, gap: 1 }}>
                <Button fullWidth variant="outlined" onClick={handleClose} disabled={mutation.isPending}>Hủy</Button>
                <Button
                    fullWidth
                    variant="contained"
                    color={isDeactivating ? 'error' : 'success'}
                    disabled={mutation.isPending}
                    onClick={() => mutation.mutate()}
                >
                    {mutation.isPending
                        ? (isDeactivating ? 'Đang xử lý...' : 'Đang kích hoạt...')
                        : (isDeactivating ? 'Vô hiệu hóa' : 'Kích hoạt')
                    }
                </Button>
            </DialogActions>
        </Dialog>
    );
}
