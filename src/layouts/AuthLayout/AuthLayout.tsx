import { Header } from '@/components/Header/Header';
import { Sidebar } from '@/components/Sidebar/Sidebar';
import { Box, styled } from '@mui/material';
import { useLocation } from '@tanstack/react-router';

// Mesh Gradient Background bao phủ toàn bộ app
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
  marginTop: 80, // Bằng với chiều cao của Header
  minHeight: '100vh',
}));

// Hàm tiện ích để lấy title dựa trên route hiện tại
const getTitleFromPath = (path: string) => {
  if (path.includes('branches')) return 'Branch Management';
  if (path.includes('admins')) return 'Admin Management';
  if (path.includes('analytics')) return 'System Analytics';
  if (path.includes('settings')) return 'System Settings';
  return 'Dashboard Overview';
};

const AdminLayout = ({ children }: { children?: React.ReactNode }) => {
  const location = useLocation();
  const title = getTitleFromPath(location.pathname);

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