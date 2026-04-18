import { NavLink } from 'react-router';
import classes from './LandingPage.module.css';
import logo from '../assets/images/logo.svg';
import controllerImg from '../assets/images/controller.jpg';
import Logo from '../components/Logo';

export default function LandingPage() {
    return (
        <main className={classes.container}>
            <div className={classes.backdropOne} aria-hidden="true" />
            <div className={classes.backdropTwo} aria-hidden="true" />

            <section className={classes.hero}>
                <img
                    src={controllerImg}
                    alt=""
                    aria-hidden="true"
                    className={classes.heroBg}
                />
                <div className={classes.heroOverlay} aria-hidden="true" />

                <span className={classes.attribution}>Photo by <a href="https://unsplash.com/@cjdante?utm_source=unsplash&utm_medium=referral&utm_content=creditCopyText">Javier Martinez</a> on <a href="https://unsplash.com/photos/red-xbox-one-game-controller-hUD0PUczwJQ?utm_source=unsplash&utm_medium=referral&utm_content=creditCopyText">Unsplash</a></span>

                <div className={classes.heroContent}>
                    <div className={classes.brandRow}>
                        <Logo />
                    </div>

                    <h1>Your game collection, finally done right.</h1>
                    <p>
                        Keep your gaming backlog organized with a focused queue, track completed titles,
                        and build better play habits over time.
                    </p>

                    <div className={classes.ctaRow}>
                        <NavLink to="/login" className={classes.primaryCta}>
                            Enter SaveSlot
                        </NavLink>
                    </div>
                </div>
            </section>

            <section id="features" className={classes.featuresGrid}>
                <article className={classes.featureCard}>
                    <h2>Game Queue</h2>
                    <p>Prioritize what to play next and keep your active backlog clear and manageable.</p>
                </article>
                <article className={classes.featureCard}>
                    <h2>Rate Completed Games</h2>
                    <p>Score finished games so your history becomes a personal recommendation archive.</p>
                </article>
                <article className={classes.featureCard}>
                    <h2>Custom Lists (Soon)</h2>
                    <p>Create your own themed lists in future updates, from co-op picks to all-time favorites.</p>
                </article>
            </section>
        </main>
    );
}
