import { z } from 'zod';

export const createUserSchema = z.object({
    full_name: z.string().min(1, 'Họ tên là bắt buộc'),
    email: z.string().email('Email không hợp lệ'),
    phone: z.string().optional(),
    role: z.enum(['BRANCH_OWNER', 'STAFF']),
    password: z.string().min(6, 'Mật khẩu phải có ít nhất 6 ký tự'),
});

export const editUserSchema = z.object({
    full_name: z.string().min(1, 'Họ tên là bắt buộc'),
    phone: z.string().optional(),
    email: z.string().email('Email không hợp lệ'),
});

export type CreateUserFormValues = z.infer<typeof createUserSchema>;
export type EditUserFormValues = z.infer<typeof editUserSchema>;

export const ROLE_OPTIONS = [
    { value: 'BRANCH_OWNER', label: 'Chủ cơ sở' },
    { value: 'STAFF', label: 'Nhân viên' },
] as const;
