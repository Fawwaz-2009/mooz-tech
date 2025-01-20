import BlogPost from './markdown.mdx';
import WritingPage from '@/components/writing/writing-page';

const Component = BlogPost as any

const slug = 'building-with-nextjs';
export default async function Page() {
  return (
    <WritingPage slug={slug}>
      <Component />
    </WritingPage>
  );
}
