import { createTheme, ThemeOptions, alpha } from '@mui/material/styles';

declare module '@mui/material/styles' {
    interface Palette {
        tertiary: Palette['primary'];
    }
    interface PaletteOptions {
        tertiary?: PaletteOptions['primary'];
    }
}

export const getAppTheme = (mode: 'light' | 'dark') => {
    const lightPalette = {
        primary: { main: '#2563EB', light: '#DBEAFE', dark: '#003ea8' },
        secondary: { main: '#0D9488', light: '#CCFBF1', dark: '#005049' },
        tertiary: { main: '#7C3AED', light: '#EDE9FE', dark: '#3f008e' },
        background: { default: '#F8FAFC', paper: '#FFFFFF' },
        text: { primary: '#0f172a', secondary: '#64748b' },
        divider: alpha('#434655', 0.1),
    };

    const darkPalette = {
        primary: { main: '#B4C5FF', light: '#dbe1ff', dark: '#2563eb' },
        secondary: { main: '#6BD8CB', light: '#89f5e7', dark: '#0D9488' },
        tertiary: { main: '#D2BBFF', light: '#eaddff', dark: '#7C3AED' },
        background: { default: '#0b1326', paper: '#171F33' },
        text: { primary: '#dae2fd', secondary: '#c3c6d7' },
        divider: alpha('#8d90a0', 0.1), // Ghost border fallback
    };

    const currentPalette = mode === 'light' ? lightPalette : darkPalette;

    const customShadows = mode === 'light'
        ? '0px 10px 30px rgba(37, 99, 235, 0.06)'
        : '0px 10px 40px rgba(0, 0, 0, 0.4)';

    const themeConfig: ThemeOptions = {
        palette: {
            mode,
            ...currentPalette,
        },
        typography: {
            fontFamily: '"Inter", system-ui, sans-serif',
            h1: { fontSize: '3.5rem', fontWeight: 700, letterSpacing: '-0.02em' },
            h2: { fontSize: '1.75rem', fontWeight: 600, letterSpacing: '-0.01em' },
            h3: { fontSize: '1rem', fontWeight: 600 },
            body1: { fontSize: '0.875rem', fontWeight: 400 },
            caption: { fontSize: '0.75rem', fontWeight: 500, textTransform: 'uppercase', letterSpacing: '0.05em' },
        },
        shape: {
            borderRadius: 12,
        },
        components: {
            // THE "NO-LINE" RULE & GLASSMORPHISM
            MuiPaper: {
                styleOverrides: {
                    root: {
                        backgroundImage: 'none',
                        boxShadow: customShadows,
                        borderRadius: 16,
                        border: `1px solid ${currentPalette.divider}`,
                        backgroundColor: mode === 'light'
                            ? alpha('#FFFFFF', 0.8)
                            : alpha('#171F33', 0.6),
                        backdropFilter: 'blur(12px)',
                    },
                },
            },
            MuiButton: {
                styleOverrides: {
                    root: {
                        borderRadius: 8,
                        textTransform: 'none',
                        fontWeight: 700,
                        padding: '12px 32px',
                        transition: 'all 0.2s ease-in-out',
                    },
                    containedPrimary: {
                        background: `linear-gradient(to right, #2563EB, #0D9488)`,
                        boxShadow: '0 10px 20px rgba(37,99,235,0.3)',
                        color: '#FFFFFF',
                        '&:hover': {
                            filter: 'brightness(0.9)',
                            boxShadow: '0 12px 24px rgba(37,99,235,0.4)',
                        },
                    },
                    outlined: {
                        borderWidth: '2px',
                        '&:hover': {
                            borderWidth: '2px',
                            backgroundColor: alpha(currentPalette.primary.main, 0.05),
                        },
                    },
                },
            },
            MuiTextField: {
                styleOverrides: {
                    root: {
                        '& .MuiOutlinedInput-root': {
                            backgroundColor: mode === 'light' ? '#F1F5F9' : '#131b2e',
                            borderRadius: 8,
                            '& fieldset': {
                                border: 'none',
                            },
                            '&.Mui-focused fieldset': {
                                borderBottom: '2px solid transparent', // Fallback for border
                            },
                            '&.Mui-focused': {
                                // Action gradient charging effect ở viền dưới
                                backgroundImage: `linear-gradient(to right, #2563EB, #0D9488)`,
                                backgroundSize: '100% 2px',
                                backgroundPosition: 'bottom',
                                backgroundRepeat: 'no-repeat',
                            }
                        },
                    },
                },
            },
        },
    };

    return createTheme(themeConfig);
};

export const theme = getAppTheme('light');