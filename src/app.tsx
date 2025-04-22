import React from 'react';
import { createRoot } from 'react-dom/client';
import {createRouter, RouterProvider} from "@tanstack/react-router";
import { routeTree } from './routeTree.gen';


const router = createRouter({
    routeTree,
    context: {},
    defaultPreload: 'intent',
    scrollRestoration: true,
    defaultStructuralSharing: true,
    defaultPreloadStaleTime: 0,
});

declare module '@tanstack/react-router' {
    interface Register {
        router: typeof router;
    }
}

const root = createRoot(document.body);
root.render( <RouterProvider router={router} />);
