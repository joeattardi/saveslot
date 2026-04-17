import { NavLink } from 'react-router';

export default function LandingPage() {
    return (
        <main>
            <h1>QuestLog</h1>
            <p>Welcome to QuestLog! Please log in to continue.</p>
            <NavLink to="/login">Log In</NavLink>
        </main>
    );
}
