import { apiClient } from "@/api/axios";

export interface Branch {
    _id: string;
    name: string;
    code: string;
    address?: string | null;
    phone?: string | null;
    email?: string | null;
    isActive: boolean;
    createdAt: string;
    updatedAt: string;
}

export interface PaginationMeta {
    total: number;
    page: number;
    limit: number;
    total_pages: number;
}

export interface BranchListResponse {
    success: boolean;
    message: string;
    data: Branch[];
    meta: PaginationMeta;
}

export interface BranchResponse {
    success: boolean;
    message: string;
    data: Branch;
}

export interface BranchListParams {
    page?: number;
    limit?: number;
    search?: string;
}

export interface CreateBranchPayload {
    name: string;
    code: string;
    address?: string;
    phone?: string;
    email?: string;
}

export interface UpdateBranchPayload {
    name?: string;
    address?: string;
    phone?: string;
    email?: string;
}

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
