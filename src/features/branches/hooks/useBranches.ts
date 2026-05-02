import { useMemo } from 'react';
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { branchApi } from '../api/branch.api';
import type { Branch, BranchFilterType, CreateBranchPayload, UpdateBranchPayload } from '../types/branch.types';

const QUERY_KEY = 'branches';

export function useBranchList(search: string) {
    const { data, isLoading } = useQuery({
        queryKey: [QUERY_KEY, search],
        queryFn: () => branchApi.getAll({ limit: 100, search: search || undefined }),
    });

    const branches: Branch[] = useMemo(() => data?.data ?? [], [data]);

    const stats = useMemo(() => ({
        total: branches.length,
        active: branches.filter(b => b.isActive).length,
        inactive: branches.filter(b => !b.isActive).length,
    }), [branches]);

    return { branches, stats, isLoading };
}

export function useFilteredBranches(branches: Branch[], filter: BranchFilterType) {
    return useMemo(() => {
        if (filter === 'Active') return branches.filter(b => b.isActive);
        if (filter === 'Inactive') return branches.filter(b => !b.isActive);
        return branches;
    }, [branches, filter]);
}

export function useCreateBranch(onSuccess: () => void, onError: (msg: string) => void) {
    const queryClient = useQueryClient();

    return useMutation({
        mutationFn: (payload: CreateBranchPayload) => branchApi.create(payload),
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: [QUERY_KEY] });
            onSuccess();
        },
        onError,
    });
}

export function useUpdateBranch(id: string, onSuccess: () => void, onError: (msg: string) => void) {
    const queryClient = useQueryClient();

    return useMutation({
        mutationFn: (payload: UpdateBranchPayload) => branchApi.update(id, payload),
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: [QUERY_KEY] });
            onSuccess();
        },
        onError,
    });
}

export function useToggleBranch(id: string, onSuccess: () => void, onError: (msg: string) => void) {
    const queryClient = useQueryClient();

    return useMutation({
        mutationFn: () => branchApi.toggleActive(id),
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: [QUERY_KEY] });
            onSuccess();
        },
        onError,
    });
}
