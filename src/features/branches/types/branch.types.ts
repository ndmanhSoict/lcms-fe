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

export type BranchFilterType = 'All' | 'Active' | 'Inactive';
