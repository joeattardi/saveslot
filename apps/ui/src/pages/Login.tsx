import { Button, Callout } from '@radix-ui/themes';
import { useForm } from 'react-hook-form';
import { useNavigate } from 'react-router';
import logo from '../assets/images/logo.svg';
import Input from '../components/ui/Input';
import { authClient } from '../lib/auth-client';
import classes from './Login.module.css';

interface LoginFormData {
    email: string;
    password: string;
}

export default function Login() {
    const navigate = useNavigate();
    const {
        setError,
        setFocus,
        setValue,
        handleSubmit,
        control,
        formState: { isSubmitting, errors }
    } = useForm<LoginFormData>({
        defaultValues: {
            email: '',
            password: ''
        }
    });

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
                setValue('email', '');
                setValue('password', '');
                setFocus('email');
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
                    <img src={logo} alt="SaveSlot Logo" className={classes.logo} />
                </div>

                <header className={classes.header}>
                    <h1>Welcome back!</h1>
                </header>

                {errors.root?.loginError && (
                    <Callout.Root color="red">
                        <Callout.Text>{errors.root.loginError.message}</Callout.Text>
                    </Callout.Root>
                    // <span className={classes.errorBanner}>{errors.root.loginError.message}</span>
                )}

                <label className={classes.field}>
                    <span>Email</span>
                    <Input
                        control={control}
                        rules={{ required: 'Email is required' }}
                        name="email"
                        type="email"
                        placeholder="you@example.com"
                    />
                </label>
                {errors.email && <span className={classes.fieldError}>{errors.email.message}</span>}

                <label className={classes.field}>
                    <span>Password</span>
                    <Input
                        control={control}
                        rules={{ required: 'Password is required' }}
                        name="password"
                        type="password"
                        placeholder="Enter your password"
                    />
                </label>
                {errors.password && <span className={classes.fieldError}>{errors.password.message}</span>}

                <Button type="submit" loading={isSubmitting}>
                    {isSubmitting ? 'Signing in...' : 'Log In'}
                </Button>
            </form>
        </div>
    );
}
