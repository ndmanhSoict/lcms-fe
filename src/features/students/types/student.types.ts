export interface Student {
    _id: string;
    fullName?: string;
    full_name?: string;
    email?: string | null;
    phone?: string | null;
    role: string;
    branchId?: string | null;
    userCode?: string;
    isActive: boolean;
    createdAt: string;
    updatedAt: string;
}

export interface Parent {
    _id: string;
    fullName?: string;
    full_name?: string;
    email?: string | null;
    phone?: string | null;
    role: string;
    isActive: boolean;
}

export interface PaginationMeta {
    total: number;
    page: number;
    limit: number;
    total_pages: number;
}

export interface StudentListResponse {
    success: boolean;
    message: string;
    data: Student[];
    meta: PaginationMeta;
}

export interface StudentResponse {
    success: boolean;
    message: string;
    data: Student;
}

export interface ParentListResponse {
    success: boolean;
    message: string;
    data: Parent[];
}

export interface StudentListParams {
    page?: number;
    limit?: number;
    search?: string;
    class_id?: string;
}

export interface CreateStudentPayload {
    full_name: string;
    email?: string;
    phone?: string;
    date_of_birth?: string;
    parent_ids?: string[];
}

export interface UpdateStudentPayload {
    full_name?: string;
    phone?: string;
    email?: string;
    date_of_birth?: string;
}

export type StudentFilterType = 'All' | 'Active' | 'Inactive';
