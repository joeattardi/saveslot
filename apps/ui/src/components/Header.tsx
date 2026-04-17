import { NavLink, useNavigate, useRouteLoaderData } from 'react-router';
import classes from './Header.module.css';
import logo from '../assets/images/logo.svg';
import { authClient } from '../lib/auth-client';
import Button from './ui/Button';

export default function Header() {
    const data = useRouteLoaderData('app');
    const navigate = useNavigate();
    
    async function logout() {
        await authClient.signOut({
            fetchOptions: {
                onSuccess: () => navigate('/')
            }
        });
    }

    return (
        <header className={classes.header}>
            <NavLink to="/app" className={classes.titleLink}>
                <img src={logo} alt="QuestLog Logo" className={classes.logo} />
                <h1 className={classes.productName}>QuestLog</h1>
            </NavLink>
            <div>
                <span className={classes.userName}>{data.user.name}</span>
                <Button onClick={logout}>Log Out</Button>
            </div>
        </header>
    );
}
