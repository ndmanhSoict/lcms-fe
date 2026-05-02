import { useState } from 'react';
import { Typography, Box, TextField, InputAdornment, Button, Skeleton, Snackbar, Alert } from '@mui/material';
import { Search, School, CheckCircleOutline, BlockOutlined, Add, SearchOff } from '@mui/icons-material';
import * as S from './students.style';
import { useDebounce } from '@/hooks/useDebounce';
import { useSnackbar } from '@/hooks/useSnackbar';
import { useStudentList, useFilteredStudents } from './hooks/useStudents';
import { StudentRow } from './components/StudentRow';
import { CreateStudentDialog } from './components/CreateStudentDialog';
import { EditStudentDialog } from './components/EditStudentDialog';
import { StudentParentsDialog } from './components/StudentParentsDialog';
import type { Student, StudentFilterType } from './types/student.types';

const FILTER_TABS: { key: StudentFilterType; label: string }[] = [
    { key: 'All', label: 'Tất cả' },
    { key: 'Active', label: 'Đang học' },
    { key: 'Inactive', label: 'Ngừng' },
];

export const StudentsPage = () => {
    const [search, setSearch] = useState('');
    const debouncedSearch = useDebounce(search);
    const [activeFilter, setActiveFilter] = useState<StudentFilterType>('All');
    const [isCreateOpen, setIsCreateOpen] = useState(false);
    const [editStudent, setEditStudent] = useState<Student | null>(null);
    const [parentsStudent, setParentsStudent] = useState<Student | null>(null);
    const { snackbar, showSuccess, showError, close: closeSnackbar } = useSnackbar();

    const { students, stats, isLoading } = useStudentList(debouncedSearch);
    const filteredStudents = useFilteredStudents(students, activeFilter);

    const tabCount = (key: StudentFilterType) =>
        key === 'Active' ? stats.active : key === 'Inactive' ? stats.inactive : stats.total;

    return (
        <S.PageContainer>
            <S.PageHeader>
                <Box>
                    <Typography variant="h2" color="text.primary">Quản lý Học sinh</Typography>
                    <Typography variant="body2" color="text.secondary" mt={0.5}>
                        Quản lý hồ sơ học sinh của cơ sở
                    </Typography>
                </Box>
                <Button variant="contained" startIcon={<Add />} size="large" onClick={() => setIsCreateOpen(true)}>
                    Thêm Học sinh
                </Button>
            </S.PageHeader>

            <S.MetricsGrid>
                <S.MetricCard>
                    <S.MetricIconBox colorScheme="primary"><School /></S.MetricIconBox>
                    <Box>
                        <Typography variant="metricLabel" display="block">Tổng học sinh</Typography>
                        <Typography variant="metricValue">{isLoading ? <Skeleton width={40} /> : stats.total}</Typography>
                    </Box>
                </S.MetricCard>
                <S.MetricCard>
                    <S.MetricIconBox colorScheme="success"><CheckCircleOutline /></S.MetricIconBox>
                    <Box>
                        <Typography variant="metricLabel" display="block">Đang học</Typography>
                        <Typography variant="metricValue">{isLoading ? <Skeleton width={40} /> : stats.active}</Typography>
                    </Box>
                </S.MetricCard>
                <S.MetricCard>
                    <S.MetricIconBox colorScheme="error"><BlockOutlined /></S.MetricIconBox>
                    <Box>
                        <Typography variant="metricLabel" display="block">Ngừng học</Typography>
                        <Typography variant="metricValue">{isLoading ? <Skeleton width={40} /> : stats.inactive}</Typography>
                    </Box>
                </S.MetricCard>
            </S.MetricsGrid>

            <S.ToolbarContainer>
                <S.FilterTabsContainer>
                    {FILTER_TABS.map(({ key, label }) => (
                        <S.FilterTab key={key} active={activeFilter === key} onClick={() => setActiveFilter(key)}>
                            {label}
                            {!isLoading && (
                                <Box component="span" sx={{ ml: 0.75, opacity: 0.65, fontSize: '0.75rem' }}>
                                    ({tabCount(key)})
                                </Box>
                            )}
                        </S.FilterTab>
                    ))}
                </S.FilterTabsContainer>
                <S.SearchBox>
                    <TextField
                        placeholder="Tìm theo tên, mã học sinh..."
                        value={search}
                        onChange={e => setSearch(e.target.value)}
                        sx={{ minWidth: 280, backgroundColor: 'background.paper' }}
                        slotProps={{
                            input: {
                                startAdornment: (
                                    <InputAdornment position="start">
                                        <Search color="action" fontSize="small" />
                                    </InputAdornment>
                                ),
                            },
                        }}
                    />
                </S.SearchBox>
            </S.ToolbarContainer>

            <Box>
                <S.ListHeader>
                    <Typography variant="inherit">Học sinh</Typography>
                    <Typography variant="inherit">Liên hệ</Typography>
                    <Typography variant="inherit">Mã học sinh</Typography>
                    <Typography variant="inherit">Trạng thái</Typography>
                    <Typography variant="inherit" textAlign="right">Thao tác</Typography>
                </S.ListHeader>

                {isLoading
                    ? Array.from({ length: 5 }).map((_, i) => (
                        <S.StudentRow key={i}>
                            <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
                                <Skeleton variant="rounded" width={44} height={44} sx={{ borderRadius: 2, flexShrink: 0 }} />
                                <Box sx={{ flex: 1 }}>
                                    <Skeleton width="60%" height={20} />
                                    <Skeleton width="40%" height={16} sx={{ mt: 0.5 }} />
                                </Box>
                            </Box>
                            <Box><Skeleton width="70%" height={16} /><Skeleton width="50%" height={16} sx={{ mt: 0.5 }} /></Box>
                            <Skeleton width="60%" height={16} />
                            <Skeleton width={80} height={24} sx={{ borderRadius: 4 }} />
                            <Box sx={{ display: 'flex', justifyContent: 'flex-end', gap: 0.5 }}>
                                <Skeleton variant="circular" width={32} height={32} />
                                <Skeleton variant="circular" width={32} height={32} />
                            </Box>
                        </S.StudentRow>
                    ))
                    : filteredStudents.length === 0
                        ? (
                            <S.EmptyState>
                                <SearchOff sx={{ fontSize: 64, opacity: 0.25 }} />
                                <Typography variant="h5">
                                    {search ? 'Không tìm thấy kết quả' : 'Chưa có học sinh nào'}
                                </Typography>
                                <Typography variant="body2">
                                    {search ? 'Thử thay đổi từ khóa' : 'Nhấn "Thêm Học sinh" để bắt đầu'}
                                </Typography>
                            </S.EmptyState>
                        )
                        : filteredStudents.map(student => (
                            <StudentRow
                                key={student._id}
                                student={student}
                                onEdit={() => setEditStudent(student)}
                                onViewParents={() => setParentsStudent(student)}
                            />
                        ))
                }
            </Box>

            <CreateStudentDialog
                open={isCreateOpen}
                onClose={() => setIsCreateOpen(false)}
                onSuccess={() => { showSuccess('Thêm học sinh thành công!'); setIsCreateOpen(false); }}
                onError={showError}
            />
            <EditStudentDialog
                student={editStudent}
                onClose={() => setEditStudent(null)}
                onSuccess={() => { showSuccess('Cập nhật thông tin thành công!'); setEditStudent(null); }}
                onError={showError}
            />
            <StudentParentsDialog
                student={parentsStudent}
                onClose={() => setParentsStudent(null)}
            />

            <Snackbar open={snackbar.open} autoHideDuration={3500} onClose={closeSnackbar} anchorOrigin={{ vertical: 'bottom', horizontal: 'right' }}>
                <Alert severity={snackbar.severity} variant="filled" onClose={closeSnackbar} sx={{ minWidth: 280 }}>
                    {snackbar.message}
                </Alert>
            </Snackbar>
        </S.PageContainer>
    );
};
