'use client';

import { Skeleton } from '@/components/ui/skeleton';
import { useEffect, useState } from 'react';

interface UrlMetadata {
  title?: string;
  description?: string;
  image?: string;
  url: string;
}

export function UrlPreview({ url }: { url: string }) {
  const [metadata, setMetadata] = useState<UrlMetadata | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);

  useEffect(() => {
    async function fetchMetadata() {
      try {
        const res = await fetch(`/api/metadata?url=${encodeURIComponent(url)}`);
        if (!res.ok) throw new Error('Failed to fetch metadata');
        const data = await res.json();
        setMetadata(data);
      } catch (e) {
        console.error('Error fetching metadata:', e);
        setError(true);
      } finally {
        setLoading(false);
      }
    }

    fetchMetadata();
  }, [url]);

  if (loading) {
    return (
      <div className="space-y-3">
        <div className="flex gap-4">
          <Skeleton className="h-16 w-16 flex-shrink-0" />
          <div className="flex-1 space-y-2">
            <Skeleton className="h-4 w-[250px]" />
            <Skeleton className="h-4 w-[200px]" />
          </div>
        </div>
      </div>
    );
  }

  if (error || !metadata) {
    return (
      <a
        href={url}
        target="_blank"
        rel="noopener noreferrer"
        className="block text-sm text-muted-foreground hover:underline"
      >
        {url}
      </a>
    );
  }

  return (
    <a
      href={metadata.url}
      target="_blank"
      rel="noopener noreferrer"
      className="group block overflow-hidden rounded-lg border bg-card transition-colors hover:bg-accent/5"
    >
      <div className="flex gap-4 p-4">
        {metadata.image && (
          <div className="h-16 w-16 flex-shrink-0 overflow-hidden rounded-lg">
            <img
              src={metadata.image}
              alt=""
              className="h-full w-full object-cover"
            />
          </div>
        )}
        <div className="flex-1 space-y-1">
          <p className="font-medium group-hover:text-accent-foreground">
            {metadata.title || new URL(metadata.url).hostname}
          </p>
          {metadata.description && (
            <p className="line-clamp-2 text-sm text-muted-foreground">
              {metadata.description}
            </p>
          )}
          <p className="text-xs text-muted-foreground">
            {new URL(metadata.url).hostname}
          </p>
        </div>
      </div>
    </a>
  );
}
