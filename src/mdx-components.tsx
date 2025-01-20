import React, { ComponentPropsWithoutRef } from 'react';
import { Link } from 'next-view-transitions';
import { highlight } from 'sugar-high';

type HeadingProps = ComponentPropsWithoutRef<'h1'>;
type ParagraphProps = ComponentPropsWithoutRef<'p'>;
type ListProps = ComponentPropsWithoutRef<'ul'>;
type ListItemProps = ComponentPropsWithoutRef<'li'>;
type AnchorProps = ComponentPropsWithoutRef<'a'>;
type BlockquoteProps = ComponentPropsWithoutRef<'blockquote'>;

const components = {
  h1: (props: HeadingProps) => (
    <h1 className="text-4xl font-bold text-foreground mt-8 mb-4" {...props} />
  ),
  h2: (props: HeadingProps) => (
    <h2 className="text-3xl font-bold text-foreground mt-8 mb-4" {...props} />
  ),
  h3: (props: HeadingProps) => (
    <h3 className="text-2xl font-bold text-foreground mt-8 mb-4" {...props} />
  ),
  h4: (props: HeadingProps) => (
    <h4 className="text-xl font-bold text-foreground mt-8 mb-4" {...props} />
  ),
  p: (props: ParagraphProps) => (
    <p className="mb-4 leading-relaxed" {...props} />
  ),
  ol: (props: ListProps) => (
    <ol className="my-6 ml-6 list-decimal" {...props} />
  ),
  ul: (props: ListProps) => (
    <ul className="my-6 ml-6 list-disc" {...props} />
  ),
  li: (props: ListItemProps) => <li className="mb-2" {...props} />,
  em: (props: ComponentPropsWithoutRef<'em'>) => (
    <em className="font-medium" {...props} />
  ),
  strong: (props: ComponentPropsWithoutRef<'strong'>) => (
    <strong className="font-bold" {...props} />
  ),
  a: ({ href, children, ...props }: AnchorProps) => {
    const className = 'text-primary underline hover:text-primary/80';
    if (href?.startsWith('/')) {
      return (
        <Link href={href} className={className} {...props}>
          {children}
        </Link>
      );
    }
    if (href?.startsWith('#')) {
      return (
        <a href={href} className={className} {...props}>
          {children}
        </a>
      );
    }
    return (
      <a
        href={href}
        target="_blank"
        rel="noopener noreferrer"
        className={className}
        {...props}
      >
        {children}
      </a>
    );
  },
  code: ({ children, ...props }: ComponentPropsWithoutRef<'code'>) => {
    const codeHTML = highlight(children as string);
    return (
      <code
        className="bg-muted px-1 py-0.5 rounded text-sm"
        dangerouslySetInnerHTML={{ __html: codeHTML }}
        {...props}
      />
    );
  },
  Table: ({ data }: { data: { headers: string[]; rows: string[][] } }) => (
    <table className="my-6">
      <thead>
        <tr>
          {data.headers.map((header, index) => (
            <th key={index} className="px-4 py-2">{header}</th>
          ))}
        </tr>
      </thead>
      <tbody>
        {data.rows.map((row, index) => (
          <tr key={index}>
            {row.map((cell, cellIndex) => (
              <td key={cellIndex} className="px-4 py-2">{cell}</td>
            ))}
          </tr>
        ))}
      </tbody>
    </table>
  ),
  blockquote: (props: BlockquoteProps) => (
    <blockquote
      className="border-l-4 border-primary pl-4 italic my-6"
      {...props}
    />
  ),
};

declare global {
  type MDXProvidedComponents = typeof components;
}

export function useMDXComponents(): MDXProvidedComponents {
  return components;
}