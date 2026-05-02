import { Box, Typography, IconButton, Tooltip } from '@mui/material';
import { EditOutlined, DoDisturbOn, ArrowForwardIosOutlined } from '@mui/icons-material';
import * as S from '../classes.style';
import { getInitials, formatCurrency } from '@/utils/format.utils';
import type { ClassItem } from '../types/class.types';

interface Props {
    classItem: ClassItem;
    onEdit: () => void;
    onClose: () => void;
    onDetail: () => void;
}

export function ClassRow({ classItem, onEdit, onClose, onDetail }: Props) {
    const isActive = classItem.status === 'active';

    return (
        <S.ClassRow>
            <Box sx={{ display: 'flex', alignItems: 'center', gap: 2, minWidth: 0 }}>
                <S.ClassAvatar>{getInitials(classItem.name)}</S.ClassAvatar>
                <Box sx={{ minWidth: 0 }}>
                    <Typography variant="subtitle1" fontWeight={600} color="text.primary" noWrap>
                        {classItem.name}
                    </Typography>
                    <Typography variant="body2" color="text.secondary" noWrap>
                        #{classItem.code}
                    </Typography>
                </Box>
            </Box>

            <Typography variant="body2" color="text.secondary" noWrap>
                {classItem.subjectName}
            </Typography>

            <Typography variant="body2" fontWeight={600} color="text.primary" noWrap>
                {formatCurrency(classItem.tuitionFee)}
            </Typography>

            <Typography variant="body2" color="text.secondary">
                {classItem.studentCount}
                {classItem.maxStudents ? `/${classItem.maxStudents}` : ''}
            </Typography>

            <S.StatusChip
                classstatus={classItem.status}
                label={isActive ? 'Hoạt động' : 'Đã đóng'}
                size="small"
                variant="outlined"
            />

            <Box sx={{ display: 'flex', justifyContent: 'flex-end', gap: 0.5 }}>
                <Tooltip title="Xem chi tiết" arrow>
                    <IconButton size="small" onClick={onDetail} color="primary">
                        <ArrowForwardIosOutlined fontSize="small" />
                    </IconButton>
                </Tooltip>
                <Tooltip title="Chỉnh sửa" arrow>
                    <span>
                        <IconButton size="small" onClick={onEdit} disabled={!isActive}>
                            <EditOutlined fontSize="small" />
                        </IconButton>
                    </span>
                </Tooltip>
                <Tooltip title={isActive ? 'Đóng lớp' : 'Lớp đã đóng'} arrow>
                    <span>
                        <IconButton size="small" onClick={onClose} color="warning" disabled={!isActive}>
                            <DoDisturbOn fontSize="small" />
                        </IconButton>
                    </span>
                </Tooltip>
            </Box>
        </S.ClassRow>
    );
}
