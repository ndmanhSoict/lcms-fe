import { ListItemIcon, ListItemText, Button, Avatar, Typography } from '@mui/material';
import { Dashboard, AccountTree, AdminPanelSettings, Analytics, Settings, PersonAdd } from '@mui/icons-material';
import { Link, useLocation } from '@tanstack/react-router';
import * as S from './sidebar.style';
import { useAuthStore } from '@/store/authStore';

const MENU_ITEMS = [
    { text: 'Dashboard', icon: <Dashboard />, path: '/dashboard' },
    { text: 'Branches', icon: <AccountTree />, path: '/branches' },
    { text: 'Admins', icon: <AdminPanelSettings />, path: '/admins' },
    { text: 'Analytics', icon: <Analytics />, path: '/analytics' },
    { text: 'Settings', icon: <Settings />, path: '/settings' },
];

export const Sidebar = () => {
    const location = useLocation();
    const user = useAuthStore((state) => state.user);

    return (
        <S.SidebarDrawer variant="permanent">
            {/* Logo Area */}
            <S.LogoContainer>
                <S.LogoText variant="h5">
                    EduCore
                </S.LogoText>
                <S.LogoSubtext variant="caption">
                    System Portal
                </S.LogoSubtext>
            </S.LogoContainer>

            {/* Navigation */}
            <S.NavList>
                {MENU_ITEMS.map((item) => {
                    const isActive = location.pathname.startsWith(item.path);
                    return (
                        <S.NavItem key={item.text} active={isActive} component={Link} to={item.path}>
                            <ListItemIcon>{item.icon}</ListItemIcon>
                            <ListItemText primary={item.text} />
                        </S.NavItem>
                    );
                })}
            </S.NavList>

            {/* Footer Area */}
            <S.FooterContainer>
                <Button 
                    fullWidth 
                    variant="contained" 
                    startIcon={<PersonAdd />}
                >
                    Invite Member
                </Button>

                {/* User Card */}
                <S.UserCard>
                    <Avatar 
                        src="/admin-avatar.png" 
                        variant="rounded" 
                    />
                    <S.UserInfoBox>
                        <Typography variant="subtitle2" fontWeight="bold" color="text.primary" noWrap>
                            {user?.fullName || 'Admin User'}
                        </Typography>
                        <Typography variant="caption" color="text.secondary" display="block" noWrap>
                            {user?.email || 'admin@educore.io'}
                        </Typography>
                    </S.UserInfoBox>
                </S.UserCard>
            </S.FooterContainer>
        </S.SidebarDrawer>
    );
};