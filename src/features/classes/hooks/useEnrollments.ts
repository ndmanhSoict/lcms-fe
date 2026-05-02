import { useMemo } from 'react';
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { enrollmentApi } from '../api/enrollment.api';

export function useClassStudents(classId: string, status: 'active' | 'left') {
    const { data, isLoading } = useQuery({
        queryKey: ['class-students', classId, status],
        queryFn: () => enrollmentApi.getClassStudents(classId, { limit: 100, status }),
    });

    const students = useMemo(() => data?.data ?? [], [data]);

    return { students, isLoading };
}

export function useAddStudent(classId: string, onSuccess: (studentId: string) => void, onError: (msg: string) => void) {
    const queryClient = useQueryClient();

    return useMutation({
        mutationFn: (studentId: string) =>
            enrollmentApi.add({ student_id: studentId, class_id: classId }),
        onSuccess: (_, studentId) => {
            queryClient.invalidateQueries({ queryKey: ['class-students', classId] });
            queryClient.invalidateQueries({ queryKey: ['class-detail', classId] });
            queryClient.invalidateQueries({ queryKey: ['students-search', classId] });
            onSuccess(studentId);
        },
        onError,
    });
}

export function useRemoveStudent(onSuccess: () => void, onError: (msg: string) => void) {
    return useMutation({
        mutationFn: ({ enrollmentId, reason }: { enrollmentId: string; reason?: string }) =>
            enrollmentApi.leave(enrollmentId, { reason }),
        onSuccess,
        onError,
    });
}
