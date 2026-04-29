import { useState } from 'react';
import { Typography, Box, TextField, InputAdornment, Button, IconButton } from '@mui/material';
import { 
    Search, AccountTreeOutlined, CheckCircleOutline, 
    MoreHoriz, BlockOutlined, EditOutlined, 
    MoreVert, MailOutline, History 
} from '@mui/icons-material';
import * as S from './admin-dashboard.style';
import { InviteBranchDrawer } from './components/InviteBranchDrawer/InviteBranchDrawer';

// Mock Data
const MOCK_METRICS = [
    { title: 'Total Branches', value: '24', icon: <AccountTreeOutlined />, colorScheme: 'primary' },
    { title: 'Active', value: '18', icon: <CheckCircleOutline />, colorScheme: 'success' },
    { title: 'Pending', value: '4', icon: <MoreHoriz />, colorScheme: 'warning' },
    { title: 'Inactive', value: '2', icon: <BlockOutlined />, colorScheme: 'neutral' },
] as const;

const MOCK_BRANCHES = [
    { id: '1', name: 'Sunrise Academy', email: 'sunrise@edu.com', location: 'San Francisco, CA', students: 1240, status: 'active', initials: 'SA', color: 'primary' },
    { id: '2', name: 'Nova Learning Center', email: 'contact@novalearn.org', location: 'Austin, TX', students: 850, status: 'active', initials: 'NL', color: 'secondary' },
    { id: '3', name: 'StarBright Institute', email: 'admin@starbright.edu', location: 'New York, NY', students: 0, status: 'pending', initials: 'SB', color: 'tertiary' },
    { id: '4', name: 'EduVision Center', email: 'info@eduvision.com', location: 'Chicago, IL', students: 540, status: 'active', initials: 'EV', color: 'warning' },
    { id: '5', name: 'Bright Minds Hub', email: 'hello@brightminds.edu', location: 'Seattle, WA', students: 0, status: 'inactive', initials: 'BM', color: 'success' },
    { id: '6', name: 'Pioneer Academy', email: 'ops@pioneer.academy', location: 'Denver, CO', students: 1100, status: 'active', initials: 'PA', color: 'primary' },
] as const;

export const AdminDashboard = () => {
    const [activeFilter, setActiveFilter] = useState('All');
    const [isInviteDrawerOpen, setIsInviteDrawerOpen] = useState(false);
    const filters = ['All', 'Active', 'Pending', 'Inactive'];

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

            {/* 2. Filters & Actions Toolbar */}
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
                        placeholder="Search branches..."
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
                    <Button variant="contained" color="primary"  startIcon={<span>+</span>} onClick={() => setIsInviteDrawerOpen(true)}>
                        Invite New Branch
                    </Button>
                </S.SearchAndActionBox>
            </S.ToolbarContainer>

            {/* 3. Branch List */}
            <Box>
                <S.ListHeader>
                    <Typography variant="inherit">Branch Name</Typography>
                    <Typography variant="inherit">Location</Typography>
                    <Typography variant="inherit">Active Students</Typography>
                    <Typography variant="inherit">Status</Typography>
                    <Typography variant="inherit" textAlign="right">Actions</Typography>
                </S.ListHeader>

                {MOCK_BRANCHES.map(branch => (
                    <S.BranchRow key={branch.id}>
                        {/* Cột 1: Thông tin Branch */}
                        <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
                            <S.BranchAvatar colorScheme={branch.color as any}>
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

                        {/* Cột 2: Location */}
                        <Typography variant="body2" color="text.secondary" fontWeight={500}>
                            {branch.location}
                        </Typography>

                        {/* Cột 3: Students */}
                        <Typography variant="subtitle1" fontWeight="bold" color="text.primary">
                            {branch.students.toLocaleString()}
                        </Typography>

                        {/* Cột 4: Status */}
                        <Box>
                            <S.StatusPill status={branch.status as any}>
                                {branch.status}
                            </S.StatusPill>
                        </Box>

                        {/* Cột 5: Actions */}
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