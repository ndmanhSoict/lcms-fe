import { apiClient } from '@/api/axios';
import type {
    SessionListResponse,
    SessionResponse,
    SessionListParams,
    CreateSessionPayload,
} from '../types/class.types';

export const sessionApi = {
    getAll: (classId: string, params?: SessionListParams) =>
        apiClient.get<SessionListResponse>(`/classes/${classId}/sessions`, { params }).then(r => r.data),

    create: (classId: string, payload: CreateSessionPayload) =>
        apiClient.post<SessionResponse>(`/classes/${classId}/sessions`, payload).then(r => r.data),
};
