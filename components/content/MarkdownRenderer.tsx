'use client';

interface MarkdownRendererProps {
  html: string;
  className?: string;
}

export function MarkdownRenderer({ html, className = '' }: MarkdownRendererProps) {
  return (
    <div 
      className={`prose prose-invert max-w-none ${className}`}
      dangerouslySetInnerHTML={{ __html: html }}
      style={{
        '--tw-prose-body': 'var(--color-textSecondary)',
        '--tw-prose-headings': 'var(--color-textPrimary)',
        '--tw-prose-lead': 'var(--color-textSecondary)',
        '--tw-prose-links': 'var(--color-primary)',
        '--tw-prose-bold': 'var(--color-textPrimary)',
        '--tw-prose-counters': 'var(--color-textMuted)',
        '--tw-prose-bullets': 'var(--color-textMuted)',
        '--tw-prose-hr': 'var(--color-border)',
        '--tw-prose-quotes': 'var(--color-textPrimary)',
        '--tw-prose-quote-borders': 'var(--color-border)',
        '--tw-prose-captions': 'var(--color-textMuted)',
        '--tw-prose-code': 'var(--color-textPrimary)',
        '--tw-prose-pre-code': 'var(--color-textSecondary)',
        '--tw-prose-pre-bg': 'var(--color-backgroundElevated)',
        '--tw-prose-th-borders': 'var(--color-border)',
        '--tw-prose-td-borders': 'var(--color-border)',
      } as React.CSSProperties}
    />
  );
}