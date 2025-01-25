import { getMicroWonders } from '@/lib/mdx';
import BlogPost from './markdown.mdx';
import { MicroWrappersWrappers } from '@/components/micro-wonders/micro-wrappers-wrappers';

const Component = BlogPost as any;

const slug = 'spoiler-reveal';
export default async function Page() {
  const microWonder = await getMicroWonders();
  console.log(microWonder);
  const microWonderData = microWonder.find((mw) => mw.slug === slug);
  console.log(microWonderData);
  return (
    <MicroWrappersWrappers slug={slug}>
      <Component />
    </MicroWrappersWrappers>
  );
}
