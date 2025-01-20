'use client';
import { Sandpack } from '@codesandbox/sandpack-react';

const Component = Sandpack as any;
export default function Playground() {
  return (
    <Component
      template="react"
      files={{
        '/App.js': `export default function App() {
  return <h1>Hello Sandpacfffk</h1>
}`,
      }}
    />
  );
}
