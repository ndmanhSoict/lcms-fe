import { styled, Box, AppBar } from '@mui/material';

export const LayoutContainer = styled(Box)({
    margin: '0 auto',
    display: 'flex',
    flexDirection: 'column',
    minHeight: '100vh',
});

export const StyledAppBar = styled(AppBar)(({ theme }) => ({
    backgroundColor: theme.palette.background.paper,
    boxShadow: theme.palette.mode === 'light' ? '0px 0px 0px 1px #E0E0E0' : '0px 0px 0px 1px #2D3449',
    '& .MuiToolbar-root': {
        minHeight: 52,
        [theme.breakpoints.down('sm')]: {
            paddingLeft: theme.spacing(2),
        },
    },
}));

export const ContentBox = styled(Box)(({ theme }) => ({
    flexGrow: 1,
    backgroundColor: theme.palette.mode === 'light' ? theme.palette.grey[50] : theme.palette.background.default,
}));