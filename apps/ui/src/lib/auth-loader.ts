import { redirect } from 'react-router';

export async function protectedRouteLoader() {
    try {
        const response = await fetch('/api/current-user', {
            credentials: 'include'
        });

        if (!response.ok || response.status !== 200) {
            return redirect('/login');
        }

        return response.json();
    } catch (error) {
        console.error('Error fetching current user:', error);
        return redirect('/login');
    }
}
