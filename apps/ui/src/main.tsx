import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import { RouterProvider } from 'react-router/dom';
import { router } from './router';
import './index.css';
import { Theme } from '@radix-ui/themes';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';

const queryClient = new QueryClient();

const container = document.getElementById('root');
if (!container) {
    throw new Error('Root container not found');
}

createRoot(container).render(
    <StrictMode>
        <QueryClientProvider client={queryClient}>
            <Theme>
                <RouterProvider router={router} />
            </Theme>
        </QueryClientProvider>
    </StrictMode>
);
