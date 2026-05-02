export interface LoginPayload {
    email: string;
    password: string;
}

export interface AuthUser {
    id: string;
    email: string;
    role: string;
    fullName: string;
    branchId: string | null;
}

export interface LoginResponse {
    success: boolean;
    message: string;
    timestamp: string;
    data: {
        user: AuthUser;
        accessToken: string;
        refreshToken: string;
    };
}
