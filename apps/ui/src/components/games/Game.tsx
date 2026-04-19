import classes from './Game.module.css';
import { Box, Card } from '@radix-ui/themes';
import type { Game as GameType } from '../../types/game';
import { GameController } from 'phosphor-react';

interface GameProps {
    game: GameType;
}

export default function Game({ game }: GameProps) {
    return (
        <Box width="250px">
            <Card>
                <div className={classes.game}>
                    {game.coverUrl ? (
                        <img
                            src={game.coverUrl}
                            alt={`${game.name} cover`}
                            className={classes.cover}
                        />
                    ) : (
                        <GameController size={64} />
                    )}
                    <h3>{game.name}</h3>
                </div>
            </Card>
        </Box>
    );
}
