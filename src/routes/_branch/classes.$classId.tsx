import { createFileRoute } from '@tanstack/react-router';
import { ClassDetailPage } from '@/features/classes/ClassDetailPage';

export const Route = createFileRoute('/_branch/classes/$classId')({
    component: ClassDetailRoute,
});

function ClassDetailRoute() {
    const { classId } = Route.useParams();
    return <ClassDetailPage classId={classId} />;
}
