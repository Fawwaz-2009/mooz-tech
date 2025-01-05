import Image from 'next/image';
import Link from 'next/link';
import { Badge } from '@/components/ui/badge';
import { Clock } from 'lucide-react';
import { type WritingMeta } from '@/lib/mdx';

interface WritingHeaderProps {
  meta: WritingMeta;
}

export function WritingHeader({ meta }: WritingHeaderProps) {
  return (
    <header className="mb-8 md:mb-16">
      <h1 className="text-3xl md:text-5xl font-bold mb-6 md:mb-8 bg-gradient-to-r from-orange-500 to-red-600 bg-clip-text text-transparent leading-tight">
        {meta.title}
      </h1>

      <div className="flex flex-col md:flex-row md:items-center gap-4 md:gap-6 text-sm text-muted-foreground mb-6 md:mb-8">
        <div className="flex items-center gap-4">
          <time dateTime={meta.publishedAt}>
            {new Date(meta.publishedAt).toLocaleDateString("en-US", {
              year: "numeric",
              month: "long",
              day: "numeric",
            })}
          </time>
          <span>·</span>
          <div className="flex items-center gap-1">
            <Clock className="h-4 w-4" />
            <span>{meta.readingTime.text}</span>
          </div>
        </div>

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
        <div className="-mx-4 md:mx-0 mb-6 md:mb-8">
          <Image
            src={meta.coverImage}
            alt={`Cover Image for ${meta.title}`}
            className="md:rounded-lg shadow-sm"
            width={1300}
            height={630}
            priority
          />
        </div>
      )}
    </header>
  );
} 