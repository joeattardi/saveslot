import { getIgdbAccessToken } from './igdb-token-manager.js';

const IGDB_API_URL = 'https://api.igdb.com/v4';

export interface IgdbGame {
    id: number;
    name: string;
    rating: number;
    coverUrl?: string;
    releaseDate?: number;
    publisher?: string;
    platforms: string[];
}

interface IgdbApiGame {
    id: number;
    name: string;
    total_rating: number;
    platforms?: {
        abbreviation: string;
    }[];
    cover?: {
        image_id: string;
    };
    involved_companies?: {
        publisher: boolean;
        company: {
            name: string;
        };
    }[];

    first_release_date?: number;
}

const gameSearchFields = [
    'name',
    'cover.image_id',
    'first_release_date',
    'involved_companies.publisher',
    'involved_companies.company.name',
    'platforms.abbreviation',
    'total_rating'
];

export async function searchGames(query: string, limit = 10): Promise<IgdbGame[]> {
    const accessToken = await getIgdbAccessToken();
    const clientId = process.env.IGDB_CLIENT_ID!;

    const body = `fields ${gameSearchFields.join(',')}; search "${query.replace(/\\/g, '\\\\').replace(/"/g, '\\"')}"; limit ${limit};`;

    const response = await fetch(`${IGDB_API_URL}/games`, {
        method: 'POST',
        headers: {
            'Client-ID': clientId,
            Authorization: `Bearer ${accessToken}`,
            'Content-Type': 'text/plain'
        },
        body
    });

    if (!response.ok) {
        throw new Error(`IGDB API request failed: ${response.status} ${response.statusText}`);
    }

    const games = (await response.json()) as IgdbApiGame[];

    return games.map((game) => ({
        id: game.id,
        name: game.name,
        releaseDate: game.first_release_date,
        publisher: game.involved_companies?.find((ic) => ic.publisher)?.company.name,
        platforms: game.platforms?.map((p) => p.abbreviation) || [],
        rating: game.total_rating,
        coverUrl: game.cover
            ? `https://images.igdb.com/igdb/image/upload/t_cover_big/${game.cover.image_id}.jpg`
            : undefined
    }));
}
