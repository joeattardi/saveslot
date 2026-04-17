import { eq } from 'drizzle-orm';
import { auth } from './src/auth/auth.js';
import { users } from './src/database/auth-schema.js';
import { database } from './src/database/database.js';

await auth.api.signUpEmail({
    body: {
        email: 'jattardi@gmail.com',
        name: 'Joe Attardi',
        username: 'jattardi',
        password: 'password'
    }
});

await database.update(users)
    .set({ role: 'admin' })
    .where(eq(users.username, 'jattardi'));

console.log('Test user created and set as admin');
