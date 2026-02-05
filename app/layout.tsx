import { Inter, JetBrains_Mono } from 'next/font/google';
import './globals.css';
import { JsonLd } from '@/components/content/JsonLd';

const inter = Inter({ subsets: ['latin'], variable: '--font-inter' });
const jetbrainsMono = JetBrains_Mono({ subsets: ['latin'], variable: '--font-mono' });

export const metadata = {
  title: 'What to do when 5 doctors can\'t diagnose you — SecondLook',
  description: 'What to do when 5 doctors can\'t diagnose you? SecondLook\'s AI analyzes complex medical cases and organizes records for difficult diagnosis breakthrough.',
  keywords: 'what to do when 5 doctors can\'t diagnose you, ai symptom checker complex medical cases, organize medical records difficult diagnosis, diagnostic odyssey support, complex symptom pattern recognition',
  openGraph: {
    title: 'What to do when 5 doctors can\'t diagnose you — SecondLook',
    description: 'AI-powered diagnostic guidance for complex medical cases that traditional healthcare has failed to solve.',
    type: 'website',
    url: 'https://secondlook.ai',
    siteName: 'SecondLook'
  },
  twitter: {
    card: 'summary_large_image',
    title: 'What to do when 5 doctors can\'t diagnose you — SecondLook',
    description: 'AI-powered diagnostic guidance for complex medical cases that traditional healthcare has failed to solve.'
  },
  alternates: {
    canonical: 'https://secondlook.ai'
  },
  viewport: 'width=device-width, initial-scale=1'
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en" className={`${inter.variable} ${jetbrainsMono.variable}`}>
      <head>
        <JsonLd 
          schema={{
            "@context": "https://schema.org",
            "@type": "Organization",
            "name": "SecondLook",
            "url": "https://secondlook.ai",
            "description": "AI-powered diagnostic guidance for complex medical cases"
          }}
        />
        <JsonLd 
          schema={{
            "@context": "https://schema.org",
            "@type": "WebSite",
            "name": "SecondLook",
            "url": "https://secondlook.ai",
            "potentialAction": {
              "@type": "SearchAction",
              "target": "https://secondlook.ai/search?q={search_term_string}",
              "query-input": "required name=search_term_string"
            }
          }}
        />
      </head>
      <body className="bg-background text-textPrimary font-inter antialiased">
        {children}
      </body>
    </html>
  );
}