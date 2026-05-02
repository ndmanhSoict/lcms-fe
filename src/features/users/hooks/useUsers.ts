import { useMemo } from 'react';
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { userApi } from '../api/user.api';
import type { User, RoleFilter, CreateStaffPayload, UpdateUserPayload } from '../types/user.types';

const QUERY_KEY = 'branch-users';

export function useUserList(search: string) {
    const { data: ownerData, isLoading: ownerLoading } = useQuery({
        queryKey: [QUERY_KEY, 'BRANCH_OWNER', search],
        queryFn: () => userApi.getAll({ role: 'BRANCH_OWNER', limit: 100, search: search || undefined }),
    });

    const { data: staffData, isLoading: staffLoading } = useQuery({
        queryKey: [QUERY_KEY, 'STAFF', search],
        queryFn: () => userApi.getAll({ role: 'STAFF', limit: 100, search: search || undefined }),
    });

    const isLoading = ownerLoading || staffLoading;

    const allUsers: User[] = useMemo(() => [
        ...(ownerData?.data ?? []),
        ...(staffData?.data ?? []),
    ], [ownerData, staffData]);

    const stats = useMemo(() => ({
        total: allUsers.length,
        owners: allUsers.filter(u => u.role === 'BRANCH_OWNER').length,
        staff: allUsers.filter(u => u.role === 'STAFF').length,
    }), [allUsers]);

    return { allUsers, stats, isLoading };
}

export function useFilteredUsers(users: User[], roleFilter: RoleFilter) {
    return useMemo(() => {
        if (roleFilter === 'BRANCH_OWNER') return users.filter(u => u.role === 'BRANCH_OWNER');
        if (roleFilter === 'STAFF') return users.filter(u => u.role === 'STAFF');
        return users;
    }, [users, roleFilter]);
}

export function useCreateUser(onSuccess: () => void, onError: (msg: string) => void) {
    const queryClient = useQueryClient();

    return useMutation({
        mutationFn: (payload: CreateStaffPayload) => userApi.create(payload),
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: [QUERY_KEY] });
            onSuccess();
        },
        onError,
    });
}

export function useUpdateUser(id: string, onSuccess: () => void, onError: (msg: string) => void) {
    const queryClient = useQueryClient();

    return useMutation({
        mutationFn: (payload: UpdateUserPayload) => userApi.update(id, payload),
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: [QUERY_KEY] });
            onSuccess();
        },
        onError,
    });
}

export function useDeactivateUser(id: string, onSuccess: () => void, onError: (msg: string) => void) {
    const queryClient = useQueryClient();

    return useMutation({
        mutationFn: () => userApi.deactivate(id),
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: [QUERY_KEY] });
            onSuccess();
        },
        onError,
    });
}
