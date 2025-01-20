import { notFound } from 'next/navigation';
import Link from 'next/link';
import { ArrowLeft, Clock } from 'lucide-react';
import { Badge } from '@/components/ui/badge';
import Image from 'next/image';
import { WritingInteractions } from '@/components/writing/writing-interactions';
import { getCounters, incrementViews } from '@/app/writings/actions';
import { Button } from '@/components/ui/button';
import { contentDirectory, getPosts } from '@/lib/mdx';


export default async function WritingPage({children, slug}: {children: React.ReactNode, slug: string}) {
  const posts = await getPosts(contentDirectory);
  const post = posts.find((post) => post.url.includes(slug));
  if (!post) {
    notFound();
  }
  const meta = post;

  // Increment view count and get counters
  await incrementViews(slug);
  const counters = await getCounters(slug);

  // Get related posts (same tag)
  //   const allWritings = getAllWritings();
  //   const relatedWritings = allWritings
  //     .filter(
  //       (w) =>
  //         w.slug !== slug && // Not the current post
  //         w.tags.some((t) => meta.tags.includes(t)) // Has at least one tag in common
  //     )
  //     .slice(0, 3); // Limit to 3 related posts

  return (
    <article className="container mx-auto max-w-3xl px-4 py-8 md:px-8 md:py-12">
      {/* Navigation */}
      <div className="mb-16">
        <div className="mb-8 flex items-center gap-4">
          <Link
            href="/writings"
            className="flex items-center gap-2 text-muted-foreground transition-colors hover:text-foreground"
          >
            <ArrowLeft className="h-4 w-4" />
            <span>Back to writings</span>
          </Link>
        </div>
      </div>

      {/* Article Header */}
      <header className="mb-16">
        <h1 className="text-heading-dark mb-8 flex items-center justify-center rounded text-4xl font-bold transition-colors [text-shadow:0.125rem_0.125rem_0_#fce1a8] dark:text-purple-300 dark:[text-shadow:none]">
          {meta.title}
        </h1>

        <div className="mb-8 flex flex-wrap items-center gap-6 text-sm text-muted-foreground">
          <time dateTime={meta.publishedAt}>
            {new Date(meta.publishedAt).toLocaleDateString('en-US', {
              year: 'numeric',
              month: 'long',
              day: 'numeric',
            })}
          </time>
          <span>·</span>
          <div className="flex items-center gap-1">
            <Clock className="h-4 w-4" />
            <span>{meta.readingTime.text}</span>
          </div>
          <span>·</span>
          <span>{counters.views} views</span>
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
      {children}

      {/* Interactions */}
      <WritingInteractions
        slug={slug}
        title={meta.title}
        initialCounts={{
          likes: counters.likes,
          loves: counters.loves,
          awards: counters.awards,
        }}
      />

      {/* Related Posts */}
      {/* {relatedWritings.length > 0 && (
        <aside className="mt-16 pt-16 border-t">
          <h2 className="text-2xl font-bold mb-8">Related Writings</h2>
          <div className="grid gap-8">
            {relatedWritings.map((writing) => (
              <Link key={writing.slug} href={`/writings/${writing.slug}`} className="block group">
                <article className="grid md:grid-cols-4 gap-4">
                  {writing.coverImage && (
                    <div className="md:col-span-1">
                      <Image src={writing.coverImage} alt={writing.title} width={200} height={112} className="rounded-lg object-cover aspect-video" />
                    </div>
                  )}
                  <div className={writing.coverImage ? "md:col-span-3" : "md:col-span-4"}>
                    <h3 className="text-lg font-semibold group-hover:text-primary transition-colors">{writing.title}</h3>
                    <p className="text-sm text-muted-foreground mt-1">{writing.summary}</p>
                  </div>
                </article>
              </Link>
            ))}
          </div>
        </aside>
      )} */}

      <div className="space-y-4">
        <p>If you enjoyed reading this, checkout my other writings:</p>
        <Button variant="outline" asChild>
          <Link href="/writings">
            <ArrowLeft className="mr-2 h-4 w-4" />
            all writings
          </Link>
        </Button>
      </div>
    </article>
  );
}
