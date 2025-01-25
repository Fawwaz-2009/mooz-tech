const fs = require('fs/promises');
const path = require('path');
const { format } = require('date-fns');

const args = process.argv.slice(2);
const [rawName] = args;

if (!rawName) {
  console.error('Please provide a micro-wonder name (e.g. "cool-animation")');
  process.exit(1);
}

const microName = rawName.toLowerCase().replace(/\s+/g, '-');
const title = microName.split('-').join(' ');
const today = format(new Date(), 'yyyy-MM-dd');

const contentDir = path.join(process.cwd(), 'src/app/micro-wonders', microName);
const mdxContent = `import Playground from "./playground"

export const metadata = {
  title: "${title}",
  publishedAt: "${today}",
  summary: "",
  url: "/micro-wonders/${microName}",
  coverImage: "",
  tags: [],
  ogImage: {
    url: ""
  },
  difficulty: "easy",
  status: "published"
};

<Playground />
`;

const pageContent = `import { getMicroWonders } from '@/lib/mdx';
import BlogPost from './markdown.mdx';
import { MicroWrappersWrappers } from '@/components/micro-wonders/micro-wrappers-wrappers';
import { notFound } from 'next/navigation';

const Component = BlogPost as any;

const slug = '${microName}';
export default async function Page() {
  const microWonder = await getMicroWonders();
  const microWonderDataIndex = microWonder.findIndex((mw) => mw.slug === slug);
  const microWonderData = microWonder[microWonderDataIndex];
  const previousMicroWonderUrl = microWonder[microWonderDataIndex - 1]?.slug;
  const nextMicroWonderUrl = microWonder[microWonderDataIndex + 1]?.slug;
  if (!microWonderData) {
    return notFound();
  }
  return (
    <MicroWrappersWrappers metadata={microWonderData} previousMicroWonderUrl={previousMicroWonderUrl} nextMicroWonderUrl={nextMicroWonderUrl}>
      <Component />
    </MicroWrappersWrappers>
  );
}
`;

const playgroundContent = `'use client';
import LiveCode from '@/components/ui/kibo-ui/live-code';

const code = \`

    \`;

export default function Playground({ tabs }: { tabs: ('preview' | 'code')[] }) {
  return <LiveCode code={code} tabs={tabs || ['preview', 'code']} />;
}
`;

async function createNewMicro() {
  try {
    await fs.mkdir(contentDir, { recursive: true });

    await Promise.all([
      fs.writeFile(path.join(contentDir, 'markdown.mdx'), mdxContent),
      fs.writeFile(path.join(contentDir, 'page.tsx'), pageContent),
      fs.writeFile(path.join(contentDir, 'playground.tsx'), playgroundContent),
    ]);

    console.log(`✅ Created new micro-wonder at: src/app/micro-wonders/${microName}`);
  } catch (error) {
    console.error('Error creating micro-wonder:', error);
    process.exit(1);
  }
}

createNewMicro();
