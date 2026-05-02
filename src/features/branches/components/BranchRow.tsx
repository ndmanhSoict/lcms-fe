import { Box, Typography, IconButton, Tooltip } from '@mui/material';
import { EditOutlined, PowerSettingsNew } from '@mui/icons-material';
import * as S from '../branches.style';
import { getInitials } from '@/utils/format.utils';
import type { Branch } from '../types/branch.types';

interface Props {
    branch: Branch;
    onEdit: () => void;
    onToggle: () => void;
}

export function BranchRow({ branch, onEdit, onToggle }: Props) {
    return (
        <S.BranchRow>
            <Box sx={{ display: 'flex', alignItems: 'center', gap: 2, minWidth: 0 }}>
                <S.BranchAvatar>{getInitials(branch.name)}</S.BranchAvatar>
                <Box sx={{ minWidth: 0 }}>
                    <Typography variant="subtitle1" color="text.primary" fontWeight={600} noWrap>
                        {branch.name}
                    </Typography>
                    <Typography variant="body2" color="text.secondary" noWrap>
                        #{branch.code}
                    </Typography>
                </Box>
            </Box>

            <Box sx={{ minWidth: 0 }}>
                {branch.email && (
                    <Typography variant="body2" color="text.secondary" noWrap>{branch.email}</Typography>
                )}
                {branch.phone && (
                    <Typography variant="body2" color="text.secondary" noWrap>{branch.phone}</Typography>
                )}
                {!branch.email && !branch.phone && (
                    <Typography variant="body2" color="text.disabled">—</Typography>
                )}
            </Box>

            <Typography variant="body2" color="text.secondary" noWrap>
                {branch.address || '—'}
            </Typography>

            <S.StatusPill active={branch.isActive}>
                {branch.isActive ? 'Hoạt động' : 'Ngừng'}
            </S.StatusPill>

            <Box sx={{ display: 'flex', justifyContent: 'flex-end', gap: 0.5 }}>
                <Tooltip title="Chỉnh sửa thông tin" arrow>
                    <IconButton size="small" onClick={onEdit}>
                        <EditOutlined fontSize="small" />
                    </IconButton>
                </Tooltip>
                <Tooltip title={branch.isActive ? 'Vô hiệu hóa' : 'Kích hoạt'} arrow>
                    <IconButton
                        size="small"
                        onClick={onToggle}
                        color={branch.isActive ? 'error' : 'success'}
                    >
                        <PowerSettingsNew fontSize="small" />
                    </IconButton>
                </Tooltip>
            </Box>
        </S.BranchRow>
    );
}
