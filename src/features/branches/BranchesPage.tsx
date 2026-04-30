import { useState, useMemo, useEffect } from 'react';
import {
    Typography, Box, TextField, InputAdornment, Button,
    IconButton, Snackbar, Alert, Skeleton, Tooltip,
} from '@mui/material';
import {
    Search, AccountTree, CheckCircleOutline, BlockOutlined,
    EditOutlined, PowerSettingsNew, Add, SearchOff,
} from '@mui/icons-material';
import { useQuery, useQueryClient } from '@tanstack/react-query';
import * as S from './branches.style';
import { branchApi, Branch } from './api/branch.api';
import { CreateBranchDialog } from './CreateBranchDialog';
import { EditBranchDialog } from './EditBranchDialog';
import { ToggleConfirmDialog } from './ToggleConfirmDialog';

type FilterType = 'All' | 'Active' | 'Inactive';

const FILTER_TABS: { key: FilterType; label: string }[] = [
    { key: 'All', label: 'Tất cả' },
    { key: 'Active', label: 'Hoạt động' },
    { key: 'Inactive', label: 'Ngừng hoạt động' },
];

function getInitials(name: string): string {
    return name
        .split(/\s+/)
        .filter(Boolean)
        .slice(0, 2)
        .map(w => w[0].toUpperCase())
        .join('');
}

