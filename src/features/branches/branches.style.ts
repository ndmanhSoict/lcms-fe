import { styled, Box, Paper, ButtonBase, Avatar, alpha } from '@mui/material';

const ROW_GRID = 'minmax(220px, 2fr) minmax(190px, 1.5fr) minmax(160px, 1.5fr) minmax(110px, 0.8fr) 100px';

export const PageContainer = styled(Box)(({ theme }) => ({
    display: 'flex',
    flexDirection: 'column',
    gap: theme.spacing(4),
}));

export const PageHeader = styled(Box)(({ theme }) => ({
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
    gap: theme.spacing(2),
    flexWrap: 'wrap',
}));

// --- METRIC CARDS ---
export const MetricsGrid = styled(Box)(({ theme }) => ({
    display: 'grid',
    gridTemplateColumns: 'repeat(1, 1fr)',
    gap: theme.spacing(3),
    [theme.breakpoints.up('md')]: {
        gridTemplateColumns: 'repeat(3, 1fr)',
    },
}));

export const MetricCard = styled(Paper)(({ theme }) => ({
    padding: theme.spacing(3),
    display: 'flex',
    alignItems: 'center',
    gap: theme.spacing(2.5),
}));

export const MetricIconBox = styled(Box)<{ colorScheme: 'primary' | 'success' | 'error' }>(({ theme, colorScheme }) => ({
    width: 56,
    height: 56,
    borderRadius: (theme.shape.borderRadius as number) * 1.5,
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: alpha(theme.palette[colorScheme].main, 0.10),
    color: theme.palette[colorScheme].main,
    '& svg': { fontSize: 28 },
}));

// --- TOOLBAR ---
export const ToolbarContainer = styled(Box)(({ theme }) => ({
    display: 'flex',
    flexDirection: 'column',
    gap: theme.spacing(2),
    [theme.breakpoints.up('lg')]: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'stretch',
    },
}));

export const FilterTabsContainer = styled(Box)(({ theme }) => ({
    padding: theme.spacing(1, 3),
    display: 'flex',
    backgroundColor: theme.palette.background.paper,
    borderRadius: (theme.shape.borderRadius as number) * 1.5,
    boxShadow: theme.shadows[1],
    border: `1px solid ${theme.palette.divider}`,
    flexWrap: 'wrap',
    gap: theme.spacing(0.5),
}));

export const FilterTab = styled(ButtonBase)<{ active?: boolean }>(({ theme, active }) => ({
    padding: theme.spacing(1, 2.5),
    borderRadius: theme.shape.borderRadius as number,
    fontSize: '0.875rem',
    fontWeight: active ? 600 : 500,
    color: active ? theme.palette.primary.main : theme.palette.text.secondary,
    backgroundColor: active ? alpha(theme.palette.primary.main, 0.08) : 'transparent',
    transition: 'all 0.2s ease-in-out',
    whiteSpace: 'nowrap',
    '&:hover': {
        backgroundColor: active
            ? alpha(theme.palette.primary.main, 0.12)
            : theme.palette.action.hover,
    },
}));

export const SearchAndActionBox = styled(Box)(({ theme }) => ({
    display: 'flex',
    gap: theme.spacing(2),
    width: '100%',
    [theme.breakpoints.up('lg')]: {
        width: 'auto',
    },
}));

// --- TABLE ---
export const ListHeader = styled(Box)(({ theme }) => ({
    display: 'none',
    gridTemplateColumns: ROW_GRID,
    gap: theme.spacing(2),
    padding: theme.spacing(0, 3, 2, 3),
    color: theme.palette.text.secondary,
    fontWeight: 700,
    fontSize: '0.70rem',
    letterSpacing: '1px',
    textTransform: 'uppercase',
    [theme.breakpoints.up('md')]: {
        display: 'grid',
    },
}));

export const BranchRow = styled(Paper)(({ theme }) => ({
    display: 'grid',
    gridTemplateColumns: '1fr',
    gap: theme.spacing(2),
    padding: theme.spacing(2, 3),
    marginBottom: theme.spacing(1.5),
    alignItems: 'center',
    transition: 'transform 0.2s ease-in-out, box-shadow 0.2s ease-in-out',
    '&:hover': {
        transform: 'translateY(-2px)',
        boxShadow: theme.shadows[2],
    },
    [theme.breakpoints.up('md')]: {
        gridTemplateColumns: ROW_GRID,
    },
}));

export const BranchAvatar = styled(Avatar)(({ theme }) => ({
    background: `linear-gradient(135deg, ${theme.palette.primary.main} 0%, ${theme.palette.secondary.main} 100%)`,
    color: '#FFFFFF',
    fontWeight: 700,
    width: 44,
    height: 44,
    borderRadius: (theme.shape.borderRadius as number) * 1.25,
    fontSize: '0.875rem',
    flexShrink: 0,
}));

export const StatusPill = styled(Box)<{ active: boolean }>(({ theme, active }) => {
    const colorMain = active ? theme.palette.success.main : theme.palette.error.main;
    return {
        display: 'inline-flex',
        alignItems: 'center',
        gap: theme.spacing(0.75),
        padding: theme.spacing(0.5, 1.5),
        borderRadius: (theme.shape.borderRadius as number) * 3,
        backgroundColor: alpha(colorMain, 0.10),
        color: colorMain,
        fontSize: '0.75rem',
        fontWeight: 600,
        width: 'fit-content',
        whiteSpace: 'nowrap',
        '&::before': {
            content: '""',
            display: 'block',
            width: 6,
            height: 6,
            borderRadius: '50%',
            backgroundColor: colorMain,
            flexShrink: 0,
        },
    };
});

export const EmptyState = styled(Box)(({ theme }) => ({
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
    padding: theme.spacing(10, 4),
    color: theme.palette.text.secondary,
    gap: theme.spacing(2),
    textAlign: 'center',
}));
