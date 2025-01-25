'use client';
export default function PlaygroundPage() {
  const isProduction = process.env.NODE_ENV === 'production';
  if (isProduction) {
    return <div>EMPTY</div>;
  }
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
      <style jsx>{`
        .playground {
          background-color: red;
        }
      `}</style>
    </div>
  );
}
