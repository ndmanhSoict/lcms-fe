import { create } from 'zustand';
import { persist } from 'zustand/middleware';

interface User {
    id: string;
    email: string;
    role: string;
    fullName: string;
    branchId: string | null;
}

interface AuthState {
    accessToken: string | null;
    refreshToken: string | null;
    user: User | null;
    setAuth: (accessToken: string, refreshToken: string, user: User) => void;
    setTokens: (accessToken: string, refreshToken: string) => void;
    logout: () => void;
}

export const useAuthStore = create<AuthState>()(
    persist(
        (set) => ({
            accessToken: null,
            refreshToken: null,
            user: null,
            setAuth: (accessToken, refreshToken, user) =>
                set({ accessToken, refreshToken, user }),
            setTokens: (accessToken, refreshToken) =>
                set({ accessToken, refreshToken }),
            logout: () => set({ accessToken: null, refreshToken: null, user: null }),
        }),
        {
            name: 'lcms-auth-storage',
        }
    )
);
