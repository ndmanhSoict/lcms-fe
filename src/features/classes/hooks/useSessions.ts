import { useMemo } from 'react';
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { sessionApi } from '../api/session.api';
import type { CreateSessionPayload } from '../types/class.types';

export function useSessionList(classId: string) {
    const { data, isLoading } = useQuery({
        queryKey: ['sessions', classId],
        queryFn: () => sessionApi.getAll(classId, { limit: 100 }),
    });

    const sessions = useMemo(() => data?.data ?? [], [data]);

    return { sessions, isLoading };
}

export function useCreateSession(classId: string, onSuccess: () => void, onError: (msg: string) => void) {
    const queryClient = useQueryClient();

    return useMutation({
        mutationFn: (payload: CreateSessionPayload) => sessionApi.create(classId, payload),
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ['sessions', classId] });
            onSuccess();
        },
        onError,
    });
}
