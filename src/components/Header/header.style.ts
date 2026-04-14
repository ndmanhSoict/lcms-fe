import { styled, AppBar, Toolbar, Box, Typography, InputBase, IconButton, alpha } from '@mui/material';

const SIDEBAR_WIDTH = 280;

export const StyledHeader = styled(AppBar)(({ theme }) => ({
    width: `calc(100% - ${SIDEBAR_WIDTH}px)`,
    marginLeft: `${SIDEBAR_WIDTH}px`,
    backgroundColor: alpha(theme.palette.background.default, 0.65),
    backdropFilter: 'blur(16px)',
    WebkitBackdropFilter: 'blur(16px)',
    color: theme.palette.text.primary,
    boxShadow: 'none',
    borderBottom: `1px solid ${theme.palette.divider}`,
}));

export const HeaderToolbar = styled(Toolbar)({
    justifyContent: 'space-between',
    height: 80,
});

export const PageTitle = styled(Typography)(({ theme }) => ({
    color: theme.palette.text.primary,
    fontWeight: theme.typography.fontWeightBold,
}));

export const HeaderActions = styled(Box)(({ theme }) => ({
    display: 'flex',
    alignItems: 'center',
    gap: theme.spacing(3),
}));

export const SearchContainer = styled(Box)(({ theme }) => ({
    display: 'flex',
    alignItems: 'center',
    backgroundColor: alpha(theme.palette.background.paper, 0.8),
    padding: theme.spacing(0.75, 2),
    borderRadius: (theme.shape.borderRadius as number) * 1.5, // Tương đương borderRadius: 3 (12px)
    boxShadow: theme.shadows[1], // Dùng shadow chuẩn từ theme
    border: `1px solid ${theme.palette.divider}`, // Thêm viền nhẹ cho darkmode
}));

export const SearchInput = styled(InputBase)(({ theme }) => ({
    fontSize: '0.875rem',
    width: 200,
    color: theme.palette.text.primary,
}));

export const ActionIconButton = styled(IconButton)(({ theme }) => ({
    backgroundColor: alpha(theme.palette.background.paper, 0.8),
    borderRadius: (theme.shape.borderRadius as number) * 1.5,
    border: `1px solid ${theme.palette.divider}`,
    transition: 'all 0.2s ease-in-out',
    '&:hover': {
        backgroundColor: theme.palette.action.hover,
    }
}));

export const UserProfileBox = styled(Box)(({ theme }) => ({
    display: 'flex',
    alignItems: 'center',
    gap: theme.spacing(1),
    cursor: 'pointer',
    padding: theme.spacing(0.5, 1),
    borderRadius: (theme.shape.borderRadius as number) * 1.5,
    transition: 'all 0.2s ease-in-out',
    '&:hover': {
        backgroundColor: theme.palette.action.hover,
    }
}));