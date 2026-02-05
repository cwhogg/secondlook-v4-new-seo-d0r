import { getAllPosts } from '../../lib/content';
import Link from 'next/link';
import { JsonLd } from '../../components/content/JsonLd';

export const metadata = {
  title: 'Diagnostic Support Blog — Tips & Guides | SecondLook',
  description: 'Expert guidance on navigating complex medical diagnoses, organizing medical records, and advocating for yourself when doctors can\'t find answers.',
  keywords: 'diagnostic odyssey support, medical self advocacy, complex diagnosis tips, medical record organization',
  openGraph: {
    title: 'Diagnostic Support Blog — Tips & Guides | SecondLook',
    description: 'Expert guidance on navigating complex medical diagnoses, organizing medical records, and advocating for yourself when doctors can\'t find answers.',
    type: 'website',
    url: 'https://secondlook.ai/blog'
  },
  alternates: {
    canonical: 'https://secondlook.ai/blog'
  }
};

export default async function BlogPage() {
  const posts = await getAllPosts('blog-post');

  return (
    <div className="min-h-screen bg-background text-textPrimary">
      <JsonLd 
        schema={{
          "@context": "https://schema.org",
          "@type": "Blog",
          "name": "SecondLook Blog",
          "description": "Expert guidance on navigating complex medical diagnoses and diagnostic odysseys",
          "url": "https://secondlook.ai/blog"
        }}
      />
      
      <div className="max-w-4xl mx-auto px-6 py-16">
        <header className="mb-12">
          <Link 
            href="/" 
            className="text-primaryLight hover:text-primary transition-colors text-small mb-4 inline-block focus-ring rounded"
          >
            ← Back to SecondLook
          </Link>
          <h1 className="text-hero text-textPrimary mb-4">
            Diagnostic Support Blog
          </h1>
          <p className="text-subhero text-textSecondary max-w-2xl">
            Expert guidance on navigating complex medical diagnoses, organizing medical records, and advocating for yourself when traditional healthcare falls short.
          </p>
        </header>

        {posts.length === 0 ? (
          <div className="text-center py-16">
            <div className="bg-backgroundElevated border border-border rounded-lg p-8 max-w-md mx-auto">
              <h2 className="text-xl font-semibold text-textPrimary mb-2">
                Coming Soon
              </h2>
              <p className="text-textSecondary">
                We're preparing comprehensive guides to help you navigate your diagnostic journey. Check back soon for expert insights and practical tools.
              </p>
            </div>
          </div>
        ) : (
          <div className="space-y-8">
            {posts.map((post) => (
              <article key={post.slug} className="bg-backgroundElevated border border-border rounded-lg p-6 hover:border-primary/50 transition-colors">
                <header className="mb-3">
                  <h2 className="text-xl font-semibold text-textPrimary mb-2 hover:text-primaryLight transition-colors">
                    <Link href={`/blog/${post.slug}`} className="focus-ring rounded">
                      {post.title}
                    </Link>
                  </h2>
                  <time className="text-small text-textMuted">
                    {new Date(post.date).toLocaleDateString('en-US', {
                      year: 'numeric',
                      month: 'long',
                      day: 'numeric'
                    })}
                  </time>
                </header>
                <p className="text-textSecondary mb-4 leading-relaxed">
                  {post.description}
                </p>
                <Link 
                  href={`/blog/${post.slug}`}
                  className="text-primaryLight hover:text-primary transition-colors text-small font-medium focus-ring rounded"
                >
                  Read more →
                </Link>
              </article>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}