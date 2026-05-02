import { apiClient } from '@/api/axios';
import type {
    BranchListResponse,
    BranchResponse,
    BranchListParams,
    CreateBranchPayload,
    UpdateBranchPayload,
} from '../types/branch.types';

export const branchApi = {
    getAll: (params?: BranchListParams) =>
        apiClient.get<BranchListResponse>('/branch/all', { params }).then(r => r.data),

    getById: (id: string) =>
        apiClient.get<BranchResponse>(`/branch/${id}`).then(r => r.data),

    create: (payload: CreateBranchPayload) =>
        apiClient.post<BranchResponse>('/branch/create-branch', payload).then(r => r.data),

    update: (id: string, payload: UpdateBranchPayload) =>
        apiClient.patch<BranchResponse>(`/branch/${id}`, payload).then(r => r.data),

    toggleActive: (id: string) =>
        apiClient.patch<{ success: boolean; message: string }>(`/branch/${id}/toggle-active`).then(r => r.data),
};
