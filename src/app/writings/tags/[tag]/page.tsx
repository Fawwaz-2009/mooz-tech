import { getWritingsByTag, getAllTags } from "@/lib/mdx";
import { WritingCard } from "@/components/writing/writing-card";
import Link from "next/link";
import { ArrowLeft } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { notFound } from "next/navigation";

interface TagPageProps {
  params: Promise<{
    tag: string;
  }>;
}

export default async function TagPage({ params }: TagPageProps) {
    const { tag } = await params;
  const writings = getWritingsByTag(tag);
  const allTags = getAllTags();
  
  if (writings.length === 0) {
    notFound();
  }

  return (
    <div className="container max-w-4xl mx-auto px-4 md:px-8 py-8 md:py-12">
      {/* Navigation Header */}
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
        
        <div className="flex flex-col gap-4">
          <h1 className="text-3xl md:text-4xl font-bold">
            Posts tagged with &quot;{tag}&quot;
          </h1>
          
          {/* Tag Navigation */}
          <div className="flex flex-wrap gap-2">
            {allTags.map((tag) => (
              <Link key={tag} href={`/writings/tags/${tag}`}>
                <Badge 
                  variant={tag === tag ? "default" : "secondary"}
                  className="hover:bg-secondary/80"
                >
                  {tag}
                </Badge>
              </Link>
            ))}
          </div>
        </div>
      </div>

      {/* Writings List */}
      <div className="space-y-8">
        {writings.map((writing) => (
          <WritingCard key={writing.slug} writing={writing} />
        ))}
      </div>
    </div>
  );
}
