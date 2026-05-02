import { ListItemIcon, ListItemText, Button, Avatar, Typography } from '@mui/material';
import { Dashboard, AccountTree, AdminPanelSettings, Analytics, Settings, PersonAdd } from '@mui/icons-material';
import { Link, useLocation } from '@tanstack/react-router';
import * as S from './sidebar.style';
import { useAuthStore } from '@/store/authStore';

const MENU_ITEMS = [
    { text: 'Tổng quan', icon: <Dashboard />, path: '/dashboard' },
    { text: 'Cơ sở', icon: <AccountTree />, path: '/branches' },
    { text: 'Quản trị viên', icon: <AdminPanelSettings />, path: '/admins' },
    { text: 'Phân tích', icon: <Analytics />, path: '/analytics' },
    { text: 'Cài đặt', icon: <Settings />, path: '/settings' },
];

export const Sidebar = () => {
    const location = useLocation();
    const user = useAuthStore((state) => state.user);

    return (
        <S.SidebarDrawer variant="permanent">
            <S.LogoContainer>
                <S.LogoText variant="h5">
                    EduCore
                </S.LogoText>
                <S.LogoSubtext variant="caption">
                    Hệ thống Quản trị
                </S.LogoSubtext>
            </S.LogoContainer>

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

            <S.FooterContainer>
                <Button
                    fullWidth
                    variant="contained"
                    startIcon={<PersonAdd />}
                >
                    Mời thành viên
                </Button>

                <S.UserCard>
                    <Avatar
                        src="/admin-avatar.png"
                        variant="rounded"
                    />
                    <S.UserInfoBox>
                        <Typography variant="subtitle2" fontWeight="bold" color="text.primary" noWrap>
                            {user?.fullName || 'Quản trị viên'}
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
