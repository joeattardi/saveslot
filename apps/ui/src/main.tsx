import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import { createBrowserRouter } from 'react-router';
import { RouterProvider } from 'react-router/dom';
import './index.css';
import LandingPage from './pages/LandingPage.tsx';
import Login from './pages/Login.tsx';
import Home from './pages/app/Home.tsx';
import { protectedRouteLoader } from './lib/auth-loader.ts';

const container = document.getElementById('root');
if (!container) {
    throw new Error('Root container not found');
}

const router = createBrowserRouter([
    {
        path: '/',
        element: <LandingPage />,
    },
    {
        path: '/login',
        element: <Login />
    },
    {
        path: '/app',
        element: <Home />,
        loader: protectedRouteLoader
    }
]);


createRoot(container).render(
    <StrictMode>
        <RouterProvider router={router} />
    </StrictMode>
);
