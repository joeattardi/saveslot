import { useForm } from 'react-hook-form';
import { authClient } from '../lib/auth-client';
import { useNavigate } from 'react-router';
import classes from './Login.module.css';
import logo from '../assets/images/logo.svg';
import Input from '../components/ui/Input';
import Button from '../components/ui/Button';

interface LoginFormData {
    email: string;
    password: string;
}

export default function Login() {
    const navigate = useNavigate();

    const {
        register,
        setError,
        handleSubmit,
        formState: { isSubmitting, errors }
    } = useForm<LoginFormData>();

    async function login(data: LoginFormData) {
        try {
            const loginResponse = await authClient.signIn.email({
                email: data.email,
                password: data.password,
                rememberMe: true
            });

            if (loginResponse.error) {
                console.error('Login failed', loginResponse.error);
                setError('root.loginError', {
                    message: loginResponse.error.message || 'Login failed'
                });
            } else {
                navigate('/app');
            }
        } catch (error) {
            console.error('Login error', error);
        }
    }

    return (
        <div className={classes.container}>
            <div className={classes.backdropShapeOne} aria-hidden="true" />
            <div className={classes.backdropShapeTwo} aria-hidden="true" />

            <form className={classes.loginForm} onSubmit={handleSubmit(login)} noValidate>
                <div className={classes.brandBlock}>
                    <img src={logo} alt="QuestLog Logo" className={classes.logo} />
                    <p className={classes.tagline}>Track every quest. Keep every memory.</p>
                </div>

                <header className={classes.header}>
                    <h1>Welcome back</h1>
                    <p>Pick up right where your campaign left off.</p>
                </header>

                {errors.root?.loginError && (
                    <span className={classes.errorBanner}>{errors.root.loginError.message}</span>
                )}

                <label className={classes.field}>
                    <span>Email</span>
                    <Input
                        type="email"
                        placeholder="you@questlog.app"
                        autoComplete="email"
                        {...register('email', { required: true })}
                    />
                </label>
                {errors.email && <span className={classes.fieldError}>Email is required</span>}

                <label className={classes.field}>
                    <span>Password</span>
                    <Input
                        type="password"
                        placeholder="Enter your password"
                        autoComplete="current-password"
                        {...register('password', { required: true })}
                    />
                </label>
                {errors.password && <span className={classes.fieldError}>Password is required</span>}

                <div className={classes.metaRow}>
                    <a href="#" onClick={(event) => event.preventDefault()}>
                        Forgot password?
                    </a>
                </div>

                <Button type="submit" disabled={isSubmitting}>
                    {isSubmitting ? 'Signing in...' : 'Log In'}
                </Button>
            </form>
        </div>
    );
}
