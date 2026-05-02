import { Box, Typography, IconButton, Tooltip } from '@mui/material';
import { EditOutlined, InfoOutlined, PersonOffOutlined } from '@mui/icons-material';
import * as S from '../users.style';
import { getInitials } from '@/utils/format.utils';
import { ROLE_LABELS } from '../types/user.types';
import type { User } from '../types/user.types';

interface Props {
    user: User;
    onEdit: () => void;
    onDetail: () => void;
    onDeactivate: () => void;
}

export function UserRow({ user, onEdit, onDetail, onDeactivate }: Props) {
    return (
        <S.UserRow>
            <Box sx={{ display: 'flex', alignItems: 'center', gap: 2, minWidth: 0 }}>
                <S.UserAvatar>{getInitials(user.fullName)}</S.UserAvatar>
                <Box sx={{ minWidth: 0 }}>
                    <Typography variant="subtitle1" fontWeight={600} color="text.primary" noWrap>
                        {user.fullName}
                    </Typography>
                    <Typography variant="body2" color="text.secondary" noWrap>
                        {user.email}
                    </Typography>
                </Box>
            </Box>

            <Box sx={{ minWidth: 0 }}>
                {user.phone
                    ? <Typography variant="body2" color="text.secondary" noWrap>{user.phone}</Typography>
                    : <Typography variant="body2" color="text.disabled">—</Typography>
                }
            </Box>

            <Typography variant="body2" color="text.secondary" noWrap sx={{ fontFamily: 'monospace' }}>
                {user.userCode ?? '—'}
            </Typography>

            <S.RolePill roletype={user.role as 'BRANCH_OWNER' | 'STAFF'}>
                {ROLE_LABELS[user.role] ?? user.role}
            </S.RolePill>

            <S.StatusPill active={user.isActive}>
                {user.isActive ? 'Hoạt động' : 'Vô hiệu hóa'}
            </S.StatusPill>

            <Box sx={{ display: 'flex', justifyContent: 'flex-end', gap: 0.5 }}>
                <Tooltip title="Chi tiết" arrow>
                    <IconButton size="small" onClick={onDetail} color="info">
                        <InfoOutlined fontSize="small" />
                    </IconButton>
                </Tooltip>
                <Tooltip title="Chỉnh sửa" arrow>
                    <IconButton size="small" onClick={onEdit}>
                        <EditOutlined fontSize="small" />
                    </IconButton>
                </Tooltip>
                <Tooltip title={user.isActive ? 'Vô hiệu hóa' : 'Đã vô hiệu hóa'} arrow>
                    <span>
                        <IconButton size="small" onClick={onDeactivate} color="error" disabled={!user.isActive}>
                            <PersonOffOutlined fontSize="small" />
                        </IconButton>
                    </span>
                </Tooltip>
            </Box>
        </S.UserRow>
    );
}
