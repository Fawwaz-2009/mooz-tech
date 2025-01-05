import { compileMDX } from 'next-mdx-remote/rsc';
import { readFileSync, readdirSync } from 'fs';
import path from 'path';
import matter from 'gray-matter';
import readingTime from 'reading-time';

export type WritingMeta = {
  title: string;
  publishedAt: string;
  summary: string;
  slug: string;
  tags: string[];
  readingTime: {
    text: string;
    minutes: number;
    time: number;
    words: number;
  };
};

const writingsDirectory = path.join(process.cwd(), 'content');

export async function getWritingBySlug(slug: string) {
  const filePath = path.join(writingsDirectory, `${slug}.mdx`);
  const fileContent = readFileSync(filePath, 'utf8');
  
  const { data: frontMatter, content } = matter(fileContent);
  const stats = readingTime(content);
  
  const { content: compiledContent } = await compileMDX({
    source: content,
    options: { parseFrontmatter: true }
  });

  return {
    meta: {
      ...frontMatter,
      tags: frontMatter.tags || [],
      slug,
      readingTime: stats,
    } as WritingMeta,
    content: compiledContent,
  };
}

export function getAllWritings() {
  const files = readdirSync(writingsDirectory);
  const mdxFiles = files.filter((file) => path.extname(file) === '.mdx');

  return mdxFiles.map((file) => {
    const filePath = path.join(writingsDirectory, file);
    const fileContent = readFileSync(filePath, 'utf8');
    const { data: frontMatter, content } = matter(fileContent);
    const stats = readingTime(content);
    
    return {
      ...frontMatter,
      tags: frontMatter.tags || [],
      slug: path.basename(file, '.mdx'),
      readingTime: stats,
    } as WritingMeta;
  }).sort((a, b) => new Date(b.publishedAt).getTime() - new Date(a.publishedAt).getTime());
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