export const BranchesPage = () => {
    const queryClient = useQueryClient();

    const [search, setSearch] = useState('');
    const [debouncedSearch, setDebouncedSearch] = useState('');
    const [activeFilter, setActiveFilter] = useState<FilterType>('All');
    const [isCreateOpen, setIsCreateOpen] = useState(false);
    const [editBranch, setEditBranch] = useState<Branch | null>(null);
    const [toggleBranch, setToggleBranch] = useState<Branch | null>(null);
    const [snackbar, setSnackbar] = useState<{
        open: boolean;
        message: string;
        severity: 'success' | 'error';
    }>({ open: false, message: '', severity: 'success' });

    useEffect(() => {
        const timer = setTimeout(() => setDebouncedSearch(search.trim()), 400);
        return () => clearTimeout(timer);
    }, [search]);

    const { data, isLoading } = useQuery({
        queryKey: ['branches', debouncedSearch],
        queryFn: () => branchApi.getAll({ limit: 100, search: debouncedSearch || undefined }),
    });

    const branches = data?.data ?? [];

    const filteredBranches = useMemo(() => {
        if (activeFilter === 'Active') return branches.filter(b => b.isActive);
        if (activeFilter === 'Inactive') return branches.filter(b => !b.isActive);
        return branches;
    }, [branches, activeFilter]);

    const stats = useMemo(() => ({
        total: branches.length,
        active: branches.filter(b => b.isActive).length,
        inactive: branches.filter(b => !b.isActive).length,
    }), [branches]);

    const tabCount = (key: FilterType) => {
        if (key === 'Active') return stats.active;
        if (key === 'Inactive') return stats.inactive;
        return stats.total;
    };

    const showSuccess = (msg: string) =>
        setSnackbar({ open: true, message: msg, severity: 'success' });
    const showError = (msg: string) =>
        setSnackbar({ open: true, message: msg, severity: 'error' });

    const handleMutationSuccess = (msg: string) => {
        queryClient.invalidateQueries({ queryKey: ['branches'] });
        showSuccess(msg);
        setIsCreateOpen(false);
        setEditBranch(null);
        setToggleBranch(null);
    };

    const loadingRows = Array.from({ length: 5 });

    return (
        <S.PageContainer>
            {/* Page Header */}
            <S.PageHeader>
                <Box>
                    <Typography variant="h2" color="text.primary">
                        Quản lý Cơ sở
                    </Typography>
                    <Typography variant="body2" color="text.secondary" mt={0.5}>
                        Quản lý tất cả các cơ sở học tập trong hệ thống
                    </Typography>
                </Box>
                <Button
                    variant="contained"
                    startIcon={<Add />}
                    size="large"
                    onClick={() => setIsCreateOpen(true)}
                >
                    Thêm Cơ sở
                </Button>
            </S.PageHeader>

            {/* Metric Cards */}
            <S.MetricsGrid>
                <S.MetricCard>
                    <S.MetricIconBox colorScheme="primary">
                        <AccountTree />
                    </S.MetricIconBox>
                    <Box>
                        <Typography variant="metricLabel" display="block">Tổng cơ sở</Typography>
                        <Typography variant="metricValue">
                            {isLoading ? <Skeleton width={40} /> : stats.total}
                        </Typography>
                    </Box>
                </S.MetricCard>

                <S.MetricCard>
                    <S.MetricIconBox colorScheme="success">
                        <CheckCircleOutline />
                    </S.MetricIconBox>
                    <Box>
                        <Typography variant="metricLabel" display="block">Đang hoạt động</Typography>
                        <Typography variant="metricValue">
                            {isLoading ? <Skeleton width={40} /> : stats.active}
                        </Typography>
                    </Box>
                </S.MetricCard>

                <S.MetricCard>
                    <S.MetricIconBox colorScheme="error">
                        <BlockOutlined />
                    </S.MetricIconBox>
                    <Box>
                        <Typography variant="metricLabel" display="block">Ngừng hoạt động</Typography>
                        <Typography variant="metricValue">
                            {isLoading ? <Skeleton width={40} /> : stats.inactive}
                        </Typography>
                    </Box>
                </S.MetricCard>
            </S.MetricsGrid>

            {/* Toolbar: Filter + Search */}
            <S.ToolbarContainer>
                <S.FilterTabsContainer>
                    {FILTER_TABS.map(({ key, label }) => (
                        <S.FilterTab
                            key={key}
                            active={activeFilter === key}
                            onClick={() => setActiveFilter(key)}
                        >
                            {label}
                            {!isLoading && (
                                <Box
                                    component="span"
                                    sx={{ ml: 0.75, opacity: 0.65, fontSize: '0.75rem' }}
                                >
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

            {/* Branch List */}
            <Box>
                <S.ListHeader>
                    <Typography variant="inherit">Tên cơ sở</Typography>
                    <Typography variant="inherit">Liên hệ</Typography>
                    <Typography variant="inherit">Địa chỉ</Typography>
                    <Typography variant="inherit">Trạng thái</Typography>
                    <Typography variant="inherit" textAlign="right">Thao tác</Typography>
                </S.ListHeader>

                {isLoading
                    ? loadingRows.map((_, i) => (
                        <S.BranchRow key={i}>
                            <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
                                <Skeleton variant="rounded" width={44} height={44} sx={{ borderRadius: 2, flexShrink: 0 }} />
                                <Box sx={{ flex: 1 }}>
                                    <Skeleton width="60%" height={20} />
                                    <Skeleton width="40%" height={16} sx={{ mt: 0.5 }} />
                                </Box>
                            </Box>
                            <Box>
                                <Skeleton width="70%" height={16} />
                                <Skeleton width="50%" height={16} sx={{ mt: 0.5 }} />
                            </Box>
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
                                    {search
                                        ? 'Thử thay đổi từ khóa hoặc bộ lọc'
                                        : 'Nhấn "Thêm Cơ sở" để bắt đầu'}
                                </Typography>
                            </S.EmptyState>
                        )
                        : filteredBranches.map(branch => (
                            <BranchRowItem
                                key={branch._id}
                                branch={branch}
                                onEdit={() => setEditBranch(branch)}
                                onToggle={() => setToggleBranch(branch)}
                            />
                        ))
                }
            </Box>

            {/* Dialogs */}
            <CreateBranchDialog
                open={isCreateOpen}
                onClose={() => setIsCreateOpen(false)}
                onSuccess={() => handleMutationSuccess('Tạo cơ sở thành công!')}
                onError={showError}
            />

            <EditBranchDialog
                branch={editBranch}
                onClose={() => setEditBranch(null)}
                onSuccess={() => handleMutationSuccess('Cập nhật cơ sở thành công!')}
                onError={showError}
            />

            <ToggleConfirmDialog
                branch={toggleBranch}
                onClose={() => setToggleBranch(null)}
                onSuccess={() =>
                    handleMutationSuccess(
                        toggleBranch?.isActive
                            ? 'Đã vô hiệu hóa cơ sở.'
                            : 'Đã kích hoạt cơ sở thành công!',
                    )
                }
                onError={showError}
            />

            {/* Snackbar feedback */}
            <Snackbar
                open={snackbar.open}
                autoHideDuration={3500}
                onClose={() => setSnackbar(s => ({ ...s, open: false }))}
                anchorOrigin={{ vertical: 'bottom', horizontal: 'right' }}
            >
                <Alert
                    severity={snackbar.severity}
                    variant="filled"
                    onClose={() => setSnackbar(s => ({ ...s, open: false }))}
                    sx={{ minWidth: 280 }}
                >
                    {snackbar.message}
                </Alert>
            </Snackbar>
        </S.PageContainer>
    );
};

// ─── Sub-component: one table row ────────────────────────────────────────────

interface BranchRowItemProps {
    branch: Branch;
    onEdit: () => void;
    onToggle: () => void;
}

function BranchRowItem({ branch, onEdit, onToggle }: BranchRowItemProps) {
    const initials = getInitials(branch.name);

    return (
        <S.BranchRow>
            {/* Col 1: Branch identity */}
            <Box sx={{ display: 'flex', alignItems: 'center', gap: 2, minWidth: 0 }}>
                <S.BranchAvatar>{initials}</S.BranchAvatar>
                <Box sx={{ minWidth: 0 }}>
                    <Typography variant="subtitle1" color="text.primary" fontWeight={600} noWrap>
                        {branch.name}
                    </Typography>
                    <Typography variant="body2" color="text.secondary" noWrap>
                        #{branch.code}
                    </Typography>
                </Box>
            </Box>

            {/* Col 2: Contact */}
            <Box sx={{ minWidth: 0 }}>
                {branch.email ? (
                    <Typography variant="body2" color="text.secondary" noWrap>
                        {branch.email}
                    </Typography>
                ) : null}
                {branch.phone ? (
                    <Typography variant="body2" color="text.secondary" noWrap>
                        {branch.phone}
                    </Typography>
                ) : null}
                {!branch.email && !branch.phone && (
                    <Typography variant="body2" color="text.disabled">—</Typography>
                )}
            </Box>

            {/* Col 3: Address */}
            <Typography variant="body2" color="text.secondary" noWrap>
                {branch.address || '—'}
            </Typography>

            {/* Col 4: Status */}
            <S.StatusPill active={branch.isActive}>
                {branch.isActive ? 'Hoạt động' : 'Ngừng'}
            </S.StatusPill>

            {/* Col 5: Actions */}
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
