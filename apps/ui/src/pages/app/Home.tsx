import { useLoaderData, useNavigate } from 'react-router';
import { authClient } from '../../lib/auth-client';

export default function Home() {
    const data = useLoaderData();
    const navigate = useNavigate();

    console.log(data);

    async function logout() {
        await authClient.signOut({
            fetchOptions: {
                onSuccess() {
                    navigate('/');
                }
            }
        });
    }

    return (
        <main>
            <h1>QuestLog</h1>
            <p>Welcome, {data.user.name}!</p>
            <button onClick={logout}>Log Out</button>
        </main>
    );
}
