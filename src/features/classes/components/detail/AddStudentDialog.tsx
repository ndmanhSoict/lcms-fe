import { useState, useMemo } from 'react';
import { useMutation, useQuery } from '@tanstack/react-query';
import {
    Dialog, DialogTitle, DialogContent, DialogActions,
    Button, Typography, IconButton, TextField, InputAdornment,
    Box, List, ListItem, Skeleton, Alert,
} from '@mui/material';
import { Close, Search, PersonAddOutlined, CheckOutlined } from '@mui/icons-material';
import { studentApi } from '@/features/students/api/student.api';
import { getStudentName } from '@/features/students/utils/student.utils';
import { enrollmentApi } from '../../api/enrollment.api';
import { getApiError } from '@/lib/apiError';
import { getInitials } from '@/utils/format.utils';
import { useDebounce } from '@/hooks/useDebounce';
import * as S from '../../classDetail.style';
import type { Student } from '@/features/students/types/student.types';

interface Props {
    open: boolean;
    classId: string;
    onClose: () => void;
    onAdded: () => void;
}

interface RowProps {
    student: Student;
    added: boolean;
    loading: boolean;
    onAdd: () => void;
}

function StudentSearchRow({ student, added, loading, onAdd }: RowProps) {
    const displayName = getStudentName(student);
    return (
        <ListItem disableGutters sx={{ py: 0.75 }}>
            <Box sx={{ display: 'flex', alignItems: 'center', gap: 1.5, flex: 1, minWidth: 0 }}>
                <S.StudentAvatar>{getInitials(displayName)}</S.StudentAvatar>
                <Box sx={{ flex: 1, minWidth: 0 }}>
                    <Typography variant="body2" fontWeight={600} noWrap>{displayName || '—'}</Typography>
                    <Typography variant="caption" color="text.secondary" noWrap>
                        {student.userCode ? `#${student.userCode}` : student.email ?? '—'}
                    </Typography>
                </Box>
                <Button
                    size="small"
                    variant={added ? 'outlined' : 'contained'}
                    color={added ? 'success' : 'primary'}
                    startIcon={added ? <CheckOutlined /> : <PersonAddOutlined />}
                    disabled={added || loading}
                    onClick={onAdd}
                    sx={{ flexShrink: 0 }}
                >
                    {added ? 'Đã thêm' : loading ? 'Đang thêm...' : 'Thêm'}
                </Button>
            </Box>
        </ListItem>
    );
}

export function AddStudentDialog({ open, classId, onClose, onAdded }: Props) {
    const [search, setSearch] = useState('');
    const debouncedSearch = useDebounce(search);
    const [addedIds, setAddedIds] = useState<Set<string>>(new Set());
    const [errorMsg, setErrorMsg] = useState('');

    const { data, isLoading } = useQuery({
        queryKey: ['students-search', classId, debouncedSearch],
        queryFn: () => studentApi.getAll({ search: debouncedSearch || undefined, limit: 20, class_id: classId }),
        enabled: open,
    });

    const students = useMemo(() => data?.data ?? [], [data]);

    const mutation = useMutation({
        mutationFn: (studentId: string) =>
            enrollmentApi.add({ student_id: studentId, class_id: classId }),
        onSuccess: (_, studentId) => {
            setAddedIds(prev => new Set(prev).add(studentId));
            setErrorMsg('');
            onAdded();
        },
        onError: (err: unknown) => setErrorMsg(getApiError(err)),
    });

    const handleClose = () => {
        setSearch('');
        setAddedIds(new Set());
        setErrorMsg('');
        onClose();
    };

    return (
        <Dialog open={open} onClose={handleClose} maxWidth="sm" fullWidth>
            <DialogTitle sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', pb: 1 }}>
                <Typography variant="h4" component="span">Thêm Học sinh vào Lớp</Typography>
                <IconButton size="small" onClick={handleClose}><Close /></IconButton>
            </DialogTitle>

            <DialogContent dividers sx={{ py: 2 }}>
                <TextField
                    placeholder="Tìm học sinh theo tên, email..."
                    value={search}
                    onChange={e => setSearch(e.target.value)}
                    fullWidth size="small" sx={{ mb: 2 }}
                    slotProps={{
                        input: {
                            startAdornment: (
                                <InputAdornment position="start">
                                    <Search fontSize="small" color="action" />
                                </InputAdornment>
                            ),
                        },
                    }}
                />

                {errorMsg && (
                    <Alert severity="error" sx={{ mb: 2 }} onClose={() => setErrorMsg('')}>
                        {errorMsg}
                    </Alert>
                )}

                <List disablePadding>
                    {isLoading
                        ? Array.from({ length: 4 }).map((_, i) => (
                            <ListItem key={i} disableGutters sx={{ py: 0.75 }}>
                                <Box sx={{ display: 'flex', alignItems: 'center', gap: 1.5, flex: 1 }}>
                                    <Skeleton variant="circular" width={36} height={36} />
                                    <Box sx={{ flex: 1 }}>
                                        <Skeleton width="50%" height={18} />
                                        <Skeleton width="35%" height={14} sx={{ mt: 0.5 }} />
                                    </Box>
                                    <Skeleton width={70} height={32} sx={{ borderRadius: 1 }} />
                                </Box>
                            </ListItem>
                        ))
                        : students.length === 0
                            ? (
                                <Box sx={{ textAlign: 'center', py: 4, color: 'text.secondary' }}>
                                    <Typography variant="body2">
                                        {debouncedSearch ? 'Không tìm thấy học sinh phù hợp' : 'Tất cả học sinh đã được thêm vào lớp hoặc nhập tên để tìm kiếm'}
                                    </Typography>
                                </Box>
                            )
                            : students.map(student => (
                                <StudentSearchRow
                                    key={student._id}
                                    student={student}
                                    added={addedIds.has(student._id)}
                                    loading={mutation.isPending && mutation.variables === student._id}
                                    onAdd={() => mutation.mutate(student._id)}
                                />
                            ))
                    }
                </List>
            </DialogContent>

            <DialogActions sx={{ px: 3, py: 2 }}>
                <Button variant="contained" onClick={handleClose}>Đóng</Button>
            </DialogActions>
        </Dialog>
    );
}
