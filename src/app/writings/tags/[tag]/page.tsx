import { getWritingsByTag } from "@/lib/mdx";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import Link from "next/link";
import { Badge } from "@/components/ui/badge";
import { notFound } from "next/navigation";

interface TagPageProps {
  params: Promise<{
    tag: string;
  }>;
}

export default async function TagPage({ params }: TagPageProps) {
  const tag = await params;
  const writings = getWritingsByTag(tag.tag);

  if (writings.length === 0) {
    notFound();
  }

  return (
    <div className="container mx-auto py-8">
      <div className="flex items-center gap-4 mb-8">
        <h1 className="text-4xl font-bold">Tag:</h1>
        <Badge variant="secondary" className="text-lg py-1">
          {tag.tag}
        </Badge>
      </div>
      <div className="grid gap-6">
        {writings.map((writing) => (
          <div key={writing.slug}>
            <Card className="hover:bg-muted/50 transition-colors">
              <Link href={`/writings/${writing.slug}`}>
                <CardHeader>
                  <CardTitle>{writing.title}</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-muted-foreground mb-4">{writing.summary}</p>
                </CardContent>
              </Link>
              <CardContent className="pt-0">
                <div className="flex gap-2 mb-4">
                  {writing.tags.map((tag) => (
                    <Link key={tag} href={`/writings/tags/${tag}`} className="no-underline">
                      <Badge variant="outline" className="hover:bg-secondary/20">
                        {tag}
                      </Badge>
                    </Link>
                  ))}
                </div>
                <p className="text-sm text-muted-foreground">
                  {new Date(writing.publishedAt).toLocaleDateString("en-US", {
                    year: "numeric",
                    month: "long",
                    day: "numeric",
                  })}
                </p>
              </CardContent>
            </Card>
          </div>
        ))}
      </div>
    </div>
  );
}
