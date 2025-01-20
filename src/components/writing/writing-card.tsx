import Link from "next/link";
import Image from "next/image";
import { Post } from "@/lib/mdx";

interface WritingCardProps {
  writing: Post;
}

export function WritingCard({ writing }: WritingCardProps) {
  return (
    <Link href={writing.url} className="group block relative rounded-lg -mx-4 md:-mx-6 px-4 md:px-6 py-6 transition-colors hover:bg-muted/50">
      <article className="grid md:grid-cols-5 gap-4 md:gap-8 items-start">
        {writing.coverImage && (
          <div className="md:col-span-2 overflow-hidden rounded-lg">
            <Image
              src={writing.coverImage}
              alt={writing.title}
              width={400}
              height={225}
              className="object-cover aspect-video transform group-hover:scale-105 transition-transform duration-500"
            />
          </div>
        )}
        <div className={writing.coverImage ? "md:col-span-3" : "md:col-span-5"}>
          <h2 className="text-xl md:text-2xl font-semibold group-hover:text-primary transition-colors mb-2">{writing.title}</h2>
          <p className="text-muted-foreground mb-4">{writing.summary}</p>
          <div className="flex items-center gap-2 text-sm text-muted-foreground">
            <time dateTime={writing.publishedAt}>
              {new Date(writing.publishedAt).toLocaleDateString("en-US", {
                year: "numeric",
                month: "long",
                day: "numeric",
              })}
            </time>
            <span>·</span>
            <span>{writing.readingTime.text}</span>
          </div>
        </div>
      </article>
    </Link>
  );
}
