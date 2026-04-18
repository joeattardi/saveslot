import { useRouteLoaderData } from 'react-router';
import classes from './Home.module.css';

export default function Home() {
    const data = useRouteLoaderData('app');

    return (
        <div className={classes.container}>
           
        </div>
    );
}
