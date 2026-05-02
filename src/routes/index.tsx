import { createFileRoute, redirect } from '@tanstack/react-router';
import { useAuthStore } from '@/store/authStore';

export const Route = createFileRoute('/')({
    beforeLoad: () => {
        const user = useAuthStore.getState().user;
        if (!user) throw redirect({ to: '/login' });
        const role = user.role.toUpperCase();
        if (role === 'SYSTEM_OWNER') throw redirect({ to: '/dashboard' });
        if (role === 'BRANCH_OWNER' || role === 'STAFF') throw redirect({ to: '/students' });
        throw redirect({ to: '/login' });
    },
});
