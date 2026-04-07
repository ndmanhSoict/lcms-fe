import { createFileRoute } from '@tanstack/react-router';
import { Button, Typography, Box } from '@mui/material';
import { useUiStore } from '@/store/uiStore';

export const Route = createFileRoute('/')({
    component: HomePage,
});

function HomePage() {
    const { themeMode, toggleTheme } = useUiStore();

    return (
        <Box sx={{ p: 4, display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 3 }}>
            <Typography variant="h1" color="primary">
                Illuminated Academy
            </Typography>
            <Typography variant="body1" color="text.secondary">
                Hệ thống LCMS đang chạy ({themeMode} mode)
            </Typography>
            <Button variant="contained" color="primary" onClick={toggleTheme}>
                Đổi Theme (Sáng/Tối)
            </Button>
        </Box>
    );
}