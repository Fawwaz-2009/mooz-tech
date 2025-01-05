import styles from './writing-body.module.css';

interface WritingBodyProps {
  content: string;
}

export function WritingBody({ content }: WritingBodyProps) {
  return (
    <div 
      className={styles.markdown}
      dangerouslySetInnerHTML={{ __html: content }}
    />
  );
} 