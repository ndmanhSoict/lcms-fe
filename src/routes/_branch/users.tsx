import { createFileRoute } from '@tanstack/react-router';
import BranchLayout from '@/layouts/BranchLayout/BranchLayout';
import { UsersPage } from '@/features/users/UsersPage';

export const Route = createFileRoute('/_branch/users')({
    component: () => (
        <BranchLayout>
            <UsersPage />
        </BranchLayout>
    ),
});
