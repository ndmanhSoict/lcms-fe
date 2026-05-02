import { useState } from 'react';
import { Typography, Box, TextField, InputAdornment, Button, Skeleton, Snackbar, Alert } from '@mui/material';
import { Search, SchoolOutlined, CheckCircleOutline, BlockOutlined, Add, SearchOff } from '@mui/icons-material';
import * as S from './teachers.style';
import { useDebounce } from '@/hooks/useDebounce';
import { useSnackbar } from '@/hooks/useSnackbar';
import { useTeacherList, useFilteredTeachers } from './hooks/useTeachers';
import { TeacherRow } from './components/TeacherRow';
import { CreateTeacherDialog } from './components/CreateTeacherDialog';
import { EditTeacherDialog } from './components/EditTeacherDialog';
import { DeactivateTeacherDialog } from './components/DeactivateTeacherDialog';
import type { Teacher, TeacherFilterType } from './types/teacher.types';

const FILTER_TABS: { key: TeacherFilterType; label: string }[] = [
    { key: 'All', label: 'Tất cả' },
    { key: 'Active', label: 'Đang hoạt động' },
    { key: 'Inactive', label: 'Đã vô hiệu hóa' },
];

export const TeachersPage = () => {
    const [search, setSearch] = useState('');
    const debouncedSearch = useDebounce(search);
    const [activeFilter, setActiveFilter] = useState<TeacherFilterType>('All');
    const [isCreateOpen, setIsCreateOpen] = useState(false);
    const [editTeacher, setEditTeacher] = useState<Teacher | null>(null);
    const [deleteTeacher, setDeleteTeacher] = useState<Teacher | null>(null);
    const { snackbar, showSuccess, showError, close: closeSnackbar } = useSnackbar();

    const { teachers, stats, isLoading } = useTeacherList(debouncedSearch);
    const filteredTeachers = useFilteredTeachers(teachers, activeFilter);

    const tabCount = (key: TeacherFilterType) =>
        key === 'Active' ? stats.active : key === 'Inactive' ? stats.inactive : stats.total;

    return (
        <S.PageContainer>
            <S.PageHeader>
                <Box>
                    <Typography variant="h2" color="text.primary">Quản lý Giáo viên</Typography>
                    <Typography variant="body2" color="text.secondary" mt={0.5}>
                        Quản lý tài khoản giáo viên tại cơ sở
                    </Typography>
                </Box>
                <Button variant="contained" startIcon={<Add />} size="large" onClick={() => setIsCreateOpen(true)}>
                    Thêm Giáo viên
                </Button>
            </S.PageHeader>

            <S.MetricsGrid>
                <S.MetricCard>
                    <S.MetricIconBox colorScheme="primary"><SchoolOutlined /></S.MetricIconBox>
                    <Box>
                        <Typography variant="metricLabel" display="block">Tổng giáo viên</Typography>
                        <Typography variant="metricValue">{isLoading ? <Skeleton width={40} /> : stats.total}</Typography>
                    </Box>
                </S.MetricCard>
                <S.MetricCard>
                    <S.MetricIconBox colorScheme="success"><CheckCircleOutline /></S.MetricIconBox>
                    <Box>
                        <Typography variant="metricLabel" display="block">Đang hoạt động</Typography>
                        <Typography variant="metricValue">{isLoading ? <Skeleton width={40} /> : stats.active}</Typography>
                    </Box>
                </S.MetricCard>
                <S.MetricCard>
                    <S.MetricIconBox colorScheme="error"><BlockOutlined /></S.MetricIconBox>
                    <Box>
                        <Typography variant="metricLabel" display="block">Đã vô hiệu hóa</Typography>
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
                        placeholder="Tìm theo tên, email..."
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
                    <Typography variant="inherit">Giáo viên</Typography>
                    <Typography variant="inherit">Môn học</Typography>
                    <Typography variant="inherit">Liên hệ</Typography>
                    <Typography variant="inherit">Mã giáo viên</Typography>
                    <Typography variant="inherit">Trạng thái</Typography>
                    <Typography variant="inherit" textAlign="right">Thao tác</Typography>
                </S.ListHeader>

                {isLoading
                    ? Array.from({ length: 5 }).map((_, i) => (
                        <S.TeacherRow key={i}>
                            <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
                                <Skeleton variant="rounded" width={44} height={44} sx={{ borderRadius: 2, flexShrink: 0 }} />
                                <Box sx={{ flex: 1 }}>
                                    <Skeleton width="60%" height={20} />
                                    <Skeleton width="40%" height={16} sx={{ mt: 0.5 }} />
                                </Box>
                            </Box>
                            <Box sx={{ display: 'flex', gap: 0.5, flexWrap: 'wrap' }}>
                                <Skeleton width={60} height={24} sx={{ borderRadius: 4 }} />
                            </Box>
                            <Box><Skeleton width="70%" height={16} /></Box>
                            <Skeleton width="60%" height={16} />
                            <Skeleton width={80} height={24} sx={{ borderRadius: 4 }} />
                            <Box sx={{ display: 'flex', justifyContent: 'flex-end', gap: 0.5 }}>
                                <Skeleton variant="circular" width={32} height={32} />
                                <Skeleton variant="circular" width={32} height={32} />
                            </Box>
                        </S.TeacherRow>
                    ))
                    : filteredTeachers.length === 0
                        ? (
                            <S.EmptyState>
                                <SearchOff sx={{ fontSize: 64, opacity: 0.25 }} />
                                <Typography variant="h5">
                                    {search ? 'Không tìm thấy kết quả' : 'Chưa có giáo viên nào'}
                                </Typography>
                                <Typography variant="body2">
                                    {search ? 'Thử thay đổi từ khóa' : 'Nhấn "Thêm Giáo viên" để bắt đầu'}
                                </Typography>
                            </S.EmptyState>
                        )
                        : filteredTeachers.map(teacher => (
                            <TeacherRow
                                key={teacher._id}
                                teacher={teacher}
                                onEdit={() => setEditTeacher(teacher)}
                                onDelete={() => setDeleteTeacher(teacher)}
                            />
                        ))
                }
            </Box>

            <CreateTeacherDialog
                open={isCreateOpen}
                onClose={() => setIsCreateOpen(false)}
                onSuccess={() => { showSuccess('Thêm giáo viên thành công!'); setIsCreateOpen(false); }}
                onError={showError}
            />
            <EditTeacherDialog
                teacher={editTeacher}
                onClose={() => setEditTeacher(null)}
                onSuccess={() => { showSuccess('Cập nhật thông tin thành công!'); setEditTeacher(null); }}
                onError={showError}
            />
            <DeactivateTeacherDialog
                teacher={deleteTeacher}
                onClose={() => setDeleteTeacher(null)}
                onSuccess={() => { showSuccess('Đã xóa giáo viên thành công.'); setDeleteTeacher(null); }}
                onError={showError}
            />

            <Snackbar open={snackbar.open} autoHideDuration={3500} onClose={closeSnackbar} anchorOrigin={{ vertical: 'bottom', horizontal: 'right' }}>
                <Alert severity={snackbar.severity} variant="filled" onClose={closeSnackbar} sx={{ minWidth: 280 }}>
                    {snackbar.message}
                </Alert>
            </Snackbar>
        </S.PageContainer>
    );
};
