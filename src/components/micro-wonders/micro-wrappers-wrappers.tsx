import Link from 'next/link';
import { ArrowLeft, ChevronLeft, ChevronRight, Clock } from 'lucide-react';
import { Card } from '../ui/card';
import { Button } from '../ui/button';
import { MicroWonder } from '@/lib/mdx';
import { Badge } from '../ui/badge';

const difficultyColors = {
  easy: 'bg-green-500',
  medium: 'bg-yellow-500',
  hard: 'bg-red-500',
};

export const MicroWrappersWrappers = ({
  children,
  metadata,
  previousMicroWonderUrl,
  nextMicroWonderUrl,
}: {
  children: React.ReactNode;
  metadata: MicroWonder;
  previousMicroWonderUrl?: string;
  nextMicroWonderUrl?: string;
}) => {
  const { title, difficulty } = metadata;
  return (
    <div className="mx-auto max-w-4xl px-4 pt-20">
      <div className="flex items-center justify-between py-4">
        <Button className="flex w-fit items-center gap-4" asChild variant="outline">
          <Link href="/micro-wonders" className="flex items-center gap-2 text-muted-foreground transition-colors hover:text-foreground">
            <ArrowLeft className="h-4 w-4" />
            <span>Back to micro wonders</span>
          </Link>
        </Button>
        <div className="flex items-center justify-between gap-2">
          <Button variant="outline" size={'icon'} disabled={!previousMicroWonderUrl} asChild={!!previousMicroWonderUrl}>
            {previousMicroWonderUrl ? (
              <Link href={previousMicroWonderUrl ? `/micro-wonders/${previousMicroWonderUrl}` : '#'} className="flex items-center gap-2">
                <ChevronLeft className="h-4 w-4" />
              </Link>
            ) : (
              <ChevronLeft className="h-4 w-4" />
            )}
          </Button>
          <Button variant="outline" size={'icon'} disabled={!nextMicroWonderUrl} asChild={!!nextMicroWonderUrl}>
            {nextMicroWonderUrl ? (
              <Link href={nextMicroWonderUrl ? `/micro-wonders/${nextMicroWonderUrl}` : '#'} className="flex items-center gap-2">
                <ChevronRight className="h-4 w-4" />
              </Link>
            ) : (
              <ChevronRight className="h-4 w-4" />
            )}
          </Button>
        </div>
      </div>

      <div className="flex items-center justify-between gap-2 py-4">
        <h1 className="text-3xl font-bold">{title}</h1>
        <Badge variant="secondary" className={difficultyColors[difficulty]}>
          {difficulty}
        </Badge>
      </div>

      <Card className="h-96">{children}</Card>
    </div>
  );
};
