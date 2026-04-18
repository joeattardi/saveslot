import { NavLink } from 'react-router';
import classes from './LandingPage.module.css';
import logo from '../assets/images/logo.svg';
import controllerImg from '../assets/images/controller.jpg';

export default function LandingPage() {
    return (
        <main className={classes.container}>
            <div className={classes.backdropOne} aria-hidden="true" />
            <div className={classes.backdropTwo} aria-hidden="true" />

            <section className={classes.hero}>
                <div className={classes.heroContent}>
                    <div className={classes.brandRow}>
                        <img src={logo} alt="SaveSlot Logo" className={classes.logo} />
                        <p className={classes.brandText}>SaveSlot</p>
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
                        <a
                            href="#features"
                            className={classes.secondaryCta}
                            onClick={(event) => {
                                event.preventDefault();
                                document.getElementById('features')?.scrollIntoView({ behavior: 'smooth' });
                            }}
                        >
                            Explore features
                        </a>
                    </div>
                </div>

                <div className={classes.heroVisual}>
                    <div className={classes.imageGlow} aria-hidden="true" />
                    <img
                        src={controllerImg}
                        alt="Game controller with neon lighting"
                        className={classes.controllerImage}
                    />
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
