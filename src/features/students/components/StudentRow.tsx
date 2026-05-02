import { Box, Typography, IconButton, Tooltip } from '@mui/material';
import { EditOutlined, FamilyRestroom } from '@mui/icons-material';
import * as S from '../students.style';
import { getInitials } from '@/utils/format.utils';
import { getStudentName } from '../utils/student.utils';
import type { Student } from '../types/student.types';

interface Props {
    student: Student;
    onEdit: () => void;
    onViewParents: () => void;
}

export function StudentRow({ student, onEdit, onViewParents }: Props) {
    const name = getStudentName(student);

    return (
        <S.StudentRow>
            <Box sx={{ display: 'flex', alignItems: 'center', gap: 2, minWidth: 0 }}>
                <S.StudentAvatar>{getInitials(name)}</S.StudentAvatar>
                <Box sx={{ minWidth: 0 }}>
                    <Typography variant="subtitle1" fontWeight={600} color="text.primary" noWrap>
                        {name || '—'}
                    </Typography>
                    <Typography variant="body2" color="text.secondary" noWrap>
                        {student.email ?? '—'}
                    </Typography>
                </Box>
            </Box>

            <Box sx={{ minWidth: 0 }}>
                {student.phone && (
                    <Typography variant="body2" color="text.secondary" noWrap>{student.phone}</Typography>
                )}
                {student.email && (
                    <Typography variant="body2" color="text.secondary" noWrap>{student.email}</Typography>
                )}
                {!student.phone && !student.email && (
                    <Typography variant="body2" color="text.disabled">—</Typography>
                )}
            </Box>

            <Typography variant="body2" color="text.secondary" noWrap sx={{ fontFamily: 'monospace' }}>
                {student.userCode ?? '—'}
            </Typography>

            <S.StatusPill active={student.isActive}>
                {student.isActive ? 'Đang học' : 'Ngừng'}
            </S.StatusPill>

            <Box sx={{ display: 'flex', justifyContent: 'flex-end', gap: 0.5 }}>
                <Tooltip title="Chỉnh sửa" arrow>
                    <IconButton size="small" onClick={onEdit}>
                        <EditOutlined fontSize="small" />
                    </IconButton>
                </Tooltip>
                <Tooltip title="Xem phụ huynh" arrow>
                    <IconButton size="small" onClick={onViewParents} color="primary">
                        <FamilyRestroom fontSize="small" />
                    </IconButton>
                </Tooltip>
            </Box>
        </S.StudentRow>
    );
}
