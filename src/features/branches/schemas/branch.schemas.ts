import { z } from 'zod';

export const createBranchSchema = z.object({
    name: z.string().min(1, 'Tên cơ sở là bắt buộc'),
    code: z.string().min(1, 'Mã cơ sở là bắt buộc').max(20, 'Mã tối đa 20 ký tự'),
    address: z.string().optional(),
    phone: z.string().optional(),
    email: z.string().optional(),
});

export const editBranchSchema = z.object({
    name: z.string().min(1, 'Tên cơ sở là bắt buộc'),
    address: z.string().optional(),
    phone: z.string().optional(),
    email: z.string().optional(),
});

export type CreateBranchFormValues = z.infer<typeof createBranchSchema>;
export type EditBranchFormValues = z.infer<typeof editBranchSchema>;
