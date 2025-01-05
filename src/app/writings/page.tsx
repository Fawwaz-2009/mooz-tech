import { getAllWritings } from "@/lib/mdx";
import { WritingsHeader } from "@/components/writing/writings-header";
import { WritingCard } from "@/components/writing/writing-card";

function groupWritingsByYear(writings: ReturnType<typeof getAllWritings>) {
  const groups = writings.reduce((acc, writing) => {
    const year = new Date(writing.publishedAt).getFullYear();
    if (!acc[year]) {
      acc[year] = [];
    }
    acc[year].push(writing);
    return acc;
  }, {} as Record<number, typeof writings>);

  // Sort years in descending order
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

  return (
    <div className="container max-w-4xl mx-auto px-4 md:px-8 py-8 md:py-12">
      <WritingsHeader />

      <div className="divide-y divide-border">
        {writingsByYear.map(({ year, posts }) => (
          <section key={year} className="py-8 first:pt-0">
            <h2 className="text-2xl font-bold mb-8">{year}</h2>
            <div>
              {posts.map((writing) => (
                <WritingCard key={writing.slug} writing={writing} />
              ))}
            </div>
          </section>
        ))}
      </div>
    </div>
  );
}
