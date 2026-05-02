import { createFileRoute } from '@tanstack/react-router';
import BranchLayout from '@/layouts/BranchLayout/BranchLayout';
import { TeachersPage } from '@/features/teachers/TeachersPage';

export const Route = createFileRoute('/_branch/teachers')({
    component: TeachersPageRoute,
});

function TeachersPageRoute() {
    return (
        <BranchLayout>
            <TeachersPage />
        </BranchLayout>
    );
}
