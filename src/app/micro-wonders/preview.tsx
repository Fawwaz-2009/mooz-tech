'use client';
import dynamic from 'next/dynamic';

export default function Preview({ slug }: { slug: string }) {
  const Playground = dynamic<{ tabs: ('preview' | 'code')[] }>(() => import(`./${slug}/playground`), {
    ssr: false,
    loading: () => <div>Loading...</div>,
  });
  return <Playground tabs={['preview']} />;
}
