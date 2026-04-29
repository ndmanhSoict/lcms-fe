import { styled, Box, Paper, ButtonBase, Avatar, alpha } from '@mui/material';

// Tỉ lệ các cột trong bảng danh sách (Grid)
const ROW_GRID = 'minmax(250px, 2fr) minmax(150px, 1.5fr) minmax(120px, 1fr) minmax(120px, 1fr) 80px';

export const DashboardContainer = styled(Box)(({ theme }) => ({
    display: 'flex',
    flexDirection: 'column',
    gap: theme.spacing(4),
}));

// --- METRIC CARDS ---
export const MetricsGrid = styled(Box)(({ theme }) => ({
    display: 'grid',
    gridTemplateColumns: 'repeat(1, 1fr)',
    gap: theme.spacing(3),
    [theme.breakpoints.up('md')]: {
        gridTemplateColumns: 'repeat(4, 1fr)',
    },
}));

export const MetricCard = styled(Paper)(({ theme }) => ({
    padding: theme.spacing(3),
    display: 'flex',
    alignItems: 'center',
    gap: theme.spacing(2.5),
    // Background và shadow đã được kế thừa từ override MuiPaper trong theme.ts
}));

export const MetricIconBox = styled(Box)<{ colorScheme: 'primary' | 'success' | 'warning' | 'neutral' }>(({ theme, colorScheme }) => {
    // Map colorScheme với các palette tương ứng
    const paletteColor = colorScheme === 'neutral' ? theme.palette.text.secondary : theme.palette[colorScheme].main;
    const bgColor = colorScheme === 'neutral' ? alpha(theme.palette.text.secondary, 0.1) : alpha(theme.palette[colorScheme].main, 0.1);

    return {
        width: 56,
        height: 56,
        borderRadius: (theme.shape.borderRadius as number) * 1.5,
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: bgColor,
        color: paletteColor,
        '& svg': { fontSize: 28 }
    };
});

// --- FILTER & TOOLBAR ---
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
    padding: theme.spacing(1,3),
    display: 'flex',
    backgroundColor: theme.palette.background.paper,
    borderRadius: (theme.shape.borderRadius as number) * 1.5,
    boxShadow: theme.shadows[1],
    border: `1px solid ${theme.palette.divider}`,
}));

export const FilterTab = styled(ButtonBase)<{ active?: boolean }>(({ theme, active }) => ({
    padding: theme.spacing(1, 3),
    borderRadius: (theme.shape.borderRadius as number),
    fontSize: '0.875rem',
    fontWeight: active ? 600 : 500,
    color: active ? theme.palette.primary.main : theme.palette.text.secondary,
    backgroundColor: active ? alpha(theme.palette.primary.main, 0.08) : 'transparent',
    transition: 'all 0.2s',
    '&:hover': {
        backgroundColor: active ? alpha(theme.palette.primary.main, 0.1) : theme.palette.action.hover,
    }
}));

export const SearchAndActionBox = styled(Box)(({ theme }) => ({
    display: 'flex',
    gap: theme.spacing(2),
    width: '100%',
    [theme.breakpoints.up('lg')]: {
        width: 'auto',
    },
}));

// --- LIST ROW ---
export const ListHeader = styled(Box)(({ theme }) => ({
    display: 'none',
    gridTemplateColumns: ROW_GRID,
    gap: theme.spacing(2),
    padding: theme.spacing(0, 3, 2, 3),
    color: theme.palette.text.secondary,
    fontWeight: 700,
    fontSize: '0.75rem',
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
    transition: 'transform 0.2s, box-shadow 0.2s',
    '&:hover': {
        transform: 'translateY(-2px)',
        boxShadow: theme.shadows[2], // Lấy shadow nổi hơn từ theme
    },
    [theme.breakpoints.up('md')]: {
        gridTemplateColumns: ROW_GRID,
    },
}));

export const BranchAvatar = styled(Avatar)<{ colorScheme: 'primary' | 'secondary' | 'tertiary' | 'warning' | 'success' }>(({ theme, colorScheme }) => ({
    backgroundColor: alpha(theme.palette[colorScheme].main, 0.1),
    color: theme.palette[colorScheme].main,
    fontWeight: 700,
    width: 48,
    height: 48,
    borderRadius: (theme.shape.borderRadius as number) * 1.5,
}));

export const StatusPill = styled(Box)<{ status: 'active' | 'pending' | 'inactive' }>(({ theme, status }) => {
    let colorMain;
    if (status === 'active') colorMain = theme.palette.success.main;
    else if (status === 'pending') colorMain = theme.palette.warning.main;
    else colorMain = theme.palette.text.secondary;

    return {
        display: 'inline-flex',
        alignItems: 'center',
        gap: theme.spacing(1),
        padding: theme.spacing(0.5, 1.5),
        borderRadius: (theme.shape.borderRadius as number) * 3,
        backgroundColor: alpha(colorMain, 0.1),
        color: colorMain,
        fontSize: '0.75rem',
        fontWeight: 600,
        textTransform: 'capitalize',
        width: 'fit-content',
        '&::before': {
            content: '""',
            display: 'block',
            width: 6,
            height: 6,
            borderRadius: '50%',
            backgroundColor: colorMain,
        }
    };
});