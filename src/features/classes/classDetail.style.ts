import { styled, Box, Paper, Avatar, alpha, Chip } from '@mui/material';

export const PageContainer = styled(Box)(({ theme }) => ({
    display: 'flex',
    flexDirection: 'column',
    gap: theme.spacing(3),
}));

export const BackButton = styled(Box)(({ theme }) => ({
    display: 'inline-flex',
    alignItems: 'center',
    gap: theme.spacing(0.75),
    cursor: 'pointer',
    color: theme.palette.text.secondary,
    fontSize: '0.875rem',
    fontWeight: 500,
    transition: 'color 0.2s',
    width: 'fit-content',
    '&:hover': { color: theme.palette.primary.main },
}));

export const HeaderCard = styled(Paper)(({ theme }) => ({
    padding: theme.spacing(3),
    display: 'flex',
    alignItems: 'flex-start',
    justifyContent: 'space-between',
    gap: theme.spacing(2),
    flexWrap: 'wrap',
}));

export const HeaderLeft = styled(Box)(({ theme }) => ({
    display: 'flex',
    alignItems: 'flex-start',
    gap: theme.spacing(2.5),
    flex: 1,
    minWidth: 0,
}));

export const ClassAvatar = styled(Avatar)(({ theme }) => ({
    background: `linear-gradient(135deg, ${theme.palette.tertiary?.main ?? theme.palette.secondary.main} 0%, ${theme.palette.primary.main} 100%)`,
    color: '#FFFFFF',
    fontWeight: 700,
    width: 64,
    height: 64,
    borderRadius: (theme.shape.borderRadius as number) * 1.5,
    fontSize: '1.25rem',
    flexShrink: 0,
}));

export const HeaderInfo = styled(Box)({ flex: 1, minWidth: 0 });

export const HeaderMeta = styled(Box)(({ theme }) => ({
    display: 'flex',
    flexWrap: 'wrap',
    gap: theme.spacing(2),
    marginTop: theme.spacing(1.5),
}));

export const MetaItem = styled(Box)(({ theme }) => ({
    display: 'flex',
    alignItems: 'center',
    gap: theme.spacing(0.5),
    color: theme.palette.text.secondary,
    fontSize: '0.875rem',
    '& svg': { fontSize: 16 },
}));

export const StatusChip = styled(Chip)<{ classstatus: 'active' | 'closed' }>(
    ({ theme, classstatus }) => {
        const isActive = classstatus === 'active';
        const colorMain = isActive ? theme.palette.success.main : theme.palette.text.secondary;
        return {
            height: 24,
            fontSize: '0.75rem',
            fontWeight: 600,
            backgroundColor: alpha(colorMain, 0.10),
            color: colorMain,
            border: 'none',
        };
    },
);

export const HeaderActions = styled(Box)(({ theme }) => ({
    display: 'flex',
    gap: theme.spacing(1),
    flexShrink: 0,
    alignItems: 'flex-start',
}));

export const TabsWrapper = styled(Box)(({ theme }) => ({
    borderBottom: `1px solid ${theme.palette.divider}`,
    backgroundColor: theme.palette.background.paper,
    borderRadius: (theme.shape.borderRadius as number) * 1.5,
    padding: theme.spacing(0, 2),
    boxShadow: theme.shadows[1],
}));

export const SectionHeader = styled(Box)(({ theme }) => ({
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    gap: theme.spacing(2),
    flexWrap: 'wrap',
    padding: theme.spacing(2, 0, 0.5, 0),
}));

// ─── Session table ─────────────────────────────────────────────────────────────

const SESSION_GRID = '140px 150px minmax(180px, 2fr) 130px 130px';

export const SessionListHeader = styled(Box)(({ theme }) => ({
    display: 'none',
    gridTemplateColumns: SESSION_GRID,
    gap: theme.spacing(2),
    padding: theme.spacing(0, 3, 1.5, 3),
    color: theme.palette.text.secondary,
    fontWeight: 700,
    fontSize: '0.70rem',
    letterSpacing: '1px',
    textTransform: 'uppercase',
    [theme.breakpoints.up('md')]: { display: 'grid' },
}));

