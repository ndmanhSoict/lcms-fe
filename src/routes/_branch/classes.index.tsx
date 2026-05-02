import { createFileRoute } from '@tanstack/react-router';
import { ClassesPage } from '@/features/classes/ClassesPage';

export const Route = createFileRoute('/_branch/classes/')({
    component: ClassesPage,
});
