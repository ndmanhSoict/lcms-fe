import { apiClient } from '@/api/axios';
import type {
    EnrollmentListResponse,
    EnrollmentResponse,
    ClassStudentListResponse,
} from '../types/class.types';

export const enrollmentApi = {
    add: (payload: { student_id: string; class_id: string; enrolled_at?: string }) =>
        apiClient.post<EnrollmentResponse>('/enrollments/add', payload).then(r => r.data),

    leave: (id: string, payload?: { reason?: string }) =>
        apiClient.patch<EnrollmentResponse>(`/enrollments/${id}/leave`, payload ?? {}).then(r => r.data),

    getByStudent: (studentId: string, params?: { page?: number; limit?: number }) =>
        apiClient.get<EnrollmentListResponse>(`/enrollments/students/${studentId}`, { params }).then(r => r.data),

    getClassStudents: (classId: string, params?: { page?: number; limit?: number; status?: 'active' | 'left' }) =>
        apiClient.get<ClassStudentListResponse>(`/class/${classId}/students`, { params }).then(r => r.data),
};
