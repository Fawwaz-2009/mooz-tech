import { getWritingBySlug } from "@/lib/mdx";
import { notFound } from "next/navigation";
import { Badge } from "@/components/ui/badge";
import { Clock } from "lucide-react";
import Link from "next/link";

interface WritingPageProps {
  params: Promise<{
    slug: string;
  }>;
}

export default async function WritingPage({ params }: WritingPageProps) {
  const { meta, content } = await getWritingBySlug((await params).slug).catch(() => notFound());

  return (
    <article className="container mx-auto py-8 max-w-3xl">
      <header className="mb-8">
        <h1 className="text-4xl font-bold mb-2">{meta.title}</h1>
        <div className="flex gap-2 mb-4">
          {meta.tags.map((tag) => (
            <Link key={tag} href={`/writings/tags/${tag}`}>
              <Badge variant="outline" className="hover:bg-secondary/20">
                {tag}
              </Badge>
            </Link>
          ))}
        </div>
        <div className="flex items-center gap-4 text-muted-foreground">
          <p>
            {new Date(meta.publishedAt).toLocaleDateString("en-US", {
              year: "numeric",
              month: "long",
              day: "numeric",
            })}
          </p>
          <div className="flex items-center gap-1">
            <Clock className="h-4 w-4" />
            <span>{meta.readingTime.text}</span>
          </div>
        </div>
      </header>
      <div className="prose dark:prose-invert max-w-none">{content}</div>
    </article>
  );
}
