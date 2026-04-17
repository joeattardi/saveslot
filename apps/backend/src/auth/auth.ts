import { betterAuth } from 'better-auth';
import { drizzleAdapter } from 'better-auth/adapters/drizzle';
import { database } from '../database/database.js';
import { admin, username } from 'better-auth/plugins';
import * as authSchema from '../database/auth-schema.js';

export const auth = betterAuth({
    database: drizzleAdapter(database, {
        provider: 'pg',
        schema: authSchema,
        usePlural: true
    }),
    plugins: [username(), admin()],
    emailAndPassword: {
        enabled: true
    },
    trustedOrigins: [process.env.CLIENT_ORIGIN || 'http://localhost:5173']
});
