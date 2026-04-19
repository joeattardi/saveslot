import { NavLink } from 'react-router';
import classes from './NotFound.module.css';

export default function NotFound() {
    return (
        <main className={classes.container}>
            <div className={classes.glowOne} aria-hidden="true" />
            <div className={classes.glowTwo} aria-hidden="true" />

            <div className={classes.card}>
                <p className={classes.errorCode}>404</p>
                <h1 className={classes.title}>Save not found</h1>
                <p className={classes.message}>
                    Looks like this page wandered off the map. Let's get you back to familiar
                    territory.
                </p>
                <NavLink to="/" className={classes.homeLink}>
                    ← Back to Home
                </NavLink>
            </div>
        </main>
    );
}
