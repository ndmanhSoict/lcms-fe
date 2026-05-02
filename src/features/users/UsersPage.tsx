import { useState } from 'react';
import { Typography, Box, TextField, InputAdornment, Button, Skeleton, Snackbar, Alert } from '@mui/material';
import {
    Search, ManageAccountsOutlined, Add, SearchOff,
    AdminPanelSettingsOutlined, BadgeOutlined,
} from '@mui/icons-material';
import * as S from './users.style';
import { useDebounce } from '@/hooks/useDebounce';
import { useSnackbar } from '@/hooks/useSnackbar';
import { useUserList, useFilteredUsers } from './hooks/useUsers';
import { UserRow } from './components/UserRow';
import { CreateUserDialog } from './components/CreateUserDialog';
import { EditUserDialog } from './components/EditUserDialog';
import { UserDetailDialog } from './components/UserDetailDialog';
import { DeactivateUserDialog } from './components/DeactivateUserDialog';
import type { User, RoleFilter } from './types/user.types';

const FILTER_TABS: { key: RoleFilter; label: string }[] = [
    { key: 'ALL', label: 'Tất cả' },
    { key: 'BRANCH_OWNER', label: 'Chủ cơ sở' },
    { key: 'STAFF', label: 'Nhân viên' },
];

export const UsersPage = () => {
    const [search, setSearch] = useState('');
    const debouncedSearch = useDebounce(search);
    const [roleFilter, setRoleFilter] = useState<RoleFilter>('ALL');
    const [isCreateOpen, setIsCreateOpen] = useState(false);
    const [editUser, setEditUser] = useState<User | null>(null);
    const [detailUser, setDetailUser] = useState<User | null>(null);
    const [deactivateUser, setDeactivateUser] = useState<User | null>(null);
    const { snackbar, showSuccess, showError, close: closeSnackbar } = useSnackbar();

    const { allUsers, stats, isLoading } = useUserList(debouncedSearch);
    const filteredUsers = useFilteredUsers(allUsers, roleFilter);

    const tabCount = (key: RoleFilter) =>
        key === 'BRANCH_OWNER' ? stats.owners : key === 'STAFF' ? stats.staff : stats.total;

    return (
        <S.PageContainer>
            <S.PageHeader>
                <Box>
                    <Typography variant="h2" color="text.primary">Quản lý Tài khoản</Typography>
                    <Typography variant="body2" color="text.secondary" mt={0.5}>
                        Quản lý tài khoản chủ cơ sở và nhân viên
                    </Typography>
                </Box>
                <Button variant="contained" startIcon={<Add />} size="large" onClick={() => setIsCreateOpen(true)}>
                    Thêm Tài khoản
                </Button>
            </S.PageHeader>

            <S.MetricsGrid>
                <S.MetricCard>
                    <S.MetricIconBox colorScheme="primary"><ManageAccountsOutlined /></S.MetricIconBox>
                    <Box>
                        <Typography variant="metricLabel" display="block">Tổng tài khoản</Typography>
                        <Typography variant="metricValue">{isLoading ? <Skeleton width={40} /> : stats.total}</Typography>
                    </Box>
                </S.MetricCard>
                <S.MetricCard>
                    <S.MetricIconBox colorScheme="info"><AdminPanelSettingsOutlined /></S.MetricIconBox>
                    <Box>
                        <Typography variant="metricLabel" display="block">Chủ cơ sở</Typography>
                        <Typography variant="metricValue">{isLoading ? <Skeleton width={40} /> : stats.owners}</Typography>
                    </Box>
                </S.MetricCard>
                <S.MetricCard>
                    <S.MetricIconBox colorScheme="success"><BadgeOutlined /></S.MetricIconBox>
                    <Box>
                        <Typography variant="metricLabel" display="block">Nhân viên</Typography>
                        <Typography variant="metricValue">{isLoading ? <Skeleton width={40} /> : stats.staff}</Typography>
                    </Box>
                </S.MetricCard>
            </S.MetricsGrid>

            <S.ToolbarContainer>
                <S.FilterTabsContainer>
                    {FILTER_TABS.map(({ key, label }) => (
                        <S.FilterTab key={key} active={roleFilter === key} onClick={() => setRoleFilter(key)}>
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
                    <Typography variant="inherit">Tài khoản</Typography>
                    <Typography variant="inherit">Liên hệ</Typography>
                    <Typography variant="inherit">Mã tài khoản</Typography>
                    <Typography variant="inherit">Vai trò</Typography>
                    <Typography variant="inherit">Trạng thái</Typography>
                    <Typography variant="inherit" textAlign="right">Thao tác</Typography>
                </S.ListHeader>

                {isLoading
                    ? Array.from({ length: 5 }).map((_, i) => (
                        <S.UserRow key={i}>
                            <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
                                <Skeleton variant="rounded" width={44} height={44} sx={{ borderRadius: 2, flexShrink: 0 }} />
                                <Box sx={{ flex: 1 }}>
                                    <Skeleton width="60%" height={20} />
                                    <Skeleton width="40%" height={16} sx={{ mt: 0.5 }} />
                                </Box>
                            </Box>
                            <Box><Skeleton width="70%" height={16} /></Box>
                            <Skeleton width="60%" height={16} />
                            <Skeleton width={80} height={24} sx={{ borderRadius: 4 }} />
                            <Skeleton width={80} height={24} sx={{ borderRadius: 4 }} />
                            <Box sx={{ display: 'flex', justifyContent: 'flex-end', gap: 0.5 }}>
                                <Skeleton variant="circular" width={32} height={32} />
                                <Skeleton variant="circular" width={32} height={32} />
                                <Skeleton variant="circular" width={32} height={32} />
                            </Box>
                        </S.UserRow>
                    ))
                    : filteredUsers.length === 0
                        ? (
                            <S.EmptyState>
                                <SearchOff sx={{ fontSize: 64, opacity: 0.25 }} />
                                <Typography variant="h5">
                                    {search ? 'Không tìm thấy kết quả' : 'Chưa có tài khoản nào'}
                                </Typography>
                                <Typography variant="body2">
                                    {search ? 'Thử thay đổi từ khóa' : 'Nhấn "Thêm Tài khoản" để bắt đầu'}
                                </Typography>
                            </S.EmptyState>
                        )
                        : filteredUsers.map(u => (
                            <UserRow
                                key={u._id}
                                user={u}
                                onEdit={() => setEditUser(u)}
                                onDetail={() => setDetailUser(u)}
                                onDeactivate={() => setDeactivateUser(u)}
                            />
                        ))
                }
            </Box>

            <CreateUserDialog
                open={isCreateOpen}
                onClose={() => setIsCreateOpen(false)}
                onSuccess={() => { showSuccess('Thêm tài khoản thành công!'); setIsCreateOpen(false); }}
                onError={showError}
            />
            <EditUserDialog
                user={editUser}
                onClose={() => setEditUser(null)}
                onSuccess={() => { showSuccess('Cập nhật thông tin thành công!'); setEditUser(null); }}
                onError={showError}
            />
            <UserDetailDialog user={detailUser} onClose={() => setDetailUser(null)} />
            <DeactivateUserDialog
                user={deactivateUser}
                onClose={() => setDeactivateUser(null)}
                onSuccess={() => { showSuccess('Đã vô hiệu hóa tài khoản.'); setDeactivateUser(null); }}
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
