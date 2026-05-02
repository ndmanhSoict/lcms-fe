import { useState } from 'react';
import {
    Typography, Box, TextField, InputAdornment, Button,
    Skeleton, Snackbar, Alert,
} from '@mui/material';
import {
    Search, Class as ClassIcon, CheckCircleOutline, LockOutlined, Add, SearchOff,
} from '@mui/icons-material';
import { useNavigate } from '@tanstack/react-router';
import * as S from './classes.style';
import { useDebounce } from '@/hooks/useDebounce';
import { useSnackbar } from '@/hooks/useSnackbar';
import { useClassList, useFilteredClasses } from './hooks/useClasses';
import { ClassRow } from './components/ClassRow';
import { CreateClassDialog } from './components/CreateClassDialog';
import { EditClassDialog } from './components/EditClassDialog';
import { CloseClassDialog } from './components/CloseClassDialog';
import type { ClassItem, ClassFilterType } from './types/class.types';

const FILTER_TABS: { key: ClassFilterType; label: string }[] = [
    { key: 'All', label: 'Tất cả' },
    { key: 'Active', label: 'Đang hoạt động' },
    { key: 'Closed', label: 'Đã đóng' },
];

export const ClassesPage = () => {
    const navigate = useNavigate();
    const [search, setSearch] = useState('');
    const debouncedSearch = useDebounce(search);
    const [activeFilter, setActiveFilter] = useState<ClassFilterType>('All');
    const [isCreateOpen, setIsCreateOpen] = useState(false);
    const [editClass, setEditClass] = useState<ClassItem | null>(null);
    const [closeClass, setCloseClass] = useState<ClassItem | null>(null);
    const { snackbar, showSuccess, showError, close: closeSnackbar } = useSnackbar();

    const { classes, stats, isLoading } = useClassList(debouncedSearch);
    const filteredClasses = useFilteredClasses(classes, activeFilter);

    const tabCount = (key: ClassFilterType) =>
        key === 'Active' ? stats.active : key === 'Closed' ? stats.closed : stats.total;

    return (
        <S.PageContainer>
            <S.PageHeader>
                <Box>
                    <Typography variant="h2" color="text.primary">Quản lý Lớp học</Typography>
                    <Typography variant="body2" color="text.secondary" mt={0.5}>
                        Quản lý các lớp học tại cơ sở
                    </Typography>
                </Box>
                <Button variant="contained" startIcon={<Add />} size="large" onClick={() => setIsCreateOpen(true)}>
                    Thêm Lớp học
                </Button>
            </S.PageHeader>

            <S.MetricsGrid>
                <S.MetricCard>
                    <S.MetricIconBox colorScheme="primary"><ClassIcon /></S.MetricIconBox>
                    <Box>
                        <Typography variant="metricLabel" display="block">Tổng lớp học</Typography>
                        <Typography variant="metricValue">
                            {isLoading ? <Skeleton width={40} /> : stats.total}
                        </Typography>
                    </Box>
                </S.MetricCard>
                <S.MetricCard>
                    <S.MetricIconBox colorScheme="success"><CheckCircleOutline /></S.MetricIconBox>
                    <Box>
                        <Typography variant="metricLabel" display="block">Đang hoạt động</Typography>
                        <Typography variant="metricValue">
                            {isLoading ? <Skeleton width={40} /> : stats.active}
                        </Typography>
                    </Box>
                </S.MetricCard>
                <S.MetricCard>
                    <S.MetricIconBox colorScheme="error"><LockOutlined /></S.MetricIconBox>
                    <Box>
                        <Typography variant="metricLabel" display="block">Đã đóng</Typography>
                        <Typography variant="metricValue">
                            {isLoading ? <Skeleton width={40} /> : stats.closed}
                        </Typography>
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
                        placeholder="Tìm theo tên, mã lớp..."
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
                    <Typography variant="inherit">Lớp học</Typography>
                    <Typography variant="inherit">Môn học</Typography>
                    <Typography variant="inherit">Học phí</Typography>
                    <Typography variant="inherit">Học sinh</Typography>
                    <Typography variant="inherit">Trạng thái</Typography>
                    <Typography variant="inherit" textAlign="right">Thao tác</Typography>
                </S.ListHeader>

                {isLoading
                    ? Array.from({ length: 5 }).map((_, i) => (
                        <S.ClassRow key={i}>
                            <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
                                <Skeleton variant="rounded" width={44} height={44} sx={{ borderRadius: 2, flexShrink: 0 }} />
                                <Box sx={{ flex: 1 }}>
                                    <Skeleton width="65%" height={20} />
                                    <Skeleton width="45%" height={16} sx={{ mt: 0.5 }} />
                                </Box>
                            </Box>
                            <Skeleton width="70%" height={16} />
                            <Skeleton width="60%" height={16} />
                            <Skeleton width="40%" height={16} />
                            <Skeleton width={80} height={24} sx={{ borderRadius: 4 }} />
                            <Box sx={{ display: 'flex', justifyContent: 'flex-end', gap: 0.5 }}>
                                <Skeleton variant="circular" width={32} height={32} />
                                <Skeleton variant="circular" width={32} height={32} />
                            </Box>
                        </S.ClassRow>
                    ))
                    : filteredClasses.length === 0
                        ? (
                            <S.EmptyState>
                                <SearchOff sx={{ fontSize: 64, opacity: 0.25 }} />
                                <Typography variant="h5">
                                    {search ? 'Không tìm thấy kết quả' : 'Chưa có lớp học nào'}
                                </Typography>
                                <Typography variant="body2">
                                    {search ? 'Thử thay đổi từ khóa' : 'Nhấn "Thêm Lớp học" để bắt đầu'}
                                </Typography>
                            </S.EmptyState>
                        )
                        : filteredClasses.map(c => (
                            <ClassRow
                                key={c._id}
                                classItem={c}
                                onEdit={() => setEditClass(c)}
                                onClose={() => setCloseClass(c)}
                                onDetail={() => navigate({ to: '/classes/$classId', params: { classId: c._id } })}
                            />
                        ))
                }
            </Box>

            <CreateClassDialog
                open={isCreateOpen}
                onClose={() => setIsCreateOpen(false)}
                onSuccess={() => { showSuccess('Tạo lớp học thành công!'); setIsCreateOpen(false); }}
                onError={showError}
            />
            <EditClassDialog
                classItem={editClass}
                onClose={() => setEditClass(null)}
                onSuccess={() => { showSuccess('Cập nhật lớp học thành công!'); setEditClass(null); }}
                onError={showError}
            />
            <CloseClassDialog
                classItem={closeClass}
                onClose={() => setCloseClass(null)}
                onSuccess={() => { showSuccess('Đã đóng lớp học.'); setCloseClass(null); }}
                onError={showError}
            />

            <Snackbar
                open={snackbar.open}
                autoHideDuration={3500}
                onClose={closeSnackbar}
                anchorOrigin={{ vertical: 'bottom', horizontal: 'right' }}
            >
                <Alert severity={snackbar.severity} variant="filled" onClose={closeSnackbar} sx={{ minWidth: 280 }}>
                    {snackbar.message}
                </Alert>
            </Snackbar>
        </S.PageContainer>
    );
};
