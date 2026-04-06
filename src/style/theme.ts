import { createTheme } from '@mui/material/styles';

export const theme = createTheme({
    palette: {
        primary: {
            main: '#4F8EF7', // Xanh dương tươi
        },
        secondary: {
            main: '#7C3AED', // Tím
        },
        error: {
            main: '#EF4444',
        },
        warning: {
            main: '#F97316',
        },
        success: {
            main: '#10B981',
        },
        background: {
            default: '#F8FAFC',
            paper: '#FFFFFF',
        },
    },
    typography: {
        fontFamily: '"Inter", "system-ui", "sans-serif"',
        h1: { fontSize: 28, fontWeight: 700, color: '#1E293B' },
        h2: { fontSize: 22, fontWeight: 600, color: '#1E293B' },
    },
    shape: {
        borderRadius: 12,
    },
});