export interface User {
    _id: string;
    fullName: string;
    email: string;
    phone?: string | null;
    role: string;
    branchId?: string | null;
    userCode?: string;
    isActive: boolean;
    createdAt: string;
    updatedAt?: string;
}

export interface UserListResponse {
    success: boolean;
    message: string;
    data: User[];
    meta: { total: number; page: number; limit: number; total_pages: number };
}

export interface UserResponse {
    success: boolean;
    message: string;
    data: User;
}

export interface UserListParams {
    page?: number;
    limit?: number;
    search?: string;
    role?: string;
}

export interface CreateStaffPayload {
    full_name: string;
    email: string;
    phone?: string;
    role: 'BRANCH_OWNER' | 'STAFF';
    password: string;
    branch_id?: string;
}

export interface UpdateUserPayload {
    full_name?: string;
    phone?: string;
    email?: string;
}

export type RoleFilter = 'ALL' | 'BRANCH_OWNER' | 'STAFF';

export const ROLE_LABELS: Record<string, string> = {
    BRANCH_OWNER: 'Chủ cơ sở',
    STAFF: 'Nhân viên',
    TEACHER: 'Giáo viên',
    STUDENT: 'Học sinh',
    PARENT: 'Phụ huynh',
};
