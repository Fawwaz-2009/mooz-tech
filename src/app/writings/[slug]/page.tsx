import { getWritingBySlug } from "@/lib/mdx";
import { notFound } from "next/navigation";
import { Badge } from "@/components/ui/badge";
import Link from "next/link";

interface WritingPageProps {
  params:Promise<{
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
        <p className="text-muted-foreground">
          {new Date(meta.publishedAt).toLocaleDateString("en-US", {
            year: "numeric",
            month: "long",
            day: "numeric",
          })}
        </p>
      </header>
      <div className="prose dark:prose-invert max-w-none">{content}</div>
    </article>
  );
}