export const SessionRow = styled(Paper)(({ theme }) => ({
    display: 'grid',
    gridTemplateColumns: '1fr',
    gap: theme.spacing(1.5),
    padding: theme.spacing(2, 3),
    marginBottom: theme.spacing(1.5),
    alignItems: 'center',
    transition: 'box-shadow 0.2s',
    '&:hover': { boxShadow: theme.shadows[2] },
    [theme.breakpoints.up('md')]: { gridTemplateColumns: SESSION_GRID },
}));

export const SessionStatusChip = styled(Box)<{
    sessionstatus: 'scheduled' | 'ongoing' | 'completed' | 'cancelled';
}>(({ theme, sessionstatus }) => {
    const colorMap = {
        scheduled: theme.palette.info.main,
        ongoing: theme.palette.warning.main,
        completed: theme.palette.success.main,
        cancelled: theme.palette.error.main,
    };
    const c = colorMap[sessionstatus];
    return {
        display: 'inline-flex',
        alignItems: 'center',
        padding: theme.spacing(0.4, 1.25),
        borderRadius: 999,
        backgroundColor: alpha(c, 0.10),
        color: c,
        fontSize: '0.75rem',
        fontWeight: 600,
        whiteSpace: 'nowrap',
        width: 'fit-content',
    };
});

export const AttendanceChip = styled(Box)<{ done: boolean }>(({ theme, done }) => {
    const c = done ? theme.palette.success.main : theme.palette.warning.main;
    return {
        display: 'inline-flex',
        alignItems: 'center',
        padding: theme.spacing(0.4, 1.25),
        borderRadius: 999,
        backgroundColor: alpha(c, 0.10),
        color: c,
        fontSize: '0.75rem',
        fontWeight: 600,
        whiteSpace: 'nowrap',
        width: 'fit-content',
    };
});

// ─── Student table ─────────────────────────────────────────────────────────────

const STUDENT_GRID = 'minmax(200px, 2fr) 110px minmax(130px, 1fr) 120px 80px';

export const StudentListHeader = styled(Box)(({ theme }) => ({
    display: 'none',
    gridTemplateColumns: STUDENT_GRID,
    gap: theme.spacing(2),
    padding: theme.spacing(0, 3, 1.5, 3),
    color: theme.palette.text.secondary,
    fontWeight: 700,
    fontSize: '0.70rem',
    letterSpacing: '1px',
    textTransform: 'uppercase',
    [theme.breakpoints.up('md')]: { display: 'grid' },
}));

export const StudentRow = styled(Paper)(({ theme }) => ({
    display: 'grid',
    gridTemplateColumns: '1fr',
    gap: theme.spacing(1.5),
    padding: theme.spacing(2, 3),
    marginBottom: theme.spacing(1.5),
    alignItems: 'center',
    transition: 'box-shadow 0.2s',
    '&:hover': { boxShadow: theme.shadows[2] },
    [theme.breakpoints.up('md')]: { gridTemplateColumns: STUDENT_GRID },
}));

export const StudentAvatar = styled(Avatar)(({ theme }) => ({
    background: `linear-gradient(135deg, ${theme.palette.success.main} 0%, ${theme.palette.primary.main} 100%)`,
    color: '#FFFFFF',
    fontWeight: 700,
    width: 36,
    height: 36,
    borderRadius: (theme.shape.borderRadius as number),
    fontSize: '0.8rem',
    flexShrink: 0,
}));

// ─── Info tab ──────────────────────────────────────────────────────────────────

export const InfoGrid = styled(Box)(({ theme }) => ({
    display: 'grid',
    gridTemplateColumns: '1fr',
    gap: theme.spacing(2),
    [theme.breakpoints.up('sm')]: { gridTemplateColumns: 'repeat(2, 1fr)' },
    [theme.breakpoints.up('lg')]: { gridTemplateColumns: 'repeat(3, 1fr)' },
}));

export const InfoCell = styled(Paper)(({ theme }) => ({
    padding: theme.spacing(2.5),
    display: 'flex',
    flexDirection: 'column',
    gap: theme.spacing(0.5),
}));

// ─── Shared ────────────────────────────────────────────────────────────────────

export const EmptyState = styled(Box)(({ theme }) => ({
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
    padding: theme.spacing(8, 4),
    color: theme.palette.text.secondary,
    gap: theme.spacing(2),
    textAlign: 'center',
}));
