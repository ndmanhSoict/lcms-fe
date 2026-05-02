import { apiClient } from '@/api/axios';
import type {
    TeacherListResponse,
    TeacherResponse,
    TeacherListParams,
    CreateTeacherPayload,
    UpdateTeacherPayload,
} from '../types/teacher.types';

export const teacherApi = {
    getAll: (params?: TeacherListParams) =>
        apiClient.get<TeacherListResponse>('/teachers', { params }).then(r => r.data),

    getById: (id: string) =>
        apiClient.get<TeacherResponse>(`/teachers/${id}`).then(r => r.data),

    create: (payload: CreateTeacherPayload) =>
        apiClient.post<TeacherResponse>('/teachers', payload).then(r => r.data),

    update: (id: string, payload: UpdateTeacherPayload) =>
        apiClient.patch<TeacherResponse>(`/teachers/${id}`, payload).then(r => r.data),

    delete: (id: string) =>
        apiClient.delete<{ success: boolean; message: string }>(`/teachers/${id}`).then(r => r.data),
};
