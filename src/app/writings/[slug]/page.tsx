import { getWritingBySlug } from "@/lib/mdx";
import { notFound } from "next/navigation";
import { Badge } from "@/components/ui/badge";
import { Clock, Calendar } from "lucide-react";
import Link from "next/link";

interface WritingPageProps {
  params: Promise<{
    slug: string;
  }>;
}

export default async function WritingPage({ params }: WritingPageProps) {
  const { meta, content } = await getWritingBySlug((await params).slug).catch(() => notFound());

  return (
    <article className="container mx-auto py-12 max-w-4xl">
      <header className="mb-16">
        <h1 className="text-5xl font-bold mb-8 bg-gradient-to-r from-orange-500 to-red-600 bg-clip-text text-transparent">
          {meta.title}
        </h1>
        
        <div className="flex flex-wrap items-center gap-6 text-muted-foreground text-sm">
          <div className="flex items-center gap-2">
            <Calendar className="h-4 w-4" />
            <time dateTime={meta.publishedAt}>
              {new Date(meta.publishedAt).toLocaleDateString("en-US", {
                year: "numeric",
                month: "long",
                day: "numeric",
              })}
            </time>
          </div>

          <div className="flex items-center gap-2">
            <Clock className="h-4 w-4" />
            <span>{meta.readingTime.text}</span>
          </div>

          <div className="flex items-center gap-2">
            {meta.tags.map((tag) => (
              <Link key={tag} href={`/writings/tags/${tag}`}>
                <Badge variant="secondary" className="hover:bg-secondary/80">
                  {tag}
                </Badge>
              </Link>
            ))}
          </div>
        </div>
      </header>

      <div className="prose dark:prose-invert max-w-none prose-lg prose-headings:scroll-mt-20">
        {content}
      </div>
    </article>
  );
}
