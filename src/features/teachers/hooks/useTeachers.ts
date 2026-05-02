import { useMemo } from 'react';
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { teacherApi } from '../api/teacher.api';
import type { Teacher, TeacherFilterType, CreateTeacherPayload, UpdateTeacherPayload } from '../types/teacher.types';

const QUERY_KEY = 'teachers-list';

export function useTeacherList(search: string) {
    const { data, isLoading } = useQuery({
        queryKey: [QUERY_KEY, search],
        queryFn: () => teacherApi.getAll({ limit: 100, search: search || undefined }),
    });

    const teachers: Teacher[] = useMemo(() => data?.data ?? [], [data]);

    const stats = useMemo(() => ({
        total: teachers.length,
        active: teachers.filter(t => t.isActive).length,
        inactive: teachers.filter(t => !t.isActive).length,
    }), [teachers]);

    return { teachers, stats, isLoading };
}

export function useFilteredTeachers(teachers: Teacher[], filter: TeacherFilterType) {
    return useMemo(() => {
        if (filter === 'Active') return teachers.filter(t => t.isActive);
        if (filter === 'Inactive') return teachers.filter(t => !t.isActive);
        return teachers;
    }, [teachers, filter]);
}

export function useCreateTeacher(onSuccess: () => void, onError: (msg: string) => void) {
    const queryClient = useQueryClient();

    return useMutation({
        mutationFn: (payload: CreateTeacherPayload) => teacherApi.create(payload),
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: [QUERY_KEY] });
            onSuccess();
        },
        onError,
    });
}

export function useUpdateTeacher(id: string, onSuccess: () => void, onError: (msg: string) => void) {
    const queryClient = useQueryClient();

    return useMutation({
        mutationFn: (payload: UpdateTeacherPayload) => teacherApi.update(id, payload),
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: [QUERY_KEY] });
            onSuccess();
        },
        onError,
    });
}

export function useDeleteTeacher(id: string, onSuccess: () => void, onError: (msg: string) => void) {
    const queryClient = useQueryClient();

    return useMutation({
        mutationFn: () => teacherApi.delete(id),
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: [QUERY_KEY] });
            onSuccess();
        },
        onError,
    });
}
