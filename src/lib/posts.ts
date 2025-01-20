import { readdir } from 'fs/promises';
import path from 'path';
import fs from 'fs/promises';
import readingTime from 'reading-time';


export interface Post {
  url: string;
  title: string;
  summary: string;
  publishedAt: string;
  coverImage: string;
  tags: string[];
  ogImage: string;
  status: 'draft' | 'published';
//   content: string;
  readingTime: {
    text: string;
    minutes: number;
    time: number;
    words: number;
  }
}

export const contentDirectory = './src/app/writings';
export const excludedDirectories = ['tags', 'components', 'utils', 'assets'];

// TODO make better with effect and schema
export async function getPosts(directory: string): Promise<Post[]> {
  // Retrieve slugs from post routes
  const slugs = (await readdir(directory, { withFileTypes: true }))
    .filter(dirent => dirent.isDirectory())
    .filter(dirent => !excludedDirectories.includes(dirent.name));

  console.log('Found posts in directories:', slugs.map(s => s.name));

  // Retrieve metadata and content from MDX files
  const posts = await Promise.all(
    slugs.map(async ({ name }) => {
      const filePath = path.join(directory, name, 'markdown.mdx');
      const fileContent = await fs.readFile(filePath, 'utf-8');

      // Extract metadata from frontmatter
      const metadataMatch = fileContent.match(
        /export const metadata = ({[\s\S]*?});/
      );
      if (!metadataMatch) {
        throw new Error(`No metadata found in ${filePath}`);
      }

      // Safely evaluate the metadata object
      const metadata = eval(`(${metadataMatch[1]})`);

      // Extract content by removing the metadata section and any imports
      const content = fileContent
        .replace(/^---[\s\S]*?---/m, '') // Remove frontmatter if exists
        .replace(/import[\s\S]*?from.*?;/g, '') // Remove import statements
        .replace(/export const metadata = {[\s\S]*?};/, '') // Remove metadata export
        .trim();

      const readingTimeResult = readingTime(content);

      return { 
        slug: name, 
        ...metadata,
        readingTime: readingTimeResult
      } as Post;
    })
  );

  // Sort posts from newest to oldest and filter published ones
  return posts
    .sort((a, b) => +new Date(b.publishedAt) - +new Date(a.publishedAt))
    .filter((post) => post.status === 'published');
}



export async function getAllTags() {
    const writings = await getPosts(contentDirectory);
    const tags = new Set<string>();
  
    writings.forEach((writing) => {
      writing.tags?.forEach((tag) => tags.add(tag));
    });
  
    return Array.from(tags).sort();
}

export async function getPostsByTag(tag: string): Promise<Post[]> {
    const allPosts = await getPosts(contentDirectory);
    return allPosts.filter((post) => post.tags?.includes(tag));
}