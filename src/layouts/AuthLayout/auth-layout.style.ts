import { styled, Box, alpha } from '@mui/material';

export const LayoutWrapper = styled(Box)(({ theme }) => {
  // Lấy màu từ palette để tạo Mesh Gradient tương thích cả 2 mode
  const blob1 = alpha(theme.palette.primary.light, 0.4);
  const blob2 = alpha(theme.palette.secondary.light, 0.4);
  const blob3 = alpha(theme.palette.tertiary.light, 0.4);
  const base = theme.palette.background.default;

  return {
    display: 'flex',
    minHeight: '100vh',
    backgroundColor: base,
    background: `radial-gradient(at 0% 0%, ${blob1} 0px, transparent 50%),
                 radial-gradient(at 100% 0%, ${blob2} 0px, transparent 50%),
                 radial-gradient(at 100% 100%, ${blob3} 0px, transparent 50%),
                 radial-gradient(at 0% 100%, ${base} 0px, transparent 50%)`,
    backgroundAttachment: 'fixed',
  };
});

export const MainContent = styled('main')(({ theme }) => ({
  flexGrow: 1,
  padding: theme.spacing(4),
  marginTop: 80, // Chiều cao của Header
  minHeight: '100vh',
}));