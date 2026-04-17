import { createBrowserRouter } from 'react-router';
import { guestRouteLoader, protectedRouteLoader } from './auth-loader.ts';
import LandingPage from '../pages/LandingPage.tsx';
import Login from '../pages/Login.tsx';
import Home from '../pages/app/Home.tsx';

export const router = createBrowserRouter([
    {
        path: '/',
        element: <LandingPage />,
        loader: guestRouteLoader
    },
    {
        path: '/login',
        element: <Login />,
        loader: guestRouteLoader
    },
    {
        path: '/app',
        element: <Home />,
        loader: protectedRouteLoader
    }
]);
