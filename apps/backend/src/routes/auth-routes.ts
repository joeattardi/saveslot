import { fromNodeHeaders } from 'better-auth/node';
import { auth } from '../auth/auth.js';
import { FastifyInstance } from 'fastify';

export async function authRoutes(fastify: FastifyInstance) {
    fastify.route({
        method: ['GET', 'POST'],
        url: '/api/auth/*',
        async handler(request, reply) {
            try {
                const url = new URL(request.url, `http://${request.headers.host}`);
                const headers = fromNodeHeaders(request.headers);

                const authRequest = new Request(url.toString(), {
                    method: request.method,
                    headers,
                    ...(request.body ? { body: JSON.stringify(request.body) } : {})
                });

                const authResponse = await auth.handler(authRequest);

                reply.status(authResponse.status);
                authResponse.headers.forEach((value, key) => reply.header(key, value));
                reply.send(authResponse.body ? await authResponse.text() : null);
            } catch (error) {
                fastify.log.error({ err: error }, 'Authentication failed');
                reply.status(500).send({
                    error: 'Internal Server Error',
                    code: 'AUTH_FAILURE'
                });
            }
        }
    });
}
