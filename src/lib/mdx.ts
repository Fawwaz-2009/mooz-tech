import { readFileSync, readdirSync } from 'fs';
import path from 'path';
import matter from 'gray-matter';
import readingTime from 'reading-time';
import { remark } from 'remark';
import html from 'remark-html';
import remarkGfm from 'remark-gfm';

export type WritingMeta = {
  title: string;
  publishedAt: string;
  summary: string;
  slug: string;
  tags: string[];
  status: 'draft' | 'published';
  coverImage?: string;
  ogImage?: {
    url: string;
  };
  readingTime: {
    text: string;
    minutes: number;
    time: number;
    words: number;
  };
};

const writingsDirectory = path.join(process.cwd(), 'content');

async function markdownToHtml(markdown: string) {
  const result = await remark()
    .use(html, { sanitize: false })
    .use(remarkGfm)
    .process(markdown);
  return result.toString();
}

export async function getWritingBySlug(slug: string) {
  const filePath = path.join(writingsDirectory, `${slug}.mdx`);
  const fileContent = readFileSync(filePath, 'utf8');

  const { data: frontMatter, content } = matter(fileContent);
  const stats = readingTime(content);
  const htmlContent = await markdownToHtml(content);

  return {
    meta: {
      ...frontMatter,
      tags: frontMatter.tags || [],
      slug,
      readingTime: stats,
      ogImage:
        frontMatter.ogImage ||
        (frontMatter.coverImage ? { url: frontMatter.coverImage } : undefined),
    } as WritingMeta,
    content: htmlContent,
  };
}

export function getAllWritings(includeDrafts = false) {
  const files = readdirSync(writingsDirectory);
  const mdxFiles = files.filter((file) => path.extname(file) === '.mdx');

  return mdxFiles
    .map((file) => {
      const filePath = path.join(writingsDirectory, file);
      const fileContent = readFileSync(filePath, 'utf8');
      const { data: frontMatter, content } = matter(fileContent);
      const stats = readingTime(content);

      return {
        ...frontMatter,
        tags: frontMatter.tags || [],
        status: frontMatter.status || 'draft',
        slug: path.basename(file, '.mdx'),
        readingTime: stats,
        ogImage:
          frontMatter.ogImage ||
          (frontMatter.coverImage
            ? { url: frontMatter.coverImage }
            : undefined),
      } as WritingMeta;
    })
    .filter((post) => {
      console.log(post);
      return includeDrafts || post.status === 'published';
    })
    .sort(
      (a, b) =>
        new Date(b.publishedAt).getTime() - new Date(a.publishedAt).getTime()
    );
}

export function getAllTags() {
  const writings = getAllWritings();
  const tags = new Set<string>();

  writings.forEach((writing) => {
    writing.tags?.forEach((tag) => tags.add(tag));
  });

  return Array.from(tags).sort();
}

export function getWritingsByTag(tag: string) {
  const writings = getAllWritings();
  return writings.filter((writing) => writing.tags?.includes(tag));
}
