import { redirect } from 'react-router';
import { authClient } from '../lib/auth-client';

export async function protectedRouteLoader() {
    try {
        const response = await authClient.getSession();

        if (response.error || !response.data?.session || !response.data?.user) {
            return redirect('/login');
        }

        return response.data;
    } catch (error) {
        console.error('Error fetching current user:', error);
        return redirect('/login');
    }
}

export async function guestRouteLoader() {
    try {
        const response = await authClient.getSession();

        if (response.data?.session && response.data?.user) {
            return redirect('/app');
        }

        return null;
    } catch (error) {
        console.error('Error fetching current user:', error);
        return null;
    }
}
