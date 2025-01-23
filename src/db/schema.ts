import { sql } from 'drizzle-orm';
import {
  pgTable,
  varchar,
  integer,
  timestamp,
  uuid,
  primaryKey,
} from 'drizzle-orm/pg-core';

export const counters = pgTable('counters', {
  slug: varchar('slug', { length: 255 }).notNull().primaryKey(),
  views: integer('views').notNull().default(0),
  likes: integer('likes').notNull().default(0),
  loves: integer('loves').notNull().default(0),
  awards: integer('awards').notNull().default(0),
});

export const projects = pgTable('projects', {
  id: uuid('id')
    .default(sql`gen_random_uuid()`)
    .primaryKey()
    .notNull(),
  name: varchar('name', { length: 255 }).notNull(),
  createdAt: timestamp('createdAt')
    .notNull()
    .default(sql`now()`),
});

export const waitlist = pgTable(
  'waitlist',
  {
    id: uuid('id')
      .default(sql`gen_random_uuid()`)
      .primaryKey()
      .notNull(),
    email: varchar('email', { length: 255 }).notNull(),
    projectId: uuid('projectId').notNull(),
    discountPercentage: integer('discountPercentage').notNull().default(0),
    createdAt: timestamp('createdAt')
      .notNull()
      .default(sql`now()`),
  },
  (table) => [
    {
      pk: primaryKey({ columns: [table.email, table.projectId] }),
    },
  ]
);
