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
            <form className={classes.loginForm} onSubmit={handleSubmit(login)} noValidate>
                <img src={logo} alt="QuestLog Logo" className={classes.logo} />
                <h1>Log In</h1>
                {errors.root?.loginError && <span>{errors.root.loginError.message}</span>}
                <Input
                    type="email"
                    placeholder="Email"
                    {...register('email', { required: true })}
                />
                {errors.email && <span>Email is required</span>}
                <Input
                    type="password"
                    placeholder="Password"
                    {...register('password', { required: true })}
                />
                {errors.password && <span>Password is required</span>}
                <Button type="submit" disabled={isSubmitting}>
                    Log In
                </Button>
            </form>
        </div>
    );
}
