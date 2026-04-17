import { useRouteLoaderData } from 'react-router';
import classes from './Home.module.css';

export default function Home() {
    const data = useRouteLoaderData('app');

    return (
        <main className={classes.container}>
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
