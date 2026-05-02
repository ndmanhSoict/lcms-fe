import { apiClient } from "@/api/axios";
import type { LoginPayload, LoginResponse } from '../types/auth.types';

export const authApi = {
    login: async (payload: LoginPayload): Promise<LoginResponse> => {
        const response = await apiClient.post<LoginResponse>('/auth/login', payload);
        return response.data;
    },
};
