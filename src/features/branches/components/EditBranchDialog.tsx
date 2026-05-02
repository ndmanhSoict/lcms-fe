import { useEffect } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import {
    Dialog, DialogTitle, DialogContent, DialogActions,
    Button, TextField, Stack, Typography, IconButton, Box, Chip,
} from '@mui/material';
import { Close } from '@mui/icons-material';
import { branchApi } from '../api/branch.api';
import { editBranchSchema, type EditBranchFormValues } from '../schemas/branch.schemas';
import { getApiError } from '@/lib/apiError';
import type { Branch } from '../types/branch.types';

interface Props {
    branch: Branch | null;
    onClose: () => void;
    onSuccess: () => void;
    onError: (msg: string) => void;
}

export function EditBranchDialog({ branch, onClose, onSuccess, onError }: Props) {
    const queryClient = useQueryClient();
    const { register, handleSubmit, reset, formState: { errors } } = useForm<EditBranchFormValues>({
        resolver: zodResolver(editBranchSchema),
    });

    useEffect(() => {
        if (branch) {
            reset({
                name: branch.name,
                address: branch.address ?? '',
                phone: branch.phone ?? '',
                email: branch.email ?? '',
            });
        }
    }, [branch, reset]);

    const mutation = useMutation({
        mutationFn: (data: EditBranchFormValues) => branchApi.update(branch!._id, {
            name: data.name,
            address: data.address || undefined,
            phone: data.phone || undefined,
            email: data.email || undefined,
        }),
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
        <Dialog open={!!branch} onClose={handleClose} maxWidth="sm" fullWidth>
            <DialogTitle sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', pb: 1 }}>
                <Typography variant="h4" component="span">Chỉnh sửa Cơ sở</Typography>
                <IconButton size="small" onClick={handleClose} disabled={mutation.isPending}>
                    <Close />
                </IconButton>
            </DialogTitle>

            <form onSubmit={handleSubmit(data => mutation.mutate(data))}>
                <DialogContent dividers sx={{ py: 3 }}>
                    <Stack spacing={2.5}>
                        <Box>
                            <Typography variant="caption" color="text.secondary" display="block" mb={1}>
                                MÃ CƠ SỞ (không thể thay đổi)
                            </Typography>
                            <Chip label={branch?.code} color="primary" variant="outlined" size="small" />
                        </Box>
                        <TextField
                            label="Tên cơ sở *"
                            fullWidth
                            {...register('name')}
                            error={!!errors.name}
                            helperText={errors.name?.message}
                        />
                        <TextField label="Địa chỉ" fullWidth {...register('address')} />
                        <Stack direction="row" spacing={2}>
                            <TextField label="Số điện thoại" fullWidth {...register('phone')} />
                            <TextField
                                label="Email"
                                type="email"
                                fullWidth
                                {...register('email')}
                                error={!!errors.email}
                                helperText={errors.email?.message}
                            />
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
