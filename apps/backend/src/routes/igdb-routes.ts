import { TypeBoxTypeProvider } from '@fastify/type-provider-typebox';
import { FastifyInstance } from 'fastify';
import { Type } from 'typebox';
import { searchGames } from '../igdb/igdb-service.js';

const SearchQuerystring = Type.Object({
    query: Type.String({ minLength: 1 })
});

export async function igdbRoutes(fastify: FastifyInstance) {
    const app = fastify.withTypeProvider<TypeBoxTypeProvider>();

    app.get(
        '/api/igdb/games/search',
        {
            schema: {
                querystring: SearchQuerystring
            }
        },
        async (request, reply) => {
            const { query } = request.query;
            const games = await searchGames(query);
            return reply.send(games);
        }
    );
}
