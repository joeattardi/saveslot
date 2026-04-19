import { Button, Text } from '@radix-ui/themes';
import { useState } from 'react';
import { useNavigate } from 'react-router';
import GameSearch from '../../components/games/GameSearch';
import Section from '../../components/ui/Section';
import type { IgdbGame } from '../../types/igdb';
import classes from './AddGame.module.css';
import { useMutation, useQueryClient } from '@tanstack/react-query';

interface AddGamePayload {
    name: string;
    igdbId?: number;
    coverUrl?: string;
}

function addGame(game: AddGamePayload) {
    return fetch('/api/games', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(game)
    });
}

export default function AddGame() {
    const queryClient = useQueryClient();
    const navigate = useNavigate();
    const [selectedGame, setSelectedGame] = useState<IgdbGame | null>(null);

    const mutation = useMutation({
        mutationFn: addGame,
        async onSuccess() {
            queryClient.invalidateQueries({ queryKey: ['games'] });
            navigate('/app');
        }
    });

    function handleSelect(game: IgdbGame) {
        setSelectedGame(game);
    }

    function handleSubmit(e: React.FormEvent) {
        e.preventDefault();
        if (!selectedGame) return;

        mutation.mutate({
            name: selectedGame.name,
            igdbId: selectedGame.id,
            coverUrl: selectedGame.coverUrl
        });
    }

    return (
        <div className={classes.container}>
            <title>Add Game | SaveSlot</title>

            <h1>Add a Game</h1>

            <GameSearch onSelect={handleSelect} selectedGame={selectedGame} />

            {/* <Section title="Add a Game" description="Search for a game to add to your collection.">
                <form className={classes.form} onSubmit={handleSubmit} noValidate>
                    <GameSearch onSelect={handleSelect} selectedGame={selectedGame} />
                    {selectedGame && (
                        <Text size="2" color="gray">
                            Selected: <strong>{selectedGame.name}</strong>
                        </Text>
                    )}
                    {mutation.isError && (
                        <Text size="2" color="red">
                            Failed to add game. Please try again.
                        </Text>
                    )}
                    <Button
                        type="submit"
                        size="3"
                        loading={mutation.isPending}
                        disabled={!selectedGame}
                    >
                        Add game
                    </Button>
                </form>
            </Section> */}
        </div>
    );
}
