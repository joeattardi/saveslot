import classes from './FormField.module.css';

export default function FormField({ children }: { children: React.ReactNode }) {
    return <div className={classes.formField}>{children}</div>;
}
