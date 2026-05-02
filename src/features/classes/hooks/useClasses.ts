import { useMemo } from 'react';
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { classApi } from '../api/class.api';
import type { ClassItem, ClassFilterType, CreateClassPayload, UpdateClassPayload } from '../types/class.types';

const QUERY_KEY = 'classes';

export function useClassList(search: string) {
    const { data, isLoading } = useQuery({
        queryKey: [QUERY_KEY, search],
        queryFn: () => classApi.getAll({ limit: 100, search: search || undefined }),
    });

    const classes: ClassItem[] = useMemo(() => data?.data ?? [], [data]);

    const stats = useMemo(() => ({
        total: classes.length,
        active: classes.filter(c => c.status === 'active').length,
        closed: classes.filter(c => c.status === 'closed').length,
    }), [classes]);

    return { classes, stats, isLoading };
}

export function useFilteredClasses(classes: ClassItem[], filter: ClassFilterType) {
    return useMemo(() => {
        if (filter === 'Active') return classes.filter(c => c.status === 'active');
        if (filter === 'Closed') return classes.filter(c => c.status === 'closed');
        return classes;
    }, [classes, filter]);
}

export function useClassDetail(classId: string) {
    return useQuery({
        queryKey: ['class-detail', classId],
        queryFn: () => classApi.getById(classId),
    });
}

export function useCreateClass(onSuccess: () => void, onError: (msg: string) => void) {
    const queryClient = useQueryClient();

    return useMutation({
        mutationFn: (payload: CreateClassPayload) => classApi.create(payload),
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: [QUERY_KEY] });
            onSuccess();
        },
        onError,
    });
}

export function useUpdateClass(id: string, onSuccess: () => void, onError: (msg: string) => void) {
    const queryClient = useQueryClient();

    return useMutation({
        mutationFn: (payload: UpdateClassPayload) => classApi.update(id, payload),
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: [QUERY_KEY] });
            queryClient.invalidateQueries({ queryKey: ['class-detail', id] });
            onSuccess();
        },
        onError,
    });
}

export function useCloseClass(id: string, onSuccess: () => void, onError: (msg: string) => void) {
    const queryClient = useQueryClient();

    return useMutation({
        mutationFn: () => classApi.close(id),
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: [QUERY_KEY] });
            queryClient.invalidateQueries({ queryKey: ['class-detail', id] });
            onSuccess();
        },
        onError,
    });
}
