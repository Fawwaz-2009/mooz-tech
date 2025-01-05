import { getWritingBySlug, getAllWritings } from "@/lib/mdx";
import { notFound } from "next/navigation";
import Link from "next/link";
import { ArrowLeft } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import Image from "next/image";

interface WritingPageProps {
  params: {
    slug: string;
  };
}

export default async function WritingPage({ params }: WritingPageProps) {
  const { meta, content } = await getWritingBySlug(params.slug).catch(() => notFound());
  
  // Get related posts (same tag)
  const allWritings = getAllWritings();
  const relatedWritings = allWritings
    .filter(w => 
      w.slug !== params.slug && // Not the current post
      w.tags.some(t => meta.tags.includes(t)) // Has at least one tag in common
    )
    .slice(0, 3); // Limit to 3 related posts

  return (
    <article className="container max-w-4xl mx-auto px-4 md:px-8 py-8 md:py-12">
      {/* Navigation */}
      <div className="mb-16">
        <div className="flex items-center gap-4 mb-8">
          <Link 
            href="/writings"
            className="flex items-center gap-2 text-muted-foreground hover:text-foreground transition-colors"
          >
            <ArrowLeft className="h-4 w-4" />
            <span>Back to writings</span>
          </Link>
        </div>
      </div>

      {/* Article Header */}
      <header className="mb-16">
        <h1 className="text-4xl md:text-5xl font-bold mb-8 bg-gradient-to-r from-orange-500 to-red-600 bg-clip-text text-transparent">
          {meta.title}
        </h1>
        
        <div className="flex flex-wrap items-center gap-6 text-sm text-muted-foreground mb-8">
          <time dateTime={meta.publishedAt}>
            {new Date(meta.publishedAt).toLocaleDateString("en-US", {
              year: "numeric",
              month: "long",
              day: "numeric",
            })}
          </time>
          <span>·</span>
          <span>{meta.readingTime.text}</span>
          <div className="flex flex-wrap gap-2">
            {meta.tags.map((tag) => (
              <Link key={tag} href={`/writings/tags/${tag}`}>
                <Badge variant="secondary" className="hover:bg-secondary/80">
                  {tag}
                </Badge>
              </Link>
            ))}
          </div>
        </div>

        {meta.coverImage && (
          <div className="mb-8">
            <Image
              src={meta.coverImage}
              alt={`Cover Image for ${meta.title}`}
              className="rounded-lg shadow-sm"
              width={1300}
              height={630}
              priority
            />
          </div>
        )}
      </header>

      {/* Article Content */}
      <div 
        className="prose dark:prose-invert max-w-none"
        dangerouslySetInnerHTML={{ __html: content }} 
      />

      {/* Related Posts */}
      {relatedWritings.length > 0 && (
        <aside className="mt-16 pt-16 border-t">
          <h2 className="text-2xl font-bold mb-8">Related Writings</h2>
          <div className="grid gap-8">
            {relatedWritings.map(writing => (
              <Link 
                key={writing.slug} 
                href={`/writings/${writing.slug}`}
                className="block group"
              >
                <article className="grid md:grid-cols-4 gap-4">
                  {writing.coverImage && (
                    <div className="md:col-span-1">
                      <Image
                        src={writing.coverImage}
                        alt={writing.title}
                        width={200}
                        height={112}
                        className="rounded-lg object-cover aspect-video"
                      />
                    </div>
                  )}
                  <div className={writing.coverImage ? "md:col-span-3" : "md:col-span-4"}>
                    <h3 className="text-lg font-semibold group-hover:text-primary transition-colors">
                      {writing.title}
                    </h3>
                    <p className="text-sm text-muted-foreground mt-1">
                      {writing.summary}
                    </p>
                  </div>
                </article>
              </Link>
            ))}
          </div>
        </aside>
      )}
    </article>
  );
}
