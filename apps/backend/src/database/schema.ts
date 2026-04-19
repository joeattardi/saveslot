import { users } from './auth-schema.js';
import { pgTable, text, uuid, timestamp, integer } from 'drizzle-orm/pg-core';

export const games = pgTable('games', {
    id: uuid('id').primaryKey().defaultRandom(),
    userId: text('user_id')
        .notNull()
        .references(() => users.id, { onDelete: 'cascade' }),
    name: text('name').notNull(),
    igdbId: integer('igdb_id'),
    coverUrl: text('cover_url'),
    createdAt: timestamp('created_at', { withTimezone: true }).defaultNow().notNull(),
    updatedAt: timestamp('updated_at', { withTimezone: true }).defaultNow().notNull(),
});
