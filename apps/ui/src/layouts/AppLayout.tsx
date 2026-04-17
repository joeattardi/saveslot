import { Outlet } from 'react-router';
import Header from '../components/Header';
import Footer from '../components/Footer';
import classes from './AppLayout.module.css';

export default function AppLayout() {
    return (
        <div className={classes.layout}>
            <Header />
            <main>
                <Outlet />
            </main>
            <Footer />
        </div>
    );
}
