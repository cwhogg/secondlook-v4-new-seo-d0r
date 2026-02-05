import { getAllPosts, getPostBySlug } from '../../../lib/content';
import { JsonLd } from '../../../components/content/JsonLd';
import Link from 'next/link';
import { notFound } from 'next/navigation';
import type { Metadata } from 'next';

type Props = {
  params: Promise<{ slug: string }>;
};

export async function generateStaticParams() {
  const posts = await getAllPosts('blog-post');
  return posts.map((post) => ({
    slug: post.slug,
  }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const post = await getPostBySlug('blog-post', slug);
  
  if (!post) {
    return {
      title: 'Post Not Found | SecondLook'
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
      url: `https://secondlook.ai/blog/${slug}`,
      publishedTime: post.date
    },
    alternates: {
      canonical: `https://secondlook.ai/blog/${slug}`
    }
  };
}

export default async function BlogPost({ params }: Props) {
  const { slug } = await params;
  const post = await getPostBySlug('blog-post', slug);

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
          "url": `https://secondlook.ai/blog/${slug}`
        }}
      />
      
      <article className="max-w-4xl mx-auto px-6 py-16">
        <header className="mb-12">
          <Link 
            href="/blog" 
            className="text-primaryLight hover:text-primary transition-colors text-small mb-6 inline-block focus-ring rounded"
          >
            ← Back to Blog
          </Link>
          <h1 className="text-hero text-textPrimary mb-4">
            {post.title}
          </h1>
          <div className="flex items-center gap-4 text-textMuted text-small">
            <time>
              {new Date(post.date).toLocaleDateString('en-US', {
                year: 'numeric',
                month: 'long',
                day: 'numeric'
              })}
            </time>
          </div>
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
            prose-pre:bg-backgroundElevated prose-pre:border prose-pre:border-border"
          dangerouslySetInnerHTML={{ __html: post.content }}
        />

        <footer className="mt-12 pt-8 border-t border-border">
          <div className="flex justify-between items-center">
            <Link 
              href="/blog" 
              className="text-primaryLight hover:text-primary transition-colors focus-ring rounded px-2 py-1"
            >
              ← More articles
            </Link>
            <Link 
              href="/" 
              className="bg-primary hover:bg-primaryLight text-white px-4 py-2 rounded-lg font-medium transition-colors focus-ring"
            >
              Try SecondLook
            </Link>
          </div>
        </footer>
      </article>
    </div>
  );
}