import { getAllPosts, getPostBySlug } from '../../../lib/content';
import { JsonLd } from '../../../components/content/JsonLd';
import Link from 'next/link';
import { notFound } from 'next/navigation';
import type { Metadata } from 'next';

type Props = {
  params: Promise<{ slug: string }>;
};

export async function generateStaticParams() {
  const posts = await getAllPosts('comparison');
  return posts.map((post) => ({
    slug: post.slug,
  }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const post = await getPostBySlug('comparison', slug);
  
  if (!post) {
    return {
      title: 'Comparison Not Found | SecondLook'
    };
  }

  return {
    title: `${post.title} | SecondLook`,
    description: post.description,
    keywords: post.targetKeywords?.join(', '),
    openGraph: {
      title: `${post.title} | SecondLook`,
      description: post.description,
      type: 'article',
      url: `https://secondlook.ai/compare/${slug}`
    },
    alternates: {
      canonical: `https://secondlook.ai/compare/${slug}`
    }
  };
}

export default async function ComparisonPage({ params }: Props) {
  const { slug } = await params;
  const post = await getPostBySlug('comparison', slug);

  if (!post) {
    notFound();
  }

  return (
    <div className="min-h-screen bg-background text-textPrimary">
      <JsonLd 
        schema={{
          "@context": "https://schema.org",
          "@type": "Article",
          "headline": post.title,
          "description": post.description,
          "datePublished": post.date,
          "author": {
            "@type": "Organization",
            "name": "SecondLook"
          },
          "publisher": {
            "@type": "Organization",
            "name": "SecondLook",
            "url": "https://secondlook.ai"
          },
          "url": `https://secondlook.ai/compare/${slug}`
        }}
      />
      
      <article className="max-w-4xl mx-auto px-6 py-16">
        <header className="mb-12">
          <Link 
            href="/" 
            className="text-primaryLight hover:text-primary transition-colors text-small mb-6 inline-block focus-ring rounded"
          >
            ← Back to SecondLook
          </Link>
          <h1 className="text-hero text-textPrimary mb-4">
            {post.title}
          </h1>
          <p className="text-subhero text-textSecondary">
            {post.description}
          </p>
        </header>

        <div 
          className="prose prose-invert prose-lg max-w-none
            prose-headings:text-textPrimary prose-headings:font-semibold
            prose-p:text-textSecondary prose-p:leading-relaxed
            prose-a:text-primaryLight hover:prose-a:text-primary prose-a:transition-colors
            prose-strong:text-textPrimary
            prose-ul:text-textSecondary prose-ol:text-textSecondary
            prose-li:text-textSecondary
            prose-blockquote:border-l-primary prose-blockquote:text-textSecondary
            prose-code:text-primaryLight prose-code:bg-backgroundElevated prose-code:px-1 prose-code:py-0.5 prose-code:rounded
            prose-pre:bg-backgroundElevated prose-pre:border prose-pre:border-border
            prose-table:border-collapse prose-table:border prose-table:border-border
            prose-th:border prose-th:border-border prose-th:bg-backgroundElevated prose-th:p-3 prose-th:text-textPrimary
            prose-td:border prose-td:border-border prose-td:p-3 prose-td:text-textSecondary"
          dangerouslySetInnerHTML={{ __html: post.content }}
        />

        <footer className="mt-12 pt-8 border-t border-border">
          <div className="text-center">
            <Link 
              href="/" 
              className="bg-primary hover:bg-primaryLight text-white px-6 py-3 rounded-lg font-medium transition-colors focus-ring inline-block"
            >
              Get Early Access to SecondLook
            </Link>
          </div>
        </footer>
      </article>
    </div>
  );
}