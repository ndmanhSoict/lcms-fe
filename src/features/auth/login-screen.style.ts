import { styled, Box } from '@mui/material';

export const ScreenContainer = styled(Box)({
    display: 'flex',
    minHeight: '100vh',
    width: '100%',
});

export const FormPanel = styled(Box)(({ theme }) => ({
    width: '100%',
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
    padding: theme.spacing(4),
    position: 'relative',
    [theme.breakpoints.up('lg')]: {
        width: '50%',
    },
}));