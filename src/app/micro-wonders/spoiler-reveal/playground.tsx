'use client';
import LiveCode from '@/components/ui/kibo-ui/live-code';
import { Sandpack } from '@codesandbox/sandpack-react';

const code = ` 
'use client';
export default function PlaygroundPage() {
  return (
    <div
      style={{
        minHeight: '100dvh',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        width: '100%',
        height: '100%',
      }}
    >
      <div className="playground">Playground</div>
      <style jsx>{\`
        .playground {
          background-color: red;
        }
      \`}</style>
    </div>
  );
}
    `;

export default function Playground({ tabs }: { tabs: ('preview' | 'code')[] }) {
  return <LiveCode code={code} tabs={tabs || ['preview', 'code']} />;
}
