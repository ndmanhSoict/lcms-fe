import { styled, Drawer, ListItemButton, ListItemButtonProps, Box, Typography, List, alpha } from '@mui/material';

const SIDEBAR_WIDTH = 280;

export const SidebarDrawer = styled(Drawer)(({ theme }) => ({
    width: SIDEBAR_WIDTH,
    flexShrink: 0,
    '& .MuiDrawer-paper': {
        width: SIDEBAR_WIDTH,
        boxSizing: 'border-box',
        borderRight: 'none',
        backgroundColor: alpha(theme.palette.background.paper, 0.8),
        backdropFilter: 'blur(20px)',
        boxShadow: theme.palette.mode === 'light'
            ? '10px 0px 30px rgba(37, 99, 235, 0.05)'
            : '10px 0px 40px rgba(0, 0, 0, 0.4)',
        padding: theme.spacing(3, 2),
        display: 'flex',
        flexDirection: 'column',
    },
}));

// --- Logo Area ---
export const LogoContainer = styled(Box)(({ theme }) => ({
    marginBottom: theme.spacing(4),
    paddingLeft: theme.spacing(2),
    paddingRight: theme.spacing(2),
}));

export const LogoText = styled(Typography)(({ theme }) => ({
    fontWeight: 900,
    letterSpacing: '-0.5px',
    background: `linear-gradient(to right, ${theme.palette.tertiary.main}, ${theme.palette.primary.main})`,
    WebkitBackgroundClip: 'text',
    WebkitTextFillColor: 'transparent',
}));

export const LogoSubtext = styled(Typography)(({ theme }) => ({
    letterSpacing: '1px',
    color: theme.palette.text.secondary,
}));

// --- Navigation ---
export const NavList = styled(List)({
    flexGrow: 1,
    paddingLeft: 0,
    paddingRight: 0,
});

export const NavItem = styled(ListItemButton, {
    shouldForwardProp: (prop) => prop !== 'active',
})<ListItemButtonProps & { active?: boolean; to?: string }>(({ theme, active }) => ({
    borderRadius: 12,
    marginBottom: theme.spacing(0.5),
    background: active
        ? `linear-gradient(to right, ${theme.palette.primary.main}, ${theme.palette.secondary.main})`
        : 'transparent',
    color: active ? theme.palette.common.white : theme.palette.text.secondary,
    transition: 'all 0.2s ease-in-out',
    padding: theme.spacing(1.5, 2),
    '&:hover': {
        background: active
            ? `linear-gradient(to right, ${theme.palette.primary.main}, ${theme.palette.secondary.main})`
            : alpha(theme.palette.primary.main, 0.05),
        color: active ? theme.palette.common.white : theme.palette.primary.main,
        transform: active ? 'none' : 'translateX(4px)',
    },
    '& .MuiListItemIcon-root': {
        color: active ? theme.palette.common.white : 'inherit',
        minWidth: 40,
    },
    '& .MuiListItemText-primary': {
        fontWeight: active ? 600 : 500,
        fontSize: '0.875rem',
    }
}));

// --- Footer Area ---
export const FooterContainer = styled(Box)(({ theme }) => ({
    marginTop: 'auto',
    paddingLeft: theme.spacing(1),
    paddingRight: theme.spacing(1),
}));

export const UserCard = styled(Box)(({ theme }) => ({
    padding: theme.spacing(1.5),
    // Ép kiểu number giống như cách làm bên Header
    borderRadius: (theme.shape.borderRadius as number) * 1.5,
    backgroundColor: alpha(theme.palette.background.default, 0.5),
    display: 'flex',
    gap: theme.spacing(1.5),
    alignItems: 'center',
    border: `1px solid ${theme.palette.divider}`,
    marginTop: theme.spacing(3),
}));

export const UserInfoBox = styled(Box)({
    overflow: 'hidden',
});