import { createFileRoute } from '@tanstack/react-router';
import BranchLayout from '@/layouts/BranchLayout/BranchLayout';
import { StudentsPage } from '@/features/students/StudentsPage';

export const Route = createFileRoute('/_branch/students')({
    component: StudentsPageRoute,
});

function StudentsPageRoute() {
    return (
        <BranchLayout>
            <StudentsPage />
        </BranchLayout>
    );
}
