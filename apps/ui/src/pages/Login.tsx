import { Button, Callout } from '@radix-ui/themes';
import { useForm } from 'react-hook-form';
import { useNavigate } from 'react-router';
import logo from '../assets/images/logo.svg';
import controllerImg from '../assets/images/ps-controller.jpg';
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
            <div className={classes.heroPanel}>
                <img src={controllerImg} alt="" className={classes.heroImage} />
                <div className={classes.heroGlow} aria-hidden="true" />
                <small className={classes.attribution}>
                    Photo by{' '}
                    <a href="https://unsplash.com/@michal_ilenda?utm_source=unsplash&utm_medium=referral&utm_content=creditCopyText">Michal Ilenda</a>
                    {' '}on{' '}
                    <a href="https://unsplash.com/photos/black-sony-ps-4-game-controller-UzwsrV3bFdU?utm_source=unsplash&utm_medium=referral&utm_content=creditCopyText">Unsplash</a>
                </small>
            </div>

            <div className={classes.formPanel}>
                <form className={classes.loginForm} onSubmit={handleSubmit(login)} noValidate>
                    <div className={classes.brandBlock}>
                        <img src={logo} alt="SaveSlot Logo" className={classes.logo} />
                    </div>

                    <header className={classes.header}>
                        <h1>Welcome back!</h1>
                        <p>Sign in to your SaveSlot account</p>
                    </header>

                    {errors.root?.loginError && (
                        <Callout.Root color="red">
                            <Callout.Text>{errors.root.loginError.message}</Callout.Text>
                        </Callout.Root>
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
        </div>
    );
}
