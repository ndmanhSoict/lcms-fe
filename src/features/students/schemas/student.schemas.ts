import { z } from 'zod';

export const createStudentSchema = z.object({
    full_name: z.string().min(1, 'Họ tên là bắt buộc'),
    email: z.string().optional(),
    phone: z.string().optional(),
    date_of_birth: z.string().optional(),
});

export const editStudentSchema = z.object({
    full_name: z.string().min(1, 'Họ tên là bắt buộc'),
    phone: z.string().optional(),
    email: z.string().optional(),
    date_of_birth: z.string().optional(),
});

export type CreateStudentFormValues = z.infer<typeof createStudentSchema>;
export type EditStudentFormValues = z.infer<typeof editStudentSchema>;
