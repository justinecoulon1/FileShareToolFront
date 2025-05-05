import React from 'react';
import { createRoot } from 'react-dom/client';
import { createRouter, RouterProvider } from '@tanstack/react-router';
import { routeTree } from './routeTree.gen';
import { ClientProviders } from './client-providers';
import styles from './title-bar.module.css';

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
root.render(
  <ClientProviders>
    <div className={styles.titleBar}>
      <img src="/grey-frog-banner-blue-eyes.png" alt="logo" className={styles.logo} />
      <p className={styles.appName}>File Share Tool</p>
    </div>
    <RouterProvider router={router} />
  </ClientProviders>,
);
