import BlogPost from './markdown.mdx';
import WritingPage from '@/components/writing/writing-page';

const slug = 'building-with-nextjs';
export default async function Page() {
  return (
    <WritingPage slug={slug}>
      <BlogPost />
    </WritingPage>
  );
}
