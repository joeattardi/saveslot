import { Button } from '@radix-ui/themes';
import { Plus } from 'phosphor-react';
import { NavLink } from 'react-router';
import classes from './Header.module.css';
import Logo from './Logo';
import UserMenu from './UserMenu';

export default function Header() {
    return (
        <header className={classes.header}>
            <NavLink to="/app" className={classes.titleLink}>
                <Logo style="dark" size="small" />
            </NavLink>
            <div className={classes.topNav}>
                <Button asChild>
                    <NavLink to="/app/add">
                        <Plus /> Add Game
                    </NavLink>
                </Button>
                <UserMenu />
            </div>
        </header>
    );
}
