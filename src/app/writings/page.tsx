import { getAllWritings, getAllTags } from "@/lib/mdx";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import Link from "next/link";
import { Clock } from "lucide-react";

export default async function WritingsPage() {
  const writings = getAllWritings();
  const tags = getAllTags();

  return (
    <div className="container mx-auto py-8">
      <h1 className="text-4xl font-bold mb-8">Writings</h1>

      {/* Tags Section */}
      <div className="mb-12">
        <h2 className="text-2xl font-semibold mb-4">Browse by Tag</h2>
        <div className="flex flex-wrap gap-2">
          {tags.map((tag) => (
            <Link key={tag} href={`/writings/tags/${tag}`}>
              <Badge variant="secondary" className="hover:bg-secondary/80 cursor-pointer">
                {tag}
              </Badge>
            </Link>
          ))}
        </div>
      </div>

      {/* Writings List */}
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
                <div className="flex items-center gap-6 text-sm text-muted-foreground">
                  <p>
                    {new Date(writing.publishedAt).toLocaleDateString("en-US", {
                      year: "numeric",
                      month: "long",
                      day: "numeric",
                    })}
                  </p>
                  <div className="flex items-center gap-1">
                    <Clock className="h-4 w-4" />
                    <span>{writing.readingTime.text}</span>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        ))}
      </div>
    </div>
  );
}
