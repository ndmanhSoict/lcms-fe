import { useState } from 'react';
import { Typography, Box, TextField, InputAdornment, Button, Skeleton, Snackbar, Alert } from '@mui/material';
import { Search, AccountTree, CheckCircleOutline, BlockOutlined, Add, SearchOff } from '@mui/icons-material';
import * as S from './branches.style';
import { useDebounce } from '@/hooks/useDebounce';
import { useSnackbar } from '@/hooks/useSnackbar';
import { useBranchList, useFilteredBranches } from './hooks/useBranches';
import { BranchRow } from './components/BranchRow';
import { CreateBranchDialog } from './components/CreateBranchDialog';
import { EditBranchDialog } from './components/EditBranchDialog';
import { ToggleConfirmDialog } from './components/ToggleConfirmDialog';
import type { Branch, BranchFilterType } from './types/branch.types';

const FILTER_TABS: { key: BranchFilterType; label: string }[] = [
    { key: 'All', label: 'Tất cả' },
    { key: 'Active', label: 'Hoạt động' },
    { key: 'Inactive', label: 'Ngừng hoạt động' },
];

export const BranchesPage = () => {
    const [search, setSearch] = useState('');
    const debouncedSearch = useDebounce(search);
    const [activeFilter, setActiveFilter] = useState<BranchFilterType>('All');
    const [isCreateOpen, setIsCreateOpen] = useState(false);
    const [editBranch, setEditBranch] = useState<Branch | null>(null);
    const [toggleBranch, setToggleBranch] = useState<Branch | null>(null);
    const { snackbar, showSuccess, showError, close: closeSnackbar } = useSnackbar();

    const { branches, stats, isLoading } = useBranchList(debouncedSearch);
    const filteredBranches = useFilteredBranches(branches, activeFilter);

    const tabCount = (key: BranchFilterType) => {
        if (key === 'Active') return stats.active;
        if (key === 'Inactive') return stats.inactive;
        return stats.total;
    };

    return (
        <S.PageContainer>
            <S.PageHeader>
                <Box>
                    <Typography variant="h2" color="text.primary">Quản lý Cơ sở</Typography>
                    <Typography variant="body2" color="text.secondary" mt={0.5}>
                        Quản lý tất cả các cơ sở học tập trong hệ thống
                    </Typography>
                </Box>
                <Button variant="contained" startIcon={<Add />} size="large" onClick={() => setIsCreateOpen(true)}>
                    Thêm Cơ sở
                </Button>
            </S.PageHeader>

            <S.MetricsGrid>
                <S.MetricCard>
                    <S.MetricIconBox colorScheme="primary"><AccountTree /></S.MetricIconBox>
                    <Box>
                        <Typography variant="metricLabel" display="block">Tổng cơ sở</Typography>
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
                        <Typography variant="metricLabel" display="block">Ngừng hoạt động</Typography>
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
                <S.SearchAndActionBox>
                    <TextField
                        placeholder="Tìm theo tên, mã cơ sở..."
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
                </S.SearchAndActionBox>
            </S.ToolbarContainer>

            <Box>
                <S.ListHeader>
                    <Typography variant="inherit">Tên cơ sở</Typography>
                    <Typography variant="inherit">Liên hệ</Typography>
                    <Typography variant="inherit">Địa chỉ</Typography>
                    <Typography variant="inherit">Trạng thái</Typography>
                    <Typography variant="inherit" textAlign="right">Thao tác</Typography>
                </S.ListHeader>

                {isLoading
                    ? Array.from({ length: 5 }).map((_, i) => (
                        <S.BranchRow key={i}>
                            <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
                                <Skeleton variant="rounded" width={44} height={44} sx={{ borderRadius: 2, flexShrink: 0 }} />
                                <Box sx={{ flex: 1 }}>
                                    <Skeleton width="60%" height={20} />
                                    <Skeleton width="40%" height={16} sx={{ mt: 0.5 }} />
                                </Box>
                            </Box>
                            <Box><Skeleton width="70%" height={16} /><Skeleton width="50%" height={16} sx={{ mt: 0.5 }} /></Box>
                            <Skeleton width="80%" height={16} />
                            <Skeleton width={80} height={24} sx={{ borderRadius: 4 }} />
                            <Box sx={{ display: 'flex', justifyContent: 'flex-end', gap: 0.5 }}>
                                <Skeleton variant="circular" width={32} height={32} />
                                <Skeleton variant="circular" width={32} height={32} />
                            </Box>
                        </S.BranchRow>
                    ))
                    : filteredBranches.length === 0
                        ? (
                            <S.EmptyState>
                                <SearchOff sx={{ fontSize: 64, opacity: 0.25 }} />
                                <Typography variant="h5">
                                    {search ? 'Không tìm thấy kết quả' : 'Chưa có cơ sở nào'}
                                </Typography>
                                <Typography variant="body2">
                                    {search ? 'Thử thay đổi từ khóa hoặc bộ lọc' : 'Nhấn "Thêm Cơ sở" để bắt đầu'}
                                </Typography>
                            </S.EmptyState>
                        )
                        : filteredBranches.map(branch => (
                            <BranchRow
                                key={branch._id}
                                branch={branch}
                                onEdit={() => setEditBranch(branch)}
                                onToggle={() => setToggleBranch(branch)}
                            />
                        ))
                }
            </Box>

            <CreateBranchDialog
                open={isCreateOpen}
                onClose={() => setIsCreateOpen(false)}
                onSuccess={() => { showSuccess('Tạo cơ sở thành công!'); setIsCreateOpen(false); }}
                onError={showError}
            />
            <EditBranchDialog
                branch={editBranch}
                onClose={() => setEditBranch(null)}
                onSuccess={() => { showSuccess('Cập nhật cơ sở thành công!'); setEditBranch(null); }}
                onError={showError}
            />
            <ToggleConfirmDialog
                branch={toggleBranch}
                onClose={() => setToggleBranch(null)}
                onSuccess={() => {
                    showSuccess(toggleBranch?.isActive ? 'Đã vô hiệu hóa cơ sở.' : 'Đã kích hoạt cơ sở thành công!');
                    setToggleBranch(null);
                }}
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
