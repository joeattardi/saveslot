import Fastify from 'fastify';
import cors from '@fastify/cors';
import { authRoutes } from './routes/auth-routes.js';
import { userRoutes } from './routes/user-routes.js';

const HOST = process.env.HOST ?? '0.0.0.0';
const PORT = Number(process.env.PORT ?? 3000);

const app = Fastify({
    logger: true
});

app.register(cors, {
    origin: process.env.CLIENT_ORIGIN || 'http://localhost:5173',
    methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
    allowedHeaders: [
        'Content-Type',
        'Authorization',
        'X-Requested-With'
    ],
    credentials: true,
    maxAge: 86400
});

app.register(authRoutes);
app.register(userRoutes);

try {
    await app.listen({ host: HOST, port: PORT });
} catch (err) {
    app.log.error(err);
    process.exit(1);
}
