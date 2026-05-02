import { ListItemIcon, ListItemText, Avatar, Typography } from '@mui/material';
import { School, Class as ClassIcon, SchoolOutlined, ManageAccountsOutlined } from '@mui/icons-material';
import { Link, useLocation } from '@tanstack/react-router';
import * as S from '@/components/Sidebar/sidebar.style';
import { useAuthStore } from '@/store/authStore';

const MENU_ITEMS = [
    { text: 'Học sinh', icon: <School />, path: '/students' },
    { text: 'Lớp học', icon: <ClassIcon />, path: '/classes' },
    { text: 'Giáo viên', icon: <SchoolOutlined />, path: '/teachers' },
    { text: 'Tài khoản', icon: <ManageAccountsOutlined />, path: '/users' },
];

export const BranchSidebar = () => {
    const location = useLocation();
    const user = useAuthStore(state => state.user);

    const roleLabel =
        user?.role === 'BRANCH_OWNER' ? 'Chủ cơ sở' : 'Nhân viên';

    return (
        <S.SidebarDrawer variant="permanent">
            <S.LogoContainer>
                <S.LogoText variant="h5">EduCore</S.LogoText>
                <S.LogoSubtext variant="caption">Cổng Cơ sở</S.LogoSubtext>
            </S.LogoContainer>

            <S.NavList>
                {MENU_ITEMS.map(item => {
                    const isActive = location.pathname.startsWith(item.path);
                    return (
                        <S.NavItem
                            key={item.text}
                            active={isActive}
                            component={Link}
                            to={item.path}
                        >
                            <ListItemIcon>{item.icon}</ListItemIcon>
                            <ListItemText primary={item.text} />
                        </S.NavItem>
                    );
                })}
            </S.NavList>

            <S.FooterContainer>
                <S.UserCard>
                    <Avatar variant="rounded">
                        {user?.fullName?.charAt(0) ?? 'B'}
                    </Avatar>
                    <S.UserInfoBox>
                        <Typography
                            variant="subtitle2"
                            fontWeight="bold"
                            color="text.primary"
                            noWrap
                        >
                            {user?.fullName ?? 'Branch User'}
                        </Typography>
                        <Typography
                            variant="caption"
                            color="text.secondary"
                            display="block"
                            noWrap
                        >
                            {roleLabel}
                        </Typography>
                    </S.UserInfoBox>
                </S.UserCard>
            </S.FooterContainer>
        </S.SidebarDrawer>
    );
};
