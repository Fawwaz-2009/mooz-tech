import { getAllWritings } from '@/lib/mdx';
import { WritingsHeader } from '@/components/writing/writings-header';
import { WritingCard } from '@/components/writing/writing-card';
import { CalendarDays, Sparkles } from 'lucide-react';

function groupWritingsByYear(writings: ReturnType<typeof getAllWritings>) {
  const groups = writings.reduce(
    (acc, writing) => {
      const year = new Date(writing.publishedAt).getFullYear();
      if (!acc[year]) {
        acc[year] = [];
      }
      acc[year].push(writing);
      return acc;
    },
    {} as Record<number, typeof writings>
  );

  return Object.entries(groups)
    .sort(([a], [b]) => Number(b) - Number(a))
    .map(([year, posts]) => ({
      year: Number(year),
      posts,
    }));
}

export default function WritingsPage() {
  const writings = getAllWritings();
  const writingsByYear = groupWritingsByYear(writings);
  // const hasWritings = writings.length > 0;
  const hasWritings = false;

  return (
    <div className="container mx-auto max-w-4xl px-4 py-8 md:px-8 md:py-12">
      <WritingsHeader />

      {hasWritings ? (
        <div className="divide-y divide-border">
          {writingsByYear.map(({ year, posts }) => (
            <section key={year} className="py-8 first:pt-0">
              <h2 className="mb-8 text-2xl font-bold">{year}</h2>
              <div>
                {posts.map((writing) => (
                  <WritingCard key={writing.slug} writing={writing} />
                ))}
              </div>
            </section>
          ))}
        </div>
      ) : (
        <div className="mt-12 flex flex-col items-center justify-center text-center">
          <div className="relative mb-8">
            <div className="absolute -right-4 -top-4">
              <Sparkles className="h-8 w-8 text-yellow-400" />
            </div>
            <CalendarDays className="h-24 w-24 text-gray-400" />
          </div>
          <h2 className="mb-4 text-3xl font-bold">
            New Year, New Stories Coming Soon
          </h2>
          <p className="max-w-lg text-xl text-gray-600">
            {` I'm crafting some exciting articles about building minimalist but mighty products. 
            Stay tuned for insights on design, development, and creating lovable apps.`}
          </p>
          <div className="mt-8 inline-flex items-center gap-2 rounded-lg bg-yellow-100 p-4 text-yellow-800">
            <Sparkles className="h-5 w-5" />
            <span>First articles dropping in 2025</span>
          </div>
        </div>
      )}
    </div>
  );
}
