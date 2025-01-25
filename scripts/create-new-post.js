const fs = require('fs/promises');
const path = require('path');
const { format } = require('date-fns');

const args = process.argv.slice(2);
const [rawName] = args;

if (!rawName) {
  console.error('Please provide a post name (e.g. "my-new-post")');
  process.exit(1);
}

const postName = rawName.toLowerCase().replace(/\s+/g, '-');
const title = postName.split('-').join(' ');
const today = format(new Date(), 'yyyy-MM-dd');

const contentDir = path.join(process.cwd(), 'src/app/writings', postName);
const mdxContent = `import Cool from "./cool"
import Playground from "./playground"

export const metadata = {
  title: "${title}",
  publishedAt: "${today}",
  summary: "",
  url: "/writings/${postName}",
  coverImage: "",
  tags: [],
  ogImage: {
    url: ""
  },
  status: "draft"
};

# ${title}

Start writing your content here...

`;

const pageContent = `import BlogPost from './markdown.mdx';
import WritingPage from '@/components/writing/writing-page';

const Component = BlogPost as any

const slug = '${postName}';
export default async function Page() {
  return (
    <WritingPage slug={slug}>
      <Component />
    </WritingPage>
  );
}
`;

async function createNewPost() {
  try {
    await fs.mkdir(contentDir, { recursive: true });
    
    await Promise.all([
      fs.writeFile(path.join(contentDir, 'markdown.mdx'), mdxContent),
      fs.writeFile(path.join(contentDir, 'page.tsx'), pageContent)
    ]);
    
    console.log(`✅ Created new post at: src/app/writings/${postName}`);
  } catch (error) {
    console.error('Error creating post:', error);
    process.exit(1);
  }
}

createNewPost(); 