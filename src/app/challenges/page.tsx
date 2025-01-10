import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { challenges } from './lib/challenges';
import { ArrowLeft } from 'lucide-react';
import Link from 'next/link';

const difficultyColors = {
  easy: 'bg-green-500',
  intermediate: 'bg-yellow-500',
  difficult: 'bg-red-500',
};

export default function ChallengesPage() {
  return (
    <div className="px-4 py-8 md:px-8 md:py-12">
      <div className="container mx-auto mb-16 max-w-4xl">
        <div className="mb-8 flex items-center gap-4">
          <Button variant="outline" asChild>
            <Link
              href="/"
              className="flex items-center gap-2 text-muted-foreground transition-colors hover:text-foreground"
            >
              <ArrowLeft className="h-4 w-4" />
              <span>Back</span>
            </Link>
          </Button>
        </div>
        <h1 className="mb-4 text-3xl font-bold md:text-4xl">
          Daily CSS Challenges
        </h1>
        <p className="text-lg text-muted-foreground">
          These are collection of fun design challenges, that I found and try to
          recreate. When I can, I try to do them using tailwind.
        </p>
      </div>

      <div className="mx-auto grid max-w-7xl grid-cols-1 gap-6 md:grid-cols-3">
        {challenges.map((challenge) => (
          <Link key={challenge.id} href={`/challenges/${challenge.id}`}>
            <Card className="h-full transition-all hover:scale-[1.02]">
              <CardHeader className="mb-8 p-0">
                <div className="flex h-72 items-center justify-center overflow-hidden rounded-lg border bg-muted/50 p-4">
                  <div
                    dangerouslySetInnerHTML={{ __html: challenge.previewCode }}
                  />
                </div>
              </CardHeader>
              <CardContent>
                <div className="mb-2 flex flex-wrap items-center gap-2">
                  <CardTitle>{challenge.title}</CardTitle>
                  <div className="mb-4">
                    <p className="text-sm text-muted-foreground">
                      {challenge.description}
                    </p>
                  </div>
                  <Badge
                    variant="secondary"
                    className={difficultyColors[challenge.difficulty]}
                  >
                    {challenge.difficulty}
                  </Badge>
                  {challenge.tags.map((tag) => (
                    <Badge key={tag} variant="outline">
                      {tag}
                    </Badge>
                  ))}
                </div>
              </CardContent>
            </Card>
          </Link>
        ))}
      </div>
    </div>
  );
}
