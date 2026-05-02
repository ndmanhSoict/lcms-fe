import { Box, Typography, IconButton, Tooltip, Chip } from '@mui/material';
import { EditOutlined, DeleteOutlined } from '@mui/icons-material';
import * as S from '../teachers.style';
import { getInitials } from '@/utils/format.utils';
import type { Teacher } from '../types/teacher.types';

interface Props {
    teacher: Teacher;
    onEdit: () => void;
    onDelete: () => void;
}

export function TeacherRow({ teacher, onEdit, onDelete }: Props) {
    const subjects = teacher.teacherInfo?.subjects ?? [];

    return (
        <S.TeacherRow>
            <Box sx={{ display: 'flex', alignItems: 'center', gap: 2, minWidth: 0 }}>
                <S.TeacherAvatar>{getInitials(teacher.fullName)}</S.TeacherAvatar>
                <Box sx={{ minWidth: 0 }}>
                    <Typography variant="subtitle1" fontWeight={600} color="text.primary" noWrap>
                        {teacher.fullName}
                    </Typography>
                    <Typography variant="body2" color="text.secondary" noWrap>
                        {teacher.email}
                    </Typography>
                </Box>
            </Box>

            <Box sx={{ display: 'flex', gap: 0.5, flexWrap: 'wrap', alignItems: 'center' }}>
                {subjects.length > 0
                    ? subjects.slice(0, 2).map(s => (
                        <Chip key={s} label={s} size="small" variant="outlined" sx={{ fontSize: '0.7rem' }} />
                    ))
                    : <Typography variant="body2" color="text.disabled">—</Typography>
                }
                {subjects.length > 2 && (
                    <Typography variant="caption" color="text.secondary">+{subjects.length - 2}</Typography>
                )}
            </Box>

            <Box sx={{ minWidth: 0 }}>
                {teacher.phone
                    ? <Typography variant="body2" color="text.secondary" noWrap>{teacher.phone}</Typography>
                    : <Typography variant="body2" color="text.disabled">—</Typography>
                }
            </Box>

            <Typography variant="body2" color="text.secondary" noWrap sx={{ fontFamily: 'monospace' }}>
                {teacher.userCode ?? '—'}
            </Typography>

            <S.StatusPill active={teacher.isActive}>
                {teacher.isActive ? 'Hoạt động' : 'Vô hiệu hóa'}
            </S.StatusPill>

            <Box sx={{ display: 'flex', justifyContent: 'flex-end', gap: 0.5 }}>
                <Tooltip title="Chỉnh sửa" arrow>
                    <IconButton size="small" onClick={onEdit}>
                        <EditOutlined fontSize="small" />
                    </IconButton>
                </Tooltip>
                <Tooltip title="Xóa giáo viên" arrow>
                    <IconButton size="small" onClick={onDelete} color="error">
                        <DeleteOutlined fontSize="small" />
                    </IconButton>
                </Tooltip>
            </Box>
        </S.TeacherRow>
    );
}
