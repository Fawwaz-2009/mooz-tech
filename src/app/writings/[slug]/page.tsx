import { getWritingBySlug, getAllWritings } from "@/lib/mdx";
import { notFound } from "next/navigation";
import { WritingHeader } from "@/components/writing/writing-header";
import { WritingBody } from "@/components/writing/writing-body";
import { type Metadata } from "next";

interface WritingPageProps {
  params: Promise<{
    slug: string;
  }>;
}

export default async function WritingPage({ params }: WritingPageProps) {
  const { meta, content } = await getWritingBySlug((await params).slug).catch(() => notFound());

  return (
    <article className="container mx-auto px-4 md:px-8 py-8 md:py-12 max-w-4xl">
      <WritingHeader meta={meta} />
      <WritingBody content={content} />
    </article>
  );
}

export async function generateMetadata({ params }: WritingPageProps): Promise<Metadata> {
  const post = await getWritingBySlug((await params).slug).catch(() => notFound());

  if (!post) {
    return notFound();
  }

  const { meta } = post;
  const title = `${meta.title} | Mooz Tech`;
  const description = meta.summary;

  return {
    title,
    description,
    openGraph: {
      title,
      description,
      type: 'article',
      publishedTime: meta.publishedAt,
      images: meta.ogImage ? [meta.ogImage.url] : [],
    },
    twitter: {
      card: 'summary_large_image',
      title,
      description,
      images: meta.ogImage ? [meta.ogImage.url] : [],
    },
  };
}

export async function generateStaticParams() {
  const writings = getAllWritings();

  return writings.map((writing) => ({
    slug: writing.slug,
  }));
}
