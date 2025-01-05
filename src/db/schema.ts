import { pgTable, varchar, integer } from 'drizzle-orm/pg-core';

export const counters = pgTable('counters', {
  slug: varchar('slug', { length: 255 }).notNull().primaryKey(),
  views: integer('views').notNull().default(0),
  likes: integer('likes').notNull().default(0),
  loves: integer('loves').notNull().default(0),
  awards: integer('awards').notNull().default(0),
}); 