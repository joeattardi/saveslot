import { TextField, Spinner } from '@radix-ui/themes';
import { GameController, MagnifyingGlass } from 'phosphor-react';
import { useState, useRef, useEffect } from 'react';
import { useQuery } from '@tanstack/react-query';
import type { IgdbGame } from '../../types/igdb';
import classes from './GameSearch.module.css';

interface GameSearchProps {
    onSelect: (game: IgdbGame) => void;
    selectedGame?: IgdbGame | null;
}

async function searchIgdbGames(query: string): Promise<IgdbGame[]> {
    const response = await fetch(`/api/igdb/games/search?query=${encodeURIComponent(query)}`);
    if (!response.ok) {
        throw new Error('Failed to search games');
    }
    return response.json();
}

export default function GameSearch({ onSelect, selectedGame }: GameSearchProps) {
    const [inputValue, setInputValue] = useState('');
    const [searchQuery, setSearchQuery] = useState('');
    const debounceRef = useRef<ReturnType<typeof setTimeout> | null>(null);

    useEffect(() => {
        return () => {
            if (debounceRef.current) {
                clearTimeout(debounceRef.current);
            }
        };
    }, []);

    const { data: results, isFetching } = useQuery({
        queryKey: ['igdb-search', searchQuery],
        queryFn: () => searchIgdbGames(searchQuery),
        enabled: searchQuery.length >= 2,
        staleTime: 60_000
    });

    function handleInputChange(e: React.ChangeEvent<HTMLInputElement>) {
        const value = e.target.value;
        setInputValue(value);

        if (debounceRef.current) {
            clearTimeout(debounceRef.current);
        }

        debounceRef.current = setTimeout(() => {
            setSearchQuery(value.trim());
        }, 400);
    }

    const showResults = searchQuery.length >= 2;

    return (
        <div className={classes.searchContainer}>
            <TextField.Root
                placeholder="Search for a game..."
                value={inputValue}
                onChange={handleInputChange}
                autoFocus
            >
                <TextField.Slot>
                    {isFetching ? <Spinner size="1" /> : <MagnifyingGlass size={16} />}
                </TextField.Slot>
            </TextField.Root>

            {showResults && (
                <ul className={classes.searchResults}>
                    {results && results.length === 0 && (
                        <li className={classes.noResults}>No games found</li>
                    )}
                    {results && results.map(game => (
                        <li key={game.id}>
                            <button
                                type="button"
                                className={`${classes.resultItem}${selectedGame?.id === game.id ? ` ${classes.selected}` : ''}`}
                                onClick={() => onSelect(game)}
                            >
                                {game.coverUrl ? (
                                    <img
                                        src={game.coverUrl}
                                        alt={`${game.name} cover`}
                                        className={classes.coverThumbnail}
                                    />
                                ) : (
                                    <div className={classes.coverPlaceholder}>
                                        <GameController size={20} />
                                    </div>
                                )}
                                <span className={classes.resultName}>{game.name}</span>
                            </button>
                        </li>
                    ))}
                </ul>
            )}
        </div>
    );
}
