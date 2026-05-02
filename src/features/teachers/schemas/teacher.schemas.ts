import { z } from 'zod';

export const createTeacherSchema = z.object({
    fullName: z.string().min(1, 'Họ tên là bắt buộc'),
    email: z.string().email('Email không hợp lệ'),
    phone: z.string().optional(),
    password: z.string()
        .min(8, 'Mật khẩu phải có ít nhất 8 ký tự')
        .regex(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[^A-Za-z\d])/, 'Phải có chữ hoa, chữ thường, số và ký tự đặc biệt'),
    dateOfBirth: z.string().optional(),
    gender: z.enum(['male', 'female', 'other']).optional(),
    subjects: z.string().optional(),
    joinDate: z.string().optional(),
});

export const editTeacherSchema = z.object({
    fullName: z.string().min(1, 'Họ tên là bắt buộc'),
    phone: z.string().optional(),
    dateOfBirth: z.string().optional(),
    gender: z.enum(['male', 'female', 'other']).optional(),
    subjects: z.string().optional(),
    joinDate: z.string().optional(),
});

export type CreateTeacherFormValues = z.infer<typeof createTeacherSchema>;
export type EditTeacherFormValues = z.infer<typeof editTeacherSchema>;

export const GENDER_OPTIONS = [
    { value: 'male', label: 'Nam' },
    { value: 'female', label: 'Nữ' },
    { value: 'other', label: 'Khác' },
] as const;
