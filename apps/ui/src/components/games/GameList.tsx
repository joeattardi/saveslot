import GameSkeleton from './GameSkeleton';
import classes from './GameList.module.css';
import { useQuery } from '@tanstack/react-query';
import type { Game as GameType } from '../../types/game';
import Game from './Game';
import { GameController } from 'phosphor-react';
import { NavLink } from 'react-router';

async function fetchGames(): Promise<GameType[]> {
    const response = await fetch('/api/games');
    if (!response.ok) {
        throw new Error('Failed to fetch games');
    }
    return response.json();
}

export default function GameList() {
    const result = useQuery({
        queryKey: ['games'],
        queryFn: fetchGames
    });

    return (
        <ul className={classes.gameList}>
            {result.isLoading && (
                <>
                    <li>
                        <GameSkeleton />
                    </li>
                    <li>
                        <GameSkeleton />
                    </li>
                    <li>
                        <GameSkeleton />
                    </li>
                </>
            )}
            {result.isSuccess && result.data.map((game) => <Game key={game.id} game={game} />)}
            {result.isSuccess && result.data.length === 0 && (
                <li className={classes.emptyState}>
                    <GameController size={128} className={classes.emptyIcon} />
                    <p>
                        No games found. <NavLink to="/app/add">Add a game</NavLink> to get started!
                    </p>
                </li>
            )}
        </ul>
    );
}
