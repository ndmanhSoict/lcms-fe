import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import {
    Box, Typography, TextField, Button, Checkbox, FormControlLabel,
    IconButton, InputAdornment, Alert,
} from '@mui/material';
import { MailOutline, LockOutlined, Visibility, VisibilityOff, ArrowForward } from '@mui/icons-material';
import * as S from './login-form.style';
import { GradientText } from '@/components/BrandPanel/brand-panel.style';
import { loginSchema, type LoginFormValues } from '../../schemas/auth.schemas';
import { useLogin } from '../../hooks/useLogin';
import { getApiError } from '@/lib/apiError';

export const LoginForm = () => {
    const [showPassword, setShowPassword] = useState(false);
    const { register, handleSubmit, formState: { errors } } = useForm<LoginFormValues>({
        resolver: zodResolver(loginSchema),
        defaultValues: { rememberMe: false },
    });

    const loginMutation = useLogin();

    const onSubmit = (data: LoginFormValues) => {
        loginMutation.mutate({ email: data.email, password: data.password });
    };

    return (
        <S.StyledPaper>
            <Box sx={{ mb: 4, textAlign: { xs: 'center', lg: 'left' } }}>
                <GradientText variant="h4" fontWeight="bold" gutterBottom>
                    Chào mừng trở lại
                </GradientText>
                <Typography color="text.secondary">
                    Đăng nhập vào tài khoản EduCore của bạn
                </Typography>
            </Box>

            {loginMutation.isError && (
                <Alert severity="error" sx={{ mb: 3 }}>
                    {getApiError(loginMutation.error)}
                </Alert>
            )}

            <form onSubmit={handleSubmit(onSubmit)}>
                <Box sx={{ display: 'flex', flexDirection: 'column', gap: 3 }}>
                    <TextField
                        fullWidth
                        placeholder="vd: nguyenvan@example.com"
                        {...register('email')}
                        error={!!errors.email}
                        helperText={errors.email?.message}
                        slotProps={{
                            input: {
                                startAdornment: (
                                    <InputAdornment position="start">
                                        <MailOutline color="action" />
                                    </InputAdornment>
                                ),
                            },
                        }}
                    />

                    <TextField
                        fullWidth
                        type={showPassword ? 'text' : 'password'}
                        placeholder="••••••••"
                        {...register('password')}
                        error={!!errors.password}
                        helperText={errors.password?.message}
                        slotProps={{
                            input: {
                                startAdornment: (
                                    <InputAdornment position="start">
                                        <LockOutlined color="action" />
                                    </InputAdornment>
                                ),
                                endAdornment: (
                                    <InputAdornment position="end">
                                        <IconButton onClick={() => setShowPassword(!showPassword)} edge="end">
                                            {showPassword ? <VisibilityOff /> : <Visibility />}
                                        </IconButton>
                                    </InputAdornment>
                                ),
                            },
                        }}
                    />

                    <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                        <FormControlLabel
                            control={<Checkbox {...register('rememberMe')} color="primary" />}
                            label={<Typography variant="body2" color="text.secondary">Ghi nhớ đăng nhập</Typography>}
                        />
                        <Typography
                            variant="body2"
                            component="a"
                            href="#"
                            sx={{ fontWeight: 600, color: 'primary.main', textDecoration: 'none', '&:hover': { opacity: 0.8 } }}
                        >
                            Quên mật khẩu?
                        </Typography>
                    </Box>

                    <Button
                        type="submit"
                        variant="contained"
                        fullWidth
                        size="large"
                        disabled={loginMutation.isPending}
                        endIcon={<ArrowForward />}
                    >
                        {loginMutation.isPending ? 'Đang đăng nhập...' : 'Đăng nhập'}
                    </Button>
                </Box>
            </form>

            <S.StyledDivider>hoặc tiếp tục với</S.StyledDivider>

            <Box sx={{ display: 'flex', gap: 2 }}>
                <S.SocialButton sx={{ flex: 1 }}>
                    <Typography variant="subtitle2" fontWeight={600}>Google</Typography>
                </S.SocialButton>
                <S.SocialButton sx={{ flex: 1 }}>
                    <Typography variant="subtitle2" fontWeight={600}>Microsoft</Typography>
                </S.SocialButton>
            </Box>
        </S.StyledPaper>
    );
};
