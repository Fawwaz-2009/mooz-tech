import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog';
import { challenges } from '../lib/challenges';
import { ArrowLeft, Lightbulb } from 'lucide-react';
import Link from 'next/link';
import { notFound } from 'next/navigation';

const difficultyColors = {
  easy: 'bg-green-500',
  intermediate: 'bg-yellow-500',
  difficult: 'bg-red-500',
};

interface Props {
  params: {
    id: string;
  };
}

export default function ChallengePage({ params }: Props) {
  const challenge = challenges.find((c) => c.id === params.id);

  if (!challenge) {
    notFound();
  }

  return (
    <div className="mx-auto max-w-5xl p-4">
      <div className="mb-8">
        <Link
          href="/challenges"
          className="mb-4 inline-flex items-center gap-2 text-muted-foreground hover:text-foreground"
        >
          <ArrowLeft className="h-4 w-4" />
          Back to challenges
        </Link>
        <div className="mb-2 flex items-center gap-2">
          <h1 className="text-4xl font-bold">{challenge.title}</h1>
          <Badge
            variant="secondary"
            className={difficultyColors[challenge.difficulty]}
          >
            {challenge.difficulty}
          </Badge>
        </div>
        <div className="flex gap-2">
          {challenge.tags.map((tag) => (
            <Badge key={tag} variant="outline">
              {tag}
            </Badge>
          ))}
        </div>
      </div>

      <div className="grid gap-6 lg:grid-cols-2">
        <div className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>Description</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-muted-foreground">{challenge.description}</p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Starter Code</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div>
                  <h3 className="mb-2 font-semibold">HTML</h3>
                  <pre className="overflow-auto rounded-lg bg-muted p-4">
                    <code>{challenge.starterCode.html}</code>
                  </pre>
                </div>
                <div>
                  <h3 className="mb-2 font-semibold">CSS</h3>
                  <pre className="overflow-auto rounded-lg bg-muted p-4">
                    <code>{challenge.starterCode.css}</code>
                  </pre>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Lightbulb className="h-5 w-5" />
                Hints
              </CardTitle>
            </CardHeader>
            <CardContent>
              <ul className="list-inside list-disc space-y-2 text-muted-foreground">
                {challenge.hints.map((hint, index) => (
                  <li key={index}>{hint}</li>
                ))}
              </ul>
            </CardContent>
          </Card>

          <Dialog>
            <DialogTrigger asChild>
              <Button className="w-full">View Solution</Button>
            </DialogTrigger>
            <DialogContent className="max-h-[80vh] overflow-y-auto sm:max-w-2xl">
              <DialogHeader>
                <DialogTitle>Solution</DialogTitle>
              </DialogHeader>
              <div className="space-y-4">
                <div>
                  <h3 className="mb-2 font-semibold">HTML</h3>
                  <pre className="overflow-auto rounded-lg bg-muted p-4">
                    <code>{challenge.solution.html}</code>
                  </pre>
                </div>
                <div>
                  <h3 className="mb-2 font-semibold">CSS</h3>
                  <pre className="overflow-auto rounded-lg bg-muted p-4">
                    <code>{challenge.solution.css}</code>
                  </pre>
                </div>
              </div>
            </DialogContent>
          </Dialog>
        </div>

        <div>
          <Card>
            <CardHeader>
              <CardTitle>Preview</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="flex min-h-80 items-center justify-center overflow-hidden rounded-lg border bg-muted/50 p-4">
                <div
                  dangerouslySetInnerHTML={{ __html: challenge.previewCode }}
                />
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}
