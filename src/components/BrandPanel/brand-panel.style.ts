import { styled, Box, Typography } from '@mui/material';

export const PanelContainer = styled(Box)(({ theme }) => ({
    display: 'none',
    [theme.breakpoints.up('lg')]: {
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'center',
        width: '50%',
        position: 'relative',
        overflow: 'hidden',
        padding: theme.spacing(4),
        backgroundColor: theme.palette.background.default,
        // Mesh gradient background từ DESIGN.md
        backgroundImage: theme.palette.mode === 'dark'
            ? `radial-gradient(at 0% 0%, rgba(30, 58, 95, 0.4) 0px, transparent 50%),
               radial-gradient(at 100% 0%, rgba(19, 78, 74, 0.4) 0px, transparent 50%),
               radial-gradient(at 50% 50%, rgba(30, 27, 75, 0.4) 0px, transparent 50%)`
            : `radial-gradient(at 50% 50%, rgba(37, 99, 235, 0.15) 0px, transparent 50%),
               radial-gradient(at 0% 0%, rgba(13, 148, 136, 0.1) 0px, transparent 40%),
               radial-gradient(at 100% 100%, rgba(124, 58, 237, 0.1) 0px, transparent 40%)`,
    },
}));

export const LogoOrb = styled(Box)(({ theme }) => ({
    width: 80,
    height: 80,
    borderRadius: '50%',
    background: 'linear-gradient(135deg, #2563EB 0%, #0D9488 100%)',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: theme.spacing(4),
    boxShadow: '0px 0px 40px rgba(37, 99, 235, 0.4)',
}));

export const GradientText = styled(Typography)({
    background: 'linear-gradient(135deg, #2563EB 0%, #0D9488 100%)',
    WebkitBackgroundClip: 'text',
    WebkitTextFillColor: 'transparent',
});

export const FeatureCard = styled(Box)(({ theme }) => ({
    display: 'flex',
    alignItems: 'center',
    gap: theme.spacing(2),
    padding: theme.spacing(2),
    borderRadius: theme.shape.borderRadius,
    backgroundColor: theme.palette.mode === 'dark' ? 'rgba(19, 27, 46, 0.4)' : 'rgba(255, 255, 255, 0.4)',
    backdropFilter: 'blur(8px)',
    width: '100%',
    maxWidth: 380,
}));

export const FeatureIconBox = styled(Box)({
    width: 40,
    height: 40,
    borderRadius: 8,
    background: 'linear-gradient(135deg, #2563EB 0%, #0D9488 100%)',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    color: '#fff',
});