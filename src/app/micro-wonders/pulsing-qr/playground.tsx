'use client';
import LiveCode from '@/components/ui/kibo-ui/live-code';

const code = `

    `;

export default function Playground({ tabs }: { tabs: ('preview' | 'code')[] }) {
  return <LiveCode code={code} tabs={tabs || ['preview', 'code']} />;
}
