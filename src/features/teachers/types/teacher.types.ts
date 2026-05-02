export interface TeacherInfo {
    subjects: string[];
    joinDate?: string | null;
    activeClassIds?: string[];
}

export interface Teacher {
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
    teacherInfo?: TeacherInfo;
}

export interface TeacherListResponse {
    success: boolean;
    message: string;
    data: Teacher[];
    meta: { total: number; page: number; limit: number; total_pages: number };
}

export interface TeacherResponse {
    success: boolean;
    message: string;
    data: Teacher;
}

export interface TeacherListParams {
    page?: number;
    limit?: number;
    search?: string;
    isActive?: 'true' | 'false';
    subject?: string;
}

export interface CreateTeacherPayload {
    fullName: string;
    email: string;
    phone?: string;
    password: string;
    dateOfBirth?: string;
    gender?: 'male' | 'female' | 'other';
    teacherInfo?: {
        subjects?: string[];
        joinDate?: string;
    };
}

export interface UpdateTeacherPayload {
    fullName?: string;
    phone?: string;
    dateOfBirth?: string;
    gender?: 'male' | 'female' | 'other';
    teacherInfo?: {
        subjects?: string[];
        joinDate?: string;
    };
}

export type TeacherFilterType = 'All' | 'Active' | 'Inactive';
