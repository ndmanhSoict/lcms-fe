import axios, { AxiosRequestConfig } from 'axios';
import { useAuthStore } from '@/store/authStore';
import { queryClient } from '@/lib/queryClient';
import { disconnectSocket } from '@/socket';

const BASE_URL = import.meta.env.VITE_API_URL || 'http://localhost:5000/api';

export const apiClient = axios.create({
    baseURL: BASE_URL,
    headers: { 'Content-Type': 'application/json' },
});

// Separate plain axios instance used ONLY for refresh calls — bypasses apiClient interceptors
const refreshClient = axios.create({
    baseURL: BASE_URL,
    headers: { 'Content-Type': 'application/json' },
});

// ─── Refresh queue ─────────────────────────────────────────────────────────────
// Collects requests that arrive while a refresh is already in-flight so they
// can all be retried once the new token is ready (or rejected if refresh fails).

type QueueEntry = { resolve: (token: string) => void; reject: (err: unknown) => void };

let isRefreshing = false;
let pendingQueue: QueueEntry[] = [];

function drainQueue(error: unknown, token: string | null) {
    pendingQueue.forEach(entry => {
        if (error) entry.reject(error);
        else entry.resolve(token!);
    });
    pendingQueue = [];
}

function forceLogout() {
    useAuthStore.getState().logout();
    queryClient.clear();
    disconnectSocket();
    if (window.location.pathname !== '/login') {
        window.location.href = '/login';
    }
}

// ─── Request interceptor ───────────────────────────────────────────────────────

apiClient.interceptors.request.use(
    (config) => {
        const token = useAuthStore.getState().accessToken;
        if (token && config.headers) {
            config.headers.Authorization = `Bearer ${token}`;
        }
        return config;
    },
    (error) => Promise.reject(error),
);

// ─── Response interceptor ──────────────────────────────────────────────────────

apiClient.interceptors.response.use(
    (response) => response,
    async (error) => {
        const originalRequest = error.config as AxiosRequestConfig & { _retry?: boolean };
        const status = error.response?.status;

        // 401 = refresh token hết hạn hoặc không hợp lệ → logout ngay
        if (status === 401) {
            forceLogout();
            return Promise.reject(error);
        }

        // 403 = access token hết hạn → thử refresh
        if (status === 403 && !originalRequest._retry) {
            if (isRefreshing) {
                // Đang refresh rồi → xếp vào hàng đợi
                return new Promise<string>((resolve, reject) => {
                    pendingQueue.push({ resolve, reject });
                }).then((newToken) => {
                    if (originalRequest.headers) {
                        originalRequest.headers['Authorization'] = `Bearer ${newToken}`;
                    }
                    return apiClient(originalRequest);
                }).catch((err) => Promise.reject(err));
            }

            originalRequest._retry = true;
            isRefreshing = true;

            const storedRefreshToken = useAuthStore.getState().refreshToken;

            if (!storedRefreshToken) {
                isRefreshing = false;
                forceLogout();
                return Promise.reject(error);
            }

            try {
                const { data } = await refreshClient.post<{
                    data: { accessToken: string; refreshToken: string };
                }>('/auth/refresh', { refreshToken: storedRefreshToken });

                const { accessToken, refreshToken } = data.data;
                useAuthStore.getState().setTokens(accessToken, refreshToken);

                apiClient.defaults.headers.common['Authorization'] = `Bearer ${accessToken}`;
                if (originalRequest.headers) {
                    originalRequest.headers['Authorization'] = `Bearer ${accessToken}`;
                }

                drainQueue(null, accessToken);
                return apiClient(originalRequest);
            } catch (refreshError) {
                drainQueue(refreshError, null);
                forceLogout();
                return Promise.reject(refreshError);
            } finally {
                isRefreshing = false;
            }
        }

        return Promise.reject(error);
    },
);
