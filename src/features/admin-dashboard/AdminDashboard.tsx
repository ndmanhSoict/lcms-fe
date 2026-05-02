import { useState } from 'react';
import { Typography, Box, TextField, InputAdornment, Button, IconButton } from '@mui/material';
import {
    Search, AccountTreeOutlined, CheckCircleOutline,
    MoreHoriz, BlockOutlined, EditOutlined,
    MoreVert, MailOutline, History
} from '@mui/icons-material';
import * as S from './admin-dashboard.style';
import { InviteBranchDrawer } from './components/InviteBranchDrawer/InviteBranchDrawer';

const MOCK_METRICS = [
    { title: 'Tổng cơ sở', value: '24', icon: <AccountTreeOutlined />, colorScheme: 'primary' },
    { title: 'Đang hoạt động', value: '18', icon: <CheckCircleOutline />, colorScheme: 'success' },
    { title: 'Chờ duyệt', value: '4', icon: <MoreHoriz />, colorScheme: 'warning' },
    { title: 'Ngừng hoạt động', value: '2', icon: <BlockOutlined />, colorScheme: 'neutral' },
] as const;

const MOCK_BRANCHES = [
    { id: '1', name: 'Sunrise Academy', email: 'sunrise@edu.com', location: 'Hồ Chí Minh', students: 1240, status: 'active', initials: 'SA', color: 'primary' },
    { id: '2', name: 'Nova Learning Center', email: 'contact@novalearn.org', location: 'Hà Nội', students: 850, status: 'active', initials: 'NL', color: 'secondary' },
    { id: '3', name: 'StarBright Institute', email: 'admin@starbright.edu', location: 'Đà Nẵng', students: 0, status: 'pending', initials: 'SB', color: 'tertiary' },
    { id: '4', name: 'EduVision Center', email: 'info@eduvision.com', location: 'Cần Thơ', students: 540, status: 'active', initials: 'EV', color: 'warning' },
    { id: '5', name: 'Bright Minds Hub', email: 'hello@brightminds.edu', location: 'Hải Phòng', students: 0, status: 'inactive', initials: 'BM', color: 'success' },
    { id: '6', name: 'Pioneer Academy', email: 'ops@pioneer.academy', location: 'Nha Trang', students: 1100, status: 'active', initials: 'PA', color: 'primary' },
] as const;

const STATUS_LABEL: Record<string, string> = {
    active: 'Hoạt động',
    pending: 'Chờ duyệt',
    inactive: 'Ngừng',
};

export const AdminDashboard = () => {
    const [activeFilter, setActiveFilter] = useState('Tất cả');
    const [isInviteDrawerOpen, setIsInviteDrawerOpen] = useState(false);
    const filters = ['Tất cả', 'Hoạt động', 'Chờ duyệt', 'Ngừng'];

    return (
        <S.DashboardContainer>
            {/* 1. Metrics Grid */}
            <S.MetricsGrid>
                {MOCK_METRICS.map((metric, idx) => (
                    <S.MetricCard key={idx}>
                        <S.MetricIconBox colorScheme={metric.colorScheme}>
                            {metric.icon}
                        </S.MetricIconBox>
                        <Box>
                            <Typography variant="metricLabel" display="block">
                                {metric.title}
                            </Typography>
                            <Typography variant="metricValue">
                                {metric.value}
                            </Typography>
                        </Box>
                    </S.MetricCard>
                ))}
            </S.MetricsGrid>

            {/* 2. Bộ lọc & Toolbar */}
            <S.ToolbarContainer>
                <S.FilterTabsContainer>
                    {filters.map(filter => (
                        <S.FilterTab
                            key={filter}
                            active={activeFilter === filter}
                            onClick={() => setActiveFilter(filter)}
                        >
                            {filter}
                        </S.FilterTab>
                    ))}
                </S.FilterTabsContainer>

                <S.SearchAndActionBox>
                    <TextField
                        placeholder="Tìm kiếm cơ sở..."
                        sx={{ minWidth: 260, backgroundColor: 'background.paper' }}
                        slotProps={{
                            input: {
                                startAdornment: (
                                    <InputAdornment position="start">
                                        <Search color="action" fontSize="small" />
                                    </InputAdornment>
                                )
                            }
                        }}
                    />
                    <Button variant="contained" color="primary" startIcon={<span>+</span>} onClick={() => setIsInviteDrawerOpen(true)}>
                        Mời Cơ sở Mới
                    </Button>
                </S.SearchAndActionBox>
            </S.ToolbarContainer>

            {/* 3. Danh sách cơ sở */}
            <Box>
                <S.ListHeader>
                    <Typography variant="inherit">Tên cơ sở</Typography>
                    <Typography variant="inherit">Địa điểm</Typography>
                    <Typography variant="inherit">Học sinh đang học</Typography>
                    <Typography variant="inherit">Trạng thái</Typography>
                    <Typography variant="inherit" textAlign="right">Thao tác</Typography>
                </S.ListHeader>

                {MOCK_BRANCHES.map(branch => (
                    <S.BranchRow key={branch.id}>
                        <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
                            <S.BranchAvatar colorScheme={branch.color}>
                                {branch.initials}
                            </S.BranchAvatar>
                            <Box>
                                <Typography variant="subtitle1" color="text.primary">
                                    {branch.name}
                                </Typography>
                                <Typography variant="body2" color="text.secondary">
                                    {branch.email}
                                </Typography>
                            </Box>
                        </Box>

                        <Typography variant="body2" color="text.secondary" fontWeight={500}>
                            {branch.location}
                        </Typography>

                        <Typography variant="subtitle1" fontWeight="bold" color="text.primary">
                            {branch.students.toLocaleString()}
                        </Typography>

                        <Box>
                            <S.StatusPill status={branch.status}>
                                {STATUS_LABEL[branch.status] ?? branch.status}
                            </S.StatusPill>
                        </Box>

                        <Box sx={{ display: 'flex', justifyContent: 'flex-end', gap: 0.5 }}>
                            <IconButton size="medium">
                                {branch.status === 'active' && <EditOutlined fontSize="small" />}
                                {branch.status === 'pending' && <MailOutline fontSize="small" />}
                                {branch.status === 'inactive' && <History fontSize="small" />}
                            </IconButton>
                            <IconButton size="medium">
                                <MoreVert fontSize="small" />
                            </IconButton>
                        </Box>
                    </S.BranchRow>
                ))}
            </Box>

            <InviteBranchDrawer
                open={isInviteDrawerOpen}
                onClose={() => setIsInviteDrawerOpen(false)}
            />
        </S.DashboardContainer>
    );
};
