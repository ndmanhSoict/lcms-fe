import { apiClient } from '@/api/axios';
import type {
    UserListResponse,
    UserResponse,
    UserListParams,
    CreateStaffPayload,
    UpdateUserPayload,
} from '../types/user.types';

export const userApi = {
    getAll: (params?: UserListParams) =>
        apiClient.get<UserListResponse>('/user/all', { params }).then(r => r.data),

    getById: (id: string) =>
        apiClient.get<UserResponse>(`/user/${id}`).then(r => r.data),

    create: (payload: CreateStaffPayload) =>
        apiClient.post<UserResponse>('/user/create-user', payload).then(r => r.data),

    update: (id: string, payload: UpdateUserPayload) =>
        apiClient.patch<UserResponse>(`/user/${id}`, payload).then(r => r.data),

    deactivate: (id: string) =>
        apiClient.patch<{ success: boolean; message: string }>(`/user/${id}/deactivate`).then(r => r.data),
};
