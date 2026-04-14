import { styled, Box, Paper, Divider } from '@mui/material';

export const StyledPaper = styled(Paper)(({ theme }) => ({
    padding: theme.spacing(5),
    width: '100%',
    maxWidth: 440,
    position: 'relative',
    overflow: 'hidden',
    // Viền gradient ở trên cùng của Card
    '&::before': {
        content: '""',
        position: 'absolute',
        top: 0,
        left: 0,
        right: 0,
        height: 2,
        background: 'linear-gradient(135deg, #2563EB 0%, #0D9488 100%)',
    }
}));

export const StyledDivider = styled(Divider)(({ theme }) => ({
    margin: theme.spacing(4, 0),
    '& .MuiDivider-wrapper': {
        color: theme.palette.text.secondary,
        fontSize: '0.75rem',
        fontWeight: 500,
    }
}));

export const SocialButton = styled(Box)(({ theme }) => ({
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    gap: theme.spacing(1),
    padding: theme.spacing(1.5),
    border: `1px solid ${theme.palette.divider}`,
    borderRadius: theme.shape.borderRadius,
    cursor: 'pointer',
    transition: 'all 0.2s',
    '&:hover': {
        backgroundColor: theme.palette.action.hover,
    }
}));