import { apiClient } from '@/api/axios';
import type {
    StudentListResponse,
    StudentResponse,
    ParentListResponse,
    StudentListParams,
    CreateStudentPayload,
    UpdateStudentPayload,
} from '../types/student.types';

export const studentApi = {
    getAll: (params?: StudentListParams) =>
        apiClient.get<StudentListResponse>('/student/all', { params }).then(r => r.data),

    getById: (id: string) =>
        apiClient.get<StudentResponse>(`/student/${id}`).then(r => r.data),

    create: (payload: CreateStudentPayload) =>
        apiClient.post<StudentResponse>('/student/create-student', payload).then(r => r.data),

    update: (id: string, payload: UpdateStudentPayload) =>
        apiClient.patch<StudentResponse>(`/student/${id}`, payload).then(r => r.data),

    getParents: (studentId: string) =>
        apiClient.get<ParentListResponse>(`/student/${studentId}/parents`).then(r => r.data),
};
