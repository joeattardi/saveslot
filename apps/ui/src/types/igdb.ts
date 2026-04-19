export interface IgdbGame {
    id: number;
    name: string;
    publisher?: string;
    releaseDate?: number;
    rating: number;
    coverUrl?: string;
    platforms?: string[];
}
