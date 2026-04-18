import classes from './Logo.module.css';
import logo from '../assets/images/logo.svg';
import clsx from 'clsx';

interface LogoProps {
    style?: 'light' | 'dark';
    size?: 'small' | 'medium' | 'large';
}

export default function Logo({ style = 'light', size = 'medium' }: LogoProps) {
    const textClasses = clsx(classes.brandText, {
        [classes.brandTextDark as string]: style === 'dark',
        [classes.brandTextSmall as string]: size === 'small',
        [classes.brandTextMedium as string]: size === 'medium',
        [classes.brandTextLarge as string]: size === 'large'
    });

    const logoClasses = clsx(classes.logo, {
        [classes.logoDark as string]: style === 'dark',
        [classes.logoSmall as string]: size === 'small',
        [classes.logoMedium as string]: size === 'medium',
        [classes.logoLarge as string]: size === 'large'
    });

    return (
        <div className={classes.logoContainer}>
            <img className={logoClasses} src={logo} alt="SaveSlot Logo" />
            <div className={textClasses}>SaveSlot</div>
        </div>
    );
}
