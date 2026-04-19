import GameList from '../../components/games/GameList';
import classes from './Home.module.css';

export default function Home() {
    return (
        <div className={classes.container}>
            <h1>My Games</h1>
            <GameList />
        </div>
    );
}
