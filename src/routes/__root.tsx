import { createRootRoute, Outlet } from '@tanstack/react-router'

export const Route = createRootRoute({
    component: () => (
        <>
            <Outlet />
            {/* Có thể thêm TanStack Router Devtools ở đây khi code */}
        </>
    ),
})