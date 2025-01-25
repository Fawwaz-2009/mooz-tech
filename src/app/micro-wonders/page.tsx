import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { ArrowLeft } from 'lucide-react';
import Link from 'next/link';
import { getMicroWonders } from '@/lib/mdx';
import Preview from './preview';

const difficultyColors = {
  easy: 'bg-green-500',
  medium: 'bg-yellow-500',
  hard: 'bg-red-500',
};

export default async function ChallengesPage() {
  const microWonder = await getMicroWonders();
  return (
    <div className="px-4 py-8 md:px-8 md:py-12">
      <div className="container mx-auto mb-16 max-w-4xl">
        <div className="mb-8 flex items-center gap-4">
          <Button variant="outline" asChild>
            <Link href="/" className="flex items-center gap-2 text-muted-foreground transition-colors hover:text-foreground">
              <ArrowLeft className="h-4 w-4" />
              <span>Back</span>
            </Link>
          </Button>
        </div>
        <h1 className="mb-4 text-3xl font-bold md:text-4xl">Micro Wonders</h1>
        <p className="text-lg text-muted-foreground">Bite-sized coding projects around UI challenges and animations, implemented with modern tools like Tailwind CSS.</p>
      </div>

      <div className="mx-auto grid max-w-7xl grid-cols-1 gap-6 md:grid-cols-3">
        {microWonder.map((mw) => (
          <Link key={mw.slug} href={`/micro-wonders/${mw.slug}`}>
            <Card className="h-full transition-all hover:scale-[1.02]">
              <CardHeader className="mb-8 p-0">
                <div
                  className="flex h-72 items-center justify-center overflow-hidden rounded-lg border bg-muted/50 bg-slate-700 p-2"
                  style={{
                    backgroundImage: `linear-gradient(90deg, rgba(132, 132, 132, .2) 1px, transparent 0), linear-gradient(180deg, rgba(132, 132, 132, .2) 1px, transparent 0)`,
                    backgroundSize: '25px 25px',
                  }}
                >
                  <Preview slug={mw.slug} />
                </div>
              </CardHeader>
              <CardContent>
                <div className="mb-2 flex flex-wrap items-center gap-2">
                  <CardTitle>{mw.title}</CardTitle>
                  <div className="mb-4">
                    <p className="text-sm text-muted-foreground">{mw.summary}</p>
                  </div>
                  <Badge variant="secondary" className={difficultyColors[mw.difficulty]}>
                    {mw.difficulty}
                  </Badge>
                  {mw.tags.map((tag) => (
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
