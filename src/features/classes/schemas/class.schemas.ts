import { z } from 'zod';

export const createClassSchema = z.object({
    name: z.string().min(1, 'Tên lớp là bắt buộc'),
    teacher_id: z.string().min(1, 'Giáo viên là bắt buộc'),
    subject_name: z.string().min(1, 'Môn học là bắt buộc'),
    tuition_fee: z.coerce.number()
        .refine(v => !Number.isNaN(v), { message: 'Nhập số hợp lệ' })
        .min(0, 'Học phí không được âm'),
    max_students: z.coerce.number().min(1).optional().or(z.literal('')),
    schedule: z.string().optional(),
    start_date: z.string().optional(),
    end_date: z.string().optional(),
});

export const editClassSchema = z.object({
    name: z.string().min(1, 'Tên lớp là bắt buộc'),
    teacher_id: z.string().min(1, 'Giáo viên là bắt buộc'),
    subject_name: z.string().min(1, 'Môn học là bắt buộc'),
    tuition_fee: z.coerce.number()
        .refine(v => !Number.isNaN(v), { message: 'Nhập số hợp lệ' })
        .min(0, 'Học phí không được âm'),
    max_students: z.coerce.number().min(1).optional().or(z.literal('')),
    schedule: z.string().optional(),
});

export const createSessionSchema = z.object({
    session_date: z.string().min(1, 'Ngày học là bắt buộc'),
    start_time: z.string().min(1, 'Giờ bắt đầu là bắt buộc'),
    end_time: z.string().min(1, 'Giờ kết thúc là bắt buộc'),
    topic: z.string().optional(),
}).refine(d => !d.start_time || !d.end_time || d.end_time > d.start_time, {
    message: 'Giờ kết thúc phải sau giờ bắt đầu',
    path: ['end_time'],
});

export type CreateClassFormValues = z.infer<typeof createClassSchema>;
export type EditClassFormValues = z.infer<typeof editClassSchema>;
export type CreateSessionFormValues = z.infer<typeof createSessionSchema>;
