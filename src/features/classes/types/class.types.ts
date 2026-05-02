// ─── Class ────────────────────────────────────────────────────────────────────

export interface ClassItem {
    _id: string;
    name: string;
    code: string;
    branchId: string;
    teacherId: string;
    subjectName: string;
    status: 'active' | 'closed';
    studentCount: number;
    maxStudents?: number | null;
    schedule?: string | null;
    startDate?: string | null;
    endDate?: string | null;
    tuitionFee: number;
    createdAt: string;
}

export interface PaginationMeta {
    total: number;
    page: number;
    limit: number;
    total_pages: number;
}

export interface ClassListResponse {
    success: boolean;
    message: string;
    data: ClassItem[];
    meta: PaginationMeta;
}

export interface ClassResponse {
    success: boolean;
    message: string;
    data: ClassItem;
}

export interface ClassListParams {
    page?: number;
    limit?: number;
    search?: string;
    status?: 'active' | 'closed';
    teacher_id?: string;
}

export interface CreateClassPayload {
    name: string;
    teacher_id: string;
    subject_name: string;
    tuition_fee: number;
    max_students?: number;
    schedule?: string;
    start_date?: string;
    end_date?: string;
}

export interface UpdateClassPayload {
    name?: string;
    teacher_id?: string;
    subject_name?: string;
    max_students?: number;
    schedule?: string;
    tuition_fee?: number;
}

export type ClassFilterType = 'All' | 'Active' | 'Closed';

// ─── Session ──────────────────────────────────────────────────────────────────

export interface ClassSession {
    _id: string;
    classId: string;
    branchId: string;
    teacherId: string;
    sessionDate: string;
    startTime: string;
    endTime: string;
    topic?: string | null;
    status: 'scheduled' | 'ongoing' | 'completed' | 'cancelled';
    attendanceStatus: 'pending' | 'submitted';
    createdAt: string;
}

export interface SessionListResponse {
    success: boolean;
    message: string;
    data: ClassSession[];
    meta: PaginationMeta;
}

export interface SessionResponse {
    success: boolean;
    message: string;
    data: ClassSession;
}

export interface SessionListParams {
    page?: number;
    limit?: number;
    from?: string;
    to?: string;
}

export interface CreateSessionPayload {
    session_date: string;
    start_time: string;
    end_time: string;
    topic?: string;
}

// ─── Enrollment ───────────────────────────────────────────────────────────────

export interface Enrollment {
    _id: string;
    studentId: string;
    classId: string;
    branchId: string;
    status: 'active' | 'left' | 'completed';
    enrolledAt: string;
    leftAt?: string | null;
    reason?: string | null;
}

export interface EnrollmentListResponse {
    success: boolean;
    message: string;
    data: Enrollment[];
    meta: PaginationMeta;
}

export interface EnrollmentResponse {
    success: boolean;
    message: string;
    data: Enrollment;
}

export interface ClassStudentItem {
    _id: string;
    enrolledAt: string;
    leftAt?: string | null;
    leftReason?: string | null;
    studentId: {
        _id: string;
        fullName: string;
        userCode?: string;
        phone?: string | null;
        email?: string;
        dateOfBirth?: string | null;
    };
}

export interface ClassStudentListResponse {
    success: boolean;
    message: string;
    data: ClassStudentItem[];
    meta: PaginationMeta;
}
