import { apiClient } from '@/api/axios';
import type {
    ClassListResponse,
    ClassResponse,
    ClassListParams,
    CreateClassPayload,
    UpdateClassPayload,
} from '../types/class.types';

export const classApi = {
    getAll: (params?: ClassListParams) =>
        apiClient.get<ClassListResponse>('/class/all', { params }).then(r => r.data),

    getById: (id: string) =>
        apiClient.get<ClassResponse>(`/class/${id}`).then(r => r.data),

    create: (payload: CreateClassPayload) =>
        apiClient.post<ClassResponse>('/class/create-class', payload).then(r => r.data),

    update: (id: string, payload: UpdateClassPayload) =>
        apiClient.patch<ClassResponse>(`/class/${id}`, payload).then(r => r.data),

    close: (id: string) =>
        apiClient.patch<{ success: boolean; message: string }>(`/class/${id}/close`).then(r => r.data),
};
