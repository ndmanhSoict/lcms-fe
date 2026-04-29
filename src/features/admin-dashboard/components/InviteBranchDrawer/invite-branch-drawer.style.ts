import { styled, Box, Drawer, alpha } from '@mui/material';

const DRAWER_WIDTH = 480;

export const StyledDrawer = styled(Drawer)(({ theme }) => ({
    width: DRAWER_WIDTH,
    flexShrink: 0,
    '& .MuiDrawer-paper': {
        width: DRAWER_WIDTH,
        boxSizing: 'border-box',
        borderLeft: 'none',
        // Hiệu ứng Glassmorphism nhẹ tương đồng với Sidebar
        backgroundColor: alpha(theme.palette.background.paper, 0.95),
        backdropFilter: 'blur(16px)',
        boxShadow: theme.palette.mode === 'light' 
            ? '-10px 0px 40px rgba(15, 23, 42, 0.08)' 
            : '-10px 0px 40px rgba(0, 0, 0, 0.4)',
        padding: theme.spacing(8, 6), // Padding lớn tạo không gian thoáng
        display: 'flex',
        flexDirection: 'column',
    },
}));

export const DrawerHeader = styled(Box)(({ theme }) => ({
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: theme.spacing(8),
}));

export const FormContainer = styled(Box)(({ theme }) => ({
    display: 'flex',
    flexDirection: 'column',
    gap: theme.spacing(5), // Khoảng cách giữa các field
    flexGrow: 1,
}));

export const InputGroup = styled(Box)(({ theme }) => ({
    display: 'flex',
    flexDirection: 'column',
    gap: theme.spacing(1.5),
}));

export const FooterDisclaimer = styled(Box)(({ theme }) => ({
    marginTop: theme.spacing(4),
    padding: theme.spacing(3),
    borderRadius: theme.shape.borderRadius,
    backgroundColor: alpha(theme.palette.primary.main, 0.04),
    textAlign: 'center',
    '& .MuiTypography-root': {
        fontSize: '0.75rem',
        color: theme.palette.text.secondary,
        lineHeight: 1.6,
    }
}));