import { useLoaderData, useNavigate } from 'react-router';
import { authClient } from '../../lib/auth-client';
import classes from './Home.module.css';
import Button from '../../components/ui/Button';
import logo from '../../assets/images/logo.svg';

export default function Home() {
    const data = useLoaderData();
    const navigate = useNavigate();

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
        <main className={classes.container}>
            <header className={classes.topbar}>
                <div className={classes.brandRow}>
                    <img src={logo} alt="QuestLog Logo" className={classes.logo} />
                    <div>
                        <p className={classes.productName}>QuestLog</p>
                        <p className={classes.pageLabel}>Backlog Dashboard</p>
                    </div>
                </div>
                <Button onClick={logout}>Log Out</Button>
            </header>

            <section className={classes.heroCard}>
                <p className={classes.eyebrow}>Welcome back</p>
                <h1>{data.user.name}</h1>
                <p>
                    Your command center is ready. This skeleton will expand into queue management,
                    completed-game ratings, and flexible list building.
                </p>
            </section>

            <section className={classes.grid}>
                <article className={classes.card}>
                    <h2>Queue</h2>
                    <p>Placeholder panel for what you are actively playing and what is next up.</p>
                </article>
                <article className={classes.card}>
                    <h2>Completed + Ratings</h2>
                    <p>Placeholder panel for finished games and your personal score history.</p>
                </article>
                <article className={classes.card}>
                    <h2>Custom Lists</h2>
                    <p>Placeholder panel for future arbitrary lists like co-op picks or yearly goals.</p>
                </article>
            </section>
        </main>
    );
}
