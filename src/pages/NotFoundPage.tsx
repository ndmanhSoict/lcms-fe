import { Box, Button, Typography, alpha } from '@mui/material';
import { HomeOutlined, ArrowBack } from '@mui/icons-material';
import { useNavigate, useRouter } from '@tanstack/react-router';
import { useAuthStore } from '@/store/authStore';

export const NotFoundPage = () => {
    const navigate = useNavigate();
    const router = useRouter();
    const user = useAuthStore(state => state.user);

    const handleGoHome = () => {
        const role = user?.role?.toUpperCase() ?? '';
        if (role === 'SYSTEM_OWNER') navigate({ to: '/dashboard' });
        else if (role === 'BRANCH_OWNER' || role === 'STAFF') navigate({ to: '/students' });
        else navigate({ to: '/login' });
    };

    return (
        <Box
            sx={{
                minHeight: '100vh',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                background: theme => `radial-gradient(at 30% 20%, ${alpha(theme.palette.primary.main, 0.08)} 0px, transparent 60%),
                                      radial-gradient(at 80% 80%, ${alpha(theme.palette.secondary.main, 0.08)} 0px, transparent 60%)`,
                px: 3,
            }}
        >
            <Box sx={{ textAlign: 'center', maxWidth: 480 }}>
                {/* Big number */}
                <Typography
                    sx={{
                        fontSize: { xs: '7rem', md: '10rem' },
                        fontWeight: 900,
                        lineHeight: 1,
                        background: theme =>
                            `linear-gradient(135deg, ${theme.palette.primary.main} 0%, ${theme.palette.secondary.main} 100%)`,
                        WebkitBackgroundClip: 'text',
                        WebkitTextFillColor: 'transparent',
                        backgroundClip: 'text',
                        mb: 2,
                        userSelect: 'none',
                    }}
                >
                    404
                </Typography>

                <Typography variant="h4" fontWeight={700} color="text.primary" gutterBottom>
                    Trang không tìm thấy
                </Typography>
                <Typography variant="body1" color="text.secondary" sx={{ mb: 5, lineHeight: 1.8 }}>
                    Trang bạn đang tìm kiếm không tồn tại hoặc đã bị xóa.
                    <br />
                    Hãy kiểm tra lại đường dẫn hoặc quay về trang chủ.
                </Typography>

                <Box sx={{ display: 'flex', gap: 2, justifyContent: 'center', flexWrap: 'wrap' }}>
                    <Button
                        variant="outlined"
                        startIcon={<ArrowBack />}
                        onClick={() => router.history.back()}
                        size="large"
                    >
                        Quay lại
                    </Button>
                    <Button
                        variant="contained"
                        startIcon={<HomeOutlined />}
                        onClick={handleGoHome}
                        size="large"
                    >
                        Về trang chủ
                    </Button>
                </Box>
            </Box>
        </Box>
    );
};
