'use server';

import { db } from '@/db';
import { counters } from '@/db/schema';
import { eq } from 'drizzle-orm';
import { sql } from 'drizzle-orm';

export async function getCounters(slug: string) {
  const result = await db.select().from(counters).where(eq(counters.slug, slug));
  return result[0] || { views: 0, likes: 0, loves: 0, awards: 0 };
}

export async function incrementViews(slug: string) {
  await db
    .insert(counters)
    .values({ slug, views: 1, likes: 0, loves: 0, awards: 0 })
    .onConflictDoUpdate({
      target: counters.slug,
      set: { views: sql`${counters.views} + 1` },
    });
}

export async function incrementCounter(slug: string, type: 'likes' | 'loves' | 'awards') {
  await db
    .insert(counters)
    .values({ slug, views: 0, likes: 0, loves: 0, awards: 0 })
    .onConflictDoUpdate({
      target: counters.slug,
      set: { [type]: sql`${counters[type]} + 1` },
    });
} 