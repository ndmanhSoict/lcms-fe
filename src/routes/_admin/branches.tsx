import { createFileRoute } from '@tanstack/react-router';
import AdminLayout from '@/layouts/AuthLayout/AuthLayout';
import { BranchesPage } from '@/features/branches/BranchesPage';

export const Route = createFileRoute('/_admin/branches')({
    component: BranchesPageRoute,
});

function BranchesPageRoute() {
    return (
        <AdminLayout>
            <BranchesPage />
        </AdminLayout>
    );
}
