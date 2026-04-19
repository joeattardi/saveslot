import classes from './GameSearchResult.module.css';
import type { IgdbGame } from '../../types/igdb';
import { Card } from '@radix-ui/themes';

interface GameSearchResultProps {
    game: IgdbGame;
}

export default function GameSearchResult({ game }: GameSearchResultProps) {
    return (
        <Card>
            <div className={classes.result}>
                <img src={game.coverUrl} alt={`${game.name} cover`} className={classes.cover} />
                <h3>{game.name}</h3>
            </div>
        </Card>
    );
}
