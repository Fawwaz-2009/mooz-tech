import BlogPost from './markdown.mdx';
import WritingPage from '@/components/writing/writing-page';

const Component = BlogPost as any;

const slug = 'short-but-complete-guide-to-web-push-notification';
export default async function Page() {
  return (
    <WritingPage slug={slug}>
      <Component />
    </WritingPage>
  );
}
