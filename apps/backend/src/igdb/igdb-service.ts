import { getIgdbAccessToken } from './igdb-token-manager.js';

const IGDB_API_URL = 'https://api.igdb.com/v4';

export interface IgdbGame {
    id: number;
    name: string;
    coverUrl?: string;
}

interface IgdbApiGame {
    id: number;
    name: string;
    cover?: {
        image_id: string;
    };
}

export async function searchGames(query: string, limit = 10): Promise<IgdbGame[]> {
    const accessToken = await getIgdbAccessToken();
    const clientId = process.env.IGDB_CLIENT_ID!;

    const body = `fields name,cover.image_id; search "${query.replace(/\\/g, '\\\\').replace(/"/g, '\\"')}"; limit ${limit};`;

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
        coverUrl: game.cover
            ? `https://images.igdb.com/igdb/image/upload/t_cover_big/${game.cover.image_id}.jpg`
            : undefined
    }));
}
