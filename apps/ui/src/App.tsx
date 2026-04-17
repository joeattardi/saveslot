import { useState } from 'react';
import { authClient } from './lib/auth-client';

export function App() {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    async function login(event: React.SubmitEvent<HTMLFormElement>) {
        event.preventDefault();

        const { data, error } = await authClient.signIn.email({
            email,
            password,
            rememberMe: true,
            callbackURL: '/'
        });

        console.log('Login response:', { data, error });

        if (error) {
            alert(`Login failed: ${error.message}`);
        } else {
            alert('Login successful!');
        }
    }

    return (
        <main>
            <h1>Questlog</h1>
            <form onSubmit={login}>
                <input type="email" name="email" placeholder="Email" value={email} onChange={(e) => setEmail(e.target.value)} />
                <input type="password" name="password" placeholder="Password" value={password} onChange={(e) => setPassword(e.target.value)} />
                <button type="submit">Login</button>
            </form>
        </main>
    );
}
