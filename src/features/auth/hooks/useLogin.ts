import { useMutation } from '@tanstack/react-query';
import { useNavigate } from '@tanstack/react-router';
import { authApi } from '../api/auth.api';
import { useAuthStore } from '@/store/authStore';
import type { LoginPayload } from '../types/auth.types';

export function useLogin() {
    const navigate = useNavigate();

    return useMutation({
        mutationFn: (payload: LoginPayload) => authApi.login(payload),
        onSuccess: (data) => {
            const { accessToken, refreshToken, user } = data.data;
            useAuthStore.getState().setAuth(accessToken, refreshToken, user);

            const role = user.role?.toUpperCase() ?? '';
            if (role === 'SYSTEM_OWNER') {
                navigate({ to: '/dashboard' });
            } else if (role === 'BRANCH_OWNER' || role === 'STAFF') {
                navigate({ to: '/students' });
            }
        },
    });
}
