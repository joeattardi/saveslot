import { NavLink } from 'react-router';
import logo from '../assets/images/logo.svg';
import classes from './Header.module.css';
import UserMenu from './UserMenu';
import { Button } from '@radix-ui/themes';
import { Plus } from 'phosphor-react';

export default function Header() {
    return (
        <header className={classes.header}>
            <NavLink to="/app" className={classes.titleLink}>
                <img src={logo} alt="SaveSlot Logo" className={classes.logo} />
                <h1 className={classes.productName}>SaveSlot</h1>
            </NavLink>
            <div className={classes.topNav}>
                <Button><Plus /> Add Game</Button>
                <UserMenu />
            </div>
        </header>
    );
}
