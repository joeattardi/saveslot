import { auth } from '../auth/auth.js';
import { fromNodeHeaders } from 'better-auth/node';
import { FastifyInstance } from 'fastify';

export async function userRoutes(fastify: FastifyInstance) {
    fastify.get('/api/current-user', async (request, reply) => {
        const session = await auth.api.getSession({
            headers: fromNodeHeaders(request.headers)
        });

        if (!session) {
            return reply.status(401).send({
                error: 'Unauthorized'
            });
        }

        return reply.send(session);
    });
}
