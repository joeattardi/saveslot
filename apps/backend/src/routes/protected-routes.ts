import { fromNodeHeaders } from 'better-auth/node';
import { FastifyInstance, FastifyReply, FastifyRequest } from 'fastify';
import { auth } from '../auth/auth.js';
import { gameRoutes } from './game-routes.js';
import { igdbRoutes } from './igdb-routes.js';

async function getSession(request: FastifyRequest, reply: FastifyReply) {
    const session = await auth.api.getSession({
        headers: fromNodeHeaders(request.headers)
    });

    if (!session) {
        return reply.status(401).send({
            error: 'Unauthorized'
        });
    }

    request.session = session;
}

export async function protectedRoutes(fastify: FastifyInstance) {
    fastify.addHook('preHandler', getSession);

    fastify.register(gameRoutes);
    fastify.register(igdbRoutes);
}
