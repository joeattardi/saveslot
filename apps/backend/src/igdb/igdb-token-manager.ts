interface TokenData {
    accessToken: string;
    expiresAt: number;
}

let tokenData: TokenData | null = null;

export async function getIgdbAccessToken(): Promise<string> {
    if (tokenData && Date.now() < tokenData.expiresAt) {
        return tokenData.accessToken;
    }

    const clientId = process.env.IGDB_CLIENT_ID;
    const clientSecret = process.env.IGDB_CLIENT_SECRET;

    if (!clientId || !clientSecret) {
        throw new Error('IGDB_CLIENT_ID and IGDB_CLIENT_SECRET environment variables must be set');
    }

    const url = new URL('https://id.twitch.tv/oauth2/token');
    url.searchParams.set('client_id', clientId);
    url.searchParams.set('client_secret', clientSecret);
    url.searchParams.set('grant_type', 'client_credentials');

    const response = await fetch(url.toString(), { method: 'POST' });

    if (!response.ok) {
        throw new Error(`Failed to fetch IGDB access token: ${response.status} ${response.statusText}`);
    }

    const data = await response.json() as { access_token: string; expires_in: number };

    // Subtract 60 seconds from expiry to refresh slightly before it expires
    tokenData = {
        accessToken: data.access_token,
        expiresAt: Date.now() + (data.expires_in - 60) * 1000
    };

    return tokenData.accessToken;
}
