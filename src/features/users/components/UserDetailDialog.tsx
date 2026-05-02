import {
    Dialog, DialogTitle, DialogContent, DialogActions,
    Button, Typography, IconButton, Box, Chip, Divider, Stack,
} from '@mui/material';
import { Close, EmailOutlined, PhoneOutlined, BadgeOutlined, CalendarTodayOutlined } from '@mui/icons-material';
import * as S from '../users.style';
import { getInitials, formatDate } from '@/utils/format.utils';
import { ROLE_LABELS } from '../types/user.types';
import type { User } from '../types/user.types';

interface Props {
    user: User | null;
    onClose: () => void;
}

interface InfoRowProps {
    icon: React.ReactNode;
    label: string;
    value: React.ReactNode;
}

function InfoRow({ icon, label, value }: InfoRowProps) {
    return (
        <Box sx={{ display: 'flex', alignItems: 'flex-start', gap: 1.5 }}>
            <Box sx={{ color: 'text.secondary', mt: 0.25, flexShrink: 0 }}>{icon}</Box>
            <Box sx={{ minWidth: 120, flexShrink: 0 }}>
                <Typography variant="caption" color="text.secondary" fontWeight={600} textTransform="uppercase">
                    {label}
                </Typography>
            </Box>
            <Box sx={{ flex: 1 }}>
                {typeof value === 'string'
                    ? <Typography variant="body2" color="text.primary">{value}</Typography>
                    : value
                }
            </Box>
        </Box>
    );
}

export function UserDetailDialog({ user, onClose }: Props) {
    return (
        <Dialog open={!!user} onClose={onClose} maxWidth="sm" fullWidth>
            <DialogTitle sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', pb: 1 }}>
                <Typography variant="h4" component="span">Chi tiết Tài khoản</Typography>
                <IconButton size="small" onClick={onClose}><Close /></IconButton>
            </DialogTitle>

            <DialogContent dividers sx={{ py: 3 }}>
                {user && (
                    <Stack spacing={3}>
                        <Box sx={{ display: 'flex', alignItems: 'center', gap: 2.5 }}>
                            <S.UserAvatar sx={{ width: 64, height: 64, fontSize: '1.25rem' }}>
                                {getInitials(user.fullName)}
                            </S.UserAvatar>
                            <Box>
                                <Typography variant="h4" color="text.primary">{user.fullName}</Typography>
                                <Box sx={{ display: 'flex', gap: 1, mt: 0.75, flexWrap: 'wrap' }}>
                                    <S.RolePill roletype={user.role as 'BRANCH_OWNER' | 'STAFF'}>
                                        {ROLE_LABELS[user.role] ?? user.role}
                                    </S.RolePill>
                                    <S.StatusPill active={user.isActive}>
                                        {user.isActive ? 'Hoạt động' : 'Vô hiệu hóa'}
                                    </S.StatusPill>
                                </Box>
                            </Box>
                        </Box>

                        <Divider />

                        <Stack spacing={2}>
                            <InfoRow icon={<EmailOutlined fontSize="small" />} label="Email" value={user.email} />
                            <InfoRow icon={<PhoneOutlined fontSize="small" />} label="Số điện thoại" value={user.phone ?? '—'} />
                            {user.userCode && (
                                <InfoRow
                                    icon={<BadgeOutlined fontSize="small" />}
                                    label="Mã tài khoản"
                                    value={<Chip label={user.userCode} variant="outlined" size="small" sx={{ fontFamily: 'monospace' }} />}
                                />
                            )}
                            <InfoRow icon={<CalendarTodayOutlined fontSize="small" />} label="Ngày tạo" value={formatDate(user.createdAt)} />
                            {user.updatedAt && (
                                <InfoRow icon={<CalendarTodayOutlined fontSize="small" />} label="Cập nhật lần cuối" value={formatDate(user.updatedAt)} />
                            )}
                        </Stack>
                    </Stack>
                )}
            </DialogContent>

            <DialogActions sx={{ px: 3, py: 2 }}>
                <Button variant="contained" onClick={onClose}>Đóng</Button>
            </DialogActions>
        </Dialog>
    );
}
