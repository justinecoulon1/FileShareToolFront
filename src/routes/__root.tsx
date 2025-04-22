import { Outlet, createRootRoute } from '@tanstack/react-router';
import { TanStackRouterDevtools } from '@tanstack/react-router-devtools';
import React from "react"

export const Route = createRootRoute({
    component: () => (
        <>
            <main className='p-3'>
                <Outlet />
            </main>
            <TanStackRouterDevtools />
        </>
    ),
});