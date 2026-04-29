// src/features/auth/components/LoginForm/LoginForm.tsx
import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import * as z from 'zod';
import { Box, Typography, TextField, Button, Checkbox, FormControlLabel, IconButton, InputAdornment, Alert } from '@mui/material';
import { MailOutline, LockOutlined, Visibility, VisibilityOff, ArrowForward } from '@mui/icons-material';
import { useMutation } from '@tanstack/react-query';
import { useNavigate } from '@tanstack/react-router';

import * as S from './login-form.style';
import { GradientText } from '@/components/BrandPanel/brand-panel.style';
import { useAuthStore } from '@/store/authStore';
import { authApi, LoginPayload } from '../../api/auth.api';

// Xác thực form sử dụng email
const loginSchema = z.object({
    email: z.string().email('Email không hợp lệ'),
    password: z.string().min(6, 'Mật khẩu phải có ít nhất 6 ký tự'),
    rememberMe: z.boolean().optional(),
});

type LoginFormInputs = z.infer<typeof loginSchema>;

export const LoginForm = () => {
    const [showPassword, setShowPassword] = useState(false);
    const navigate = useNavigate();
    // const setToken = useAuthStore((state) => state.setToken);

    const { register, handleSubmit, formState: { errors } } = useForm<LoginFormInputs>({
        resolver: zodResolver(loginSchema),
        defaultValues: { rememberMe: false }
    });

    const loginMutation = useMutation({
        mutationFn: (payload: LoginPayload) => authApi.login(payload),
        onSuccess: (data) => {
            // Sử dụng hàm setAuth mới để lưu cả token và user
            const { accessToken, user } = data.data;
            useAuthStore.getState().setAuth(accessToken, user);

            // Chuyển role về chữ thường để so sánh an toàn
            const role = user.role?.toLowerCase() || '';
            console.log('Logged in user role:', role);

            // Chuyển hướng role hệ thống đặc biệt về trang quản trị
            if (role === 'system_owner') {
                navigate({ to: '/dashboard' });
            } 
        },
    });

    const onSubmit = (data: LoginFormInputs) => {
        loginMutation.mutate({
            email: data.email,
            password: data.password,
        });
    };

    return (
        <S.StyledPaper>
            <Box sx={{ mb: 4, textAlign: { xs: 'center', lg: 'left' } }}>
                <GradientText variant="h4" fontWeight="bold" gutterBottom>
                    Welcome back
                </GradientText>
                <Typography color="text.secondary">
                    Sign in to your EduCore account
                </Typography>
            </Box>

            {loginMutation.isError && (
                <Alert severity="error" sx={{ mb: 3 }}>
                    {(loginMutation.error as any)?.response?.data?.message || 'Đăng nhập thất bại. Vui lòng kiểm tra lại thông tin!'}
                </Alert>
            )}

            <form onSubmit={handleSubmit(onSubmit)}>
                <Box sx={{ display: 'flex', flexDirection: 'column', gap: 3 }}>
                    <TextField
                        fullWidth
                        placeholder="alex@example.com"
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
                            }
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
                            }
                        }}
                    />

                    <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                        <FormControlLabel
                            control={<Checkbox {...register('rememberMe')} color="primary" />}
                            label={<Typography variant="body2" color="text.secondary">Remember me</Typography>}
                        />
                        <Typography variant="body2" component="a" href="#" sx={{ fontWeight: 600, color: 'primary.main', textDecoration: 'none', '&:hover': { opacity: 0.8 } }}>
                            Forgot password?
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
                        {loginMutation.isPending ? 'Signing in...' : 'Sign In'}
                    </Button>
                </Box>
            </form>

            <S.StyledDivider>or continue with</S.StyledDivider>

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