import { TypeBoxTypeProvider } from '@fastify/type-provider-typebox';
import { eq } from 'drizzle-orm';
import { FastifyInstance } from 'fastify';
import { Static, Type } from 'typebox';
import { database } from '../database/database.js';
import { games } from '../database/schema.js';

const AddGameBody = Type.Object({
    name: Type.String(),
    igdbId: Type.Optional(Type.Integer()),
    coverUrl: Type.Optional(Type.String())
});
type AddGameBody = Static<typeof AddGameBody>;

export async function gameRoutes(fastify: FastifyInstance) {
    const app = fastify.withTypeProvider<TypeBoxTypeProvider>();

    app.get('/api/games', async (request, reply) => {
        const userGames = await database
            .select()
            .from(games)
            .where(eq(games.userId, request.session!.user.id));
        reply.send(userGames);
    });

    app.post('/api/games', {
        schema: {
            body: AddGameBody
        }
    }, async (request, reply) => {
        const game = request.body;

        await database.insert(games).values({
            name: game.name,
            igdbId: game.igdbId,
            coverUrl: game.coverUrl,
            userId: request.session!.user.id
        });

        reply.status(201).send({ message: 'Game added successfully' });
    });
}
