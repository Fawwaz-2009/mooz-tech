'use client';
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

const Component = Sandpack as any;
export default function Playground() {
  return (
    <div className="my-8 lg:-mx-48">
      <Component
        template="react"
        files={{
          '/App.js': `${code}`,
        }}
      />
    </div>
  );
}
