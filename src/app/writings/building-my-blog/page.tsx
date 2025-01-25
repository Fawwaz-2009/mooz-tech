import BlogPost from './markdown.mdx';
import WritingPage from '@/components/writing/writing-page';

const Component = BlogPost as any

const slug = 'building-my-blog';
export default async function Page() {
  return (
    <WritingPage slug={slug}>
      <Component />
    </WritingPage>
  );
}
