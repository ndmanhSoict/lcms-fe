import { createFileRoute, Outlet } from '@tanstack/react-router';
import BranchLayout from '@/layouts/BranchLayout/BranchLayout';

export const Route = createFileRoute('/_branch/classes')({
    component: ClassesLayout,
});

function ClassesLayout() {
    return (
        <BranchLayout>
            <Outlet />
        </BranchLayout>
    );
}
