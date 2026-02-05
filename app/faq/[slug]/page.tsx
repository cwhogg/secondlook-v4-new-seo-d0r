import { getAllPosts, getPostBySlug } from '../../../lib/content';
import { JsonLd } from '../../../components/content/JsonLd';
import Link from 'next/link';
import { notFound } from 'next/navigation';
import type { Metadata } from 'next';

type Props = {
  params: Promise<{ slug: string }>;
};

export async function generateStaticParams() {
  const posts = await getAllPosts('faq');
  return posts.map((post) => ({
    slug: post.slug,
  }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const post = await getPostBySlug('faq', slug);
  
  if (!post) {
    return {
      title: 'FAQ Not Found | SecondLook'
    };
  }

  return {
    title: `${post.title} | SecondLook`,
    description: post.description,
    keywords: post.targetKeywords?.join(', '),
    openGraph: {
      title: `${post.title} | SecondLook`,
      description: post.description,
      type: 'website',
      url: `https://secondlook.ai/faq/${slug}`
    },
    alternates: {
      canonical: `https://secondlook.ai/faq/${slug}`
    }
  };
}

function extractQAFromContent(content: string) {
  const qaPattern = /<h[23][^>]*>(.*?)<\/h[23]>\s*<p>(.*?)<\/p>/g;
  const qaPairs = [];
  let match;
  
  while ((match = qaPattern.exec(content)) !== null) {
    qaPairs.push({
      question: match[1].replace(/<[^>]*>/g, '').trim(),
      answer: match[2].replace(/<[^>]*>/g, '').trim()
    });
  }
  
  return qaPairs;
}

export default async function FAQPage({ params }: Props) {
  const { slug } = await params;
  const post = await getPostBySlug('faq', slug);

  if (!post) {
    notFound();
  }

  const qaPairs = extractQAFromContent(post.content);

  return (
    <div className="min-h-screen bg-background text-textPrimary">
      <JsonLd 
        schema={{
          "@context": "https://schema.org",
          "@type": "FAQPage",
          "name": post.title,
          "description": post.description,
          "url": `https://secondlook.ai/faq/${slug}`,
          "mainEntity": qaPairs.map(qa => ({
            "@type": "Question",
            "name": qa.question,
            "acceptedAnswer": {
              "@type": "Answer",
              "text": qa.answer
            }
          }))
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
            prose-pre:bg-backgroundElevated prose-pre:border prose-pre:border-border"
          dangerouslySetInnerHTML={{ __html: post.content }}
        />

        <footer className="mt-12 pt-8 border-t border-border">
          <div className="bg-backgroundElevated border border-border rounded-lg p-6 text-center">
            <h2 className="text-lg font-semibold text-textPrimary mb-2">
              Still have questions?
            </h2>
            <p className="text-textSecondary mb-4">
              Get early access to SecondLook and start organizing your diagnostic journey today.
            </p>
            <Link 
              href="/" 
              className="bg-primary hover:bg-primaryLight text-white px-6 py-3 rounded-lg font-medium transition-colors focus-ring inline-block"
            >
              Get Early Access
            </Link>
          </div>
        </footer>
      </article>
    </div>
  );
}