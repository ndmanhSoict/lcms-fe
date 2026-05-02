import { useEffect } from 'react';
import { useNavigate, useLocation } from '@tanstack/react-router';
import { Header } from '@/components/Header/Header';
import { Sidebar } from '@/components/Sidebar/Sidebar';
import { Box, styled } from '@mui/material';
import { useAuthStore } from '@/store/authStore';

const LayoutWrapper = styled(Box)({
    display: 'flex',
    minHeight: '100vh',
    background: `radial-gradient(at 0% 0%, rgba(219, 234, 254, 0.4) 0px, transparent 50%),
                 radial-gradient(at 100% 0%, rgba(204, 251, 241, 0.4) 0px, transparent 50%),
                 radial-gradient(at 100% 100%, rgba(237, 233, 254, 0.4) 0px, transparent 50%),
                 radial-gradient(at 0% 100%, rgba(248, 250, 252, 1) 0px, transparent 50%)`,
    backgroundAttachment: 'fixed',
});

const MainContent = styled('main')(({ theme }) => ({
    flexGrow: 1,
    padding: theme.spacing(4),
    marginTop: 80,
    minHeight: '100vh',
}));

const getTitleFromPath = (path: string) => {
    if (path.includes('branches')) return 'Quản lý Cơ sở';
    if (path.includes('admins')) return 'Quản lý Quản trị viên';
    if (path.includes('analytics')) return 'Phân tích Hệ thống';
    if (path.includes('settings')) return 'Cài đặt Hệ thống';
    return 'Tổng quan';
};

const AdminLayout = ({ children }: { children?: React.ReactNode }) => {
    const user = useAuthStore(state => state.user);
    const navigate = useNavigate();
    const location = useLocation();
    const title = getTitleFromPath(location.pathname);

    useEffect(() => {
        if (!user) {
            navigate({ to: '/login' });
            return;
        }
        if (user.role.toUpperCase() !== 'SYSTEM_OWNER') {
            navigate({ to: '/403' });
        }
    }, [user, navigate]);

    if (!user || user.role.toUpperCase() !== 'SYSTEM_OWNER') {
        return null;
    }

    return (
        <LayoutWrapper>
            <Sidebar />
            <Box sx={{ flexGrow: 1 }}>
                <Header title={title} />
                <MainContent>
                    {children}
                </MainContent>
            </Box>
        </LayoutWrapper>
    );
};

export default AdminLayout;
