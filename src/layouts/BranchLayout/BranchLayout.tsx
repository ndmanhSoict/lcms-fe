import { useEffect } from 'react';
import { useNavigate, useLocation } from '@tanstack/react-router';
import { Header } from '@/components/Header/Header';
import { BranchSidebar } from '@/components/BranchSidebar/BranchSidebar';
import { Box, styled } from '@mui/material';
import { useAuthStore } from '@/store/authStore';

const ALLOWED_ROLES = ['BRANCH_OWNER', 'STAFF'];

const LayoutWrapper = styled(Box)({
    display: 'flex',
    minHeight: '100vh',
    background: `radial-gradient(at 0% 0%, rgba(204, 251, 241, 0.35) 0px, transparent 50%),
                 radial-gradient(at 100% 0%, rgba(219, 234, 254, 0.35) 0px, transparent 50%),
                 radial-gradient(at 100% 100%, rgba(237, 253, 245, 0.35) 0px, transparent 50%),
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
    if (path.includes('students')) return 'Quản lý Học sinh';
    if (path.match(/\/classes\/[^/]+/)) return 'Chi tiết Lớp học';
    if (path.includes('classes')) return 'Quản lý Lớp học';
    if (path.includes('teachers')) return 'Quản lý Giáo viên';
    if (path.includes('users')) return 'Quản lý Tài khoản';
    return 'Quản lý Cơ sở';
};

const BranchLayout = ({ children }: { children?: React.ReactNode }) => {
    const user = useAuthStore(state => state.user);
    const navigate = useNavigate();
    const location = useLocation();
    const title = getTitleFromPath(location.pathname);

    useEffect(() => {
        if (!user) {
            navigate({ to: '/login' });
            return;
        }
        if (!ALLOWED_ROLES.includes(user.role.toUpperCase())) {
            navigate({ to: '/403' });
        }
    }, [user, navigate]);

    if (!user || !ALLOWED_ROLES.includes(user.role.toUpperCase())) {
        return null;
    }

    return (
        <LayoutWrapper>
            <BranchSidebar />
            <Box sx={{ flexGrow: 1 }}>
                <Header title={title} />
                <MainContent>{children}</MainContent>
            </Box>
        </LayoutWrapper>
    );
};

export default BranchLayout;
