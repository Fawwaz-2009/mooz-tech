import { getMicroWonders } from '@/lib/mdx';
import BlogPost from './markdown.mdx';
import { MicroWrappersWrappers } from '@/components/micro-wonders/micro-wrappers-wrappers';
import { notFound } from 'next/navigation';

const Component = BlogPost as any;

const slug = 'pulsing-qr';
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
