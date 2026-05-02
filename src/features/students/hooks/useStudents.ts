import { useMemo } from 'react';
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { studentApi } from '../api/student.api';
import type { Student, StudentFilterType, CreateStudentPayload, UpdateStudentPayload } from '../types/student.types';

const QUERY_KEY = 'students';

export function useStudentList(search: string) {
    const { data, isLoading } = useQuery({
        queryKey: [QUERY_KEY, search],
        queryFn: () => studentApi.getAll({ limit: 100, search: search || undefined }),
    });

    const students: Student[] = useMemo(() => data?.data ?? [], [data]);

    const stats = useMemo(() => ({
        total: students.length,
        active: students.filter(s => s.isActive).length,
        inactive: students.filter(s => !s.isActive).length,
    }), [students]);

    return { students, stats, isLoading };
}

export function useFilteredStudents(students: Student[], filter: StudentFilterType) {
    return useMemo(() => {
        if (filter === 'Active') return students.filter(s => s.isActive);
        if (filter === 'Inactive') return students.filter(s => !s.isActive);
        return students;
    }, [students, filter]);
}

export function useStudentParents(studentId: string | undefined) {
    return useQuery({
        queryKey: ['student-parents', studentId],
        queryFn: () => studentApi.getParents(studentId!),
        enabled: !!studentId,
    });
}

export function useCreateStudent(onSuccess: () => void, onError: (msg: string) => void) {
    const queryClient = useQueryClient();

    return useMutation({
        mutationFn: (payload: CreateStudentPayload) => studentApi.create(payload),
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: [QUERY_KEY] });
            onSuccess();
        },
        onError,
    });
}

export function useUpdateStudent(id: string, onSuccess: () => void, onError: (msg: string) => void) {
    const queryClient = useQueryClient();

    return useMutation({
        mutationFn: (payload: UpdateStudentPayload) => studentApi.update(id, payload),
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: [QUERY_KEY] });
            onSuccess();
        },
        onError,
    });
}
