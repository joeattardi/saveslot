import classes from './GameSearchResult.module.css';
import type { IgdbGame } from '../../types/igdb';
import { Badge } from '@radix-ui/themes';

interface GameSearchResultProps {
    game: IgdbGame;
}

const releaseDateFormat = new Intl.DateTimeFormat(undefined, {
    year: 'numeric',
    month: 'short',
    day: 'numeric'
});

export default function GameSearchResult({ game }: GameSearchResultProps) {
    return (
        <div className={classes.result}>
            <img src={game.coverUrl} alt={`${game.name} cover`} className={classes.cover} />
            <div className={classes.details}>
                <h3>{game.name}</h3>
                <div className={classes.meta}>
                    {game.publisher && <span>{game.publisher}</span>}
                    {game.releaseDate && (
                        <span>{releaseDateFormat.format(new Date(game.releaseDate * 1000))}</span>
                    )}
                </div>
                {game.platforms && (
                    <div className={classes.platforms}>
                        {game.platforms.map(platform => <Badge key={platform}>{platform}</Badge>)}
                    </div>
                )}
                {game.rating && <div>{Math.round(game.rating)}</div>}
            </div>
        </div>
    );
}
