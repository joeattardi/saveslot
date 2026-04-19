import { Button, TextField } from '@radix-ui/themes';
import classes from './GameSearch.module.css';
import { ArrowRight, MagnifyingGlass } from 'phosphor-react';
import { Controller, useForm } from 'react-hook-form';
import { useQuery } from '@tanstack/react-query';
import type { IgdbGame } from '../../types/igdb';
import { useState } from 'react';
import GameSearchResult from './GameSearchResult';

async function searchIgdbGames(query: string): Promise<IgdbGame[]> {
    const response = await fetch(`/api/igdb/games/search?query=${encodeURIComponent(query)}`);
    if (!response.ok) {
        throw new Error('Failed to search games');
    }
    return response.json();
}

export default function GameSearch() {
    const { control, handleSubmit } = useForm({
        defaultValues: {
            searchQuery: ''
        }
    });

    const [submittedQuery, setSubmittedQuery] = useState('');

    const { data, isSuccess, isFetching } = useQuery({
        queryKey: ['igdb-search', submittedQuery],
        queryFn: () => searchIgdbGames(submittedQuery),
        enabled: submittedQuery.length > 0
    });

    function searchGames(data: { searchQuery: string }) {
        setSubmittedQuery(data.searchQuery.trim());
    }

    return (
        <div className={classes.gameSearch}>
            <div className={classes.searchContainer}>
                <form onSubmit={handleSubmit(searchGames)} noValidate>
                    <Controller
                        name="searchQuery"
                        control={control}
                        rules={{ required: 'Search query is required' }}
                        render={({ field }) => (
                            <TextField.Root {...field} size="3" placeholder="Search for games...">
                                <TextField.Slot>
                                    <MagnifyingGlass />
                                </TextField.Slot>
                                <TextField.Slot>
                                    <Button loading={isFetching} type="submit" size="1">
                                        <ArrowRight />
                                    </Button>
                                </TextField.Slot>
                            </TextField.Root>
                        )}
                    />
                </form>
            </div>
            <div className={classes.results}>
                {isSuccess && data?.map((game) => <GameSearchResult key={game.id} game={game} />)}
            </div>
        </div>
    );
}
