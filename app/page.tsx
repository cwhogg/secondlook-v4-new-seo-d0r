'use client';

import { useState } from 'react';
import { JsonLd } from '@/components/content/JsonLd';

interface SignupResponse {
  success?: boolean;
  error?: string;
}

export default function HomePage() {
  const [email, setEmail] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [message, setMessage] = useState('');
  const [isSuccess, setIsSuccess] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    setMessage('');

    try {
      const response = await fetch('/api/signup', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ email }),
      });

      const data: SignupResponse = await response.json();

      if (data.success) {
        setIsSuccess(true);
        setMessage('Thanks! You\'re on the early access list.');
        setEmail('');
      } else {
        setMessage(data.error || 'Something went wrong. Please try again.');
      }
    } catch (error) {
      setMessage('Network error. Please check your connection and try again.');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <>
      <JsonLd 
        schema={{
          "@context": "https://schema.org",
          "@type": "FAQPage",
          "mainEntity": [
            {
              "@type": "Question",
              "name": "What to do if doctors can't diagnose you?",
              "acceptedAnswer": {
                "@type": "Answer",
                "text": "When multiple doctors can't diagnose you, it's time to take a more systematic approach. Organize all your medical records, test results, and symptom timelines in one place. Consider seeking a second opinion at a major medical center that specializes in rare diseases, and prepare strategically for each appointment with targeted questions and comprehensive documentation."
              }
            },
            {
              "@type": "Question",
              "name": "Where to go when no one can diagnose you?",
              "acceptedAnswer": {
                "@type": "Answer",
                "text": "Consider major medical centers like Mayo Clinic, Cleveland Clinic, or Johns Hopkins that have specialized rare disease programs. University hospitals often have research programs for undiagnosed conditions. Additionally, organizing your medical data with AI-powered tools can help identify patterns that individual doctors might miss."
              }
            },
            {
              "@type": "Question",
              "name": "What is the hardest medical condition to diagnose?",
              "acceptedAnswer": {
                "@type": "Answer",
                "text": "Rare diseases, autoimmune conditions, and complex multi-system disorders are among the hardest to diagnose. Conditions like fibromyalgia, chronic fatigue syndrome, and many genetic disorders can take years to identify because they present with overlapping symptoms that mimic more common conditions."
              }
            },
            {
              "@type": "Question",
              "name": "How to organize medical records for difficult diagnosis?",
              "acceptedAnswer": {
                "@type": "Answer",
                "text": "Create a comprehensive timeline of symptoms, treatments, and test results. Organize records by specialist and date, compile all imaging and lab results in one folder, and maintain a detailed symptom diary. Use digital tools to track patterns over time and prepare summary documents for new healthcare providers."
              }
            }
          ]
        }}
      />
      
      <header className="border-b border-border bg-backgroundElevated">
        <nav className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <div className="flex items-center">
              <h2 className="text-xl font-bold text-textPrimary">SecondLook</h2>
            </div>
            <div className="hidden md:flex space-x-8">
              <a href="/blog" className="text-textSecondary hover:text-textPrimary transition-colors">Heart Health Blog</a>
              <a href="/compare" className="text-textSecondary hover:text-textPrimary transition-colors">Compare Solutions</a>
              <a href="/faq" className="text-textSecondary hover:text-textPrimary transition-colors">Diagnostic FAQ</a>
            </div>
          </div>
        </nav>
      </header>

      <main>
        {/* Hero Section */}
        <section className="relative overflow-hidden bg-background py-20 sm:py-32">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center">
              <h1 className="text-display text-textPrimary mb-6 animate-fade-in-up">
                What to do when 5 doctors can't diagnose you
              </h1>
              <p className="text-subhero text-textSecondary max-w-4xl mx-auto mb-10 animate-fade-in-up">
                AI-powered diagnostic guidance for complex medical cases that traditional healthcare has failed to solve. Turn your diagnostic odyssey into a structured path forward.
              </p>
              
              <div className="max-w-md mx-auto animate-fade-in-up">
                <form onSubmit={handleSubmit} className="space-y-4">
                  <div>
                    <input
                      type="email"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      placeholder="Enter your email for early access"
                      required
                      className="w-full px-4 py-3 bg-backgroundElevated border border-border rounded-lg text-textPrimary placeholder-textMuted focus-ring"
                      disabled={isLoading || isSuccess}
                    />
                  </div>
                  <button
                    type="submit"
                    disabled={isLoading || isSuccess}
                    className="w-full bg-primary hover:bg-primaryLight text-white font-semibold py-3 px-6 rounded-lg transition-colors focus-ring disabled:opacity-50 disabled:cursor-not-allowed"
                  >
                    {isLoading ? 'Joining...' : 'Get Early Access'}
                  </button>
                </form>
                
                {message && (
                  <p className={`mt-4 text-sm ${isSuccess ? 'text-accent' : 'text-red-400'}`}>
                    {message}
                  </p>
                )}
                
                <p className="mt-4 text-textMuted text-small">
                  Join 2,847 patients seeking diagnostic breakthroughs
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* Value Propositions */}
        <section className="py-20 bg-backgroundElevated" aria-label="Key features for complex diagnosis">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-16">
              <h2 className="text-hero text-textPrimary mb-4">
                Built for complex symptom pattern recognition
              </h2>
              <p className="text-subhero text-textSecondary max-w-3xl mx-auto">
                Your complex case deserves more than rushed appointments and generic advice
              </p>
            </div>
            
            <div className="grid md:grid-cols-3 gap-8">
              <div className="bg-background border border-border rounded-xl p-8 card-hover">
                <div className="w-12 h-12 bg-primary/10 rounded-lg flex items-center justify-center mb-6">
                  <svg className="w-6 h-6 text-primary" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                  </svg>
                </div>
                <h3 className="text-xl font-semibold text-textPrimary mb-4">
                  Organize medical records for difficult diagnosis
                </h3>
                <p className="text-textSecondary text-body">
                  Transform years of scattered test results, specialist notes, and imaging reports into a coherent diagnostic narrative that new physicians can quickly understand.
                </p>
              </div>
              
              <div className="bg-background border border-border rounded-xl p-8 card-hover">
                <div className="w-12 h-12 bg-accent/10 rounded-lg flex items-center justify-center mb-6">
                  <svg className="w-6 h-6 text-accent" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z" />
                  </svg>
                </div>
                <h3 className="text-xl font-semibold text-textPrimary mb-4">
                  Complex symptom pattern recognition
                </h3>
                <p className="text-textSecondary text-body">
                  Advanced AI analyzes symptom evolution over time, identifying patterns that single appointments miss. Built specifically for rare and complex presentations.
                </p>
              </div>
              
              <div className="bg-background border border-border rounded-xl p-8 card-hover">
                <div className="w-12 h-12 bg-primaryLight/10 rounded-lg flex items-center justify-center mb-6">
                  <svg className="w-6 h-6 text-primaryLight" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8.228 9c.549-1.165 2.03-2 3.772-2 2.21 0 4 1.343 4 3 0 1.4-1.278 2.575-3.006 2.907-.542.104-.994.54-.994 1.093m0 3h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                </div>
                <h3 className="text-xl font-semibold text-textPrimary mb-4">
                  Prepare for specialist appointments strategically
                </h3>
                <p className="text-textSecondary text-body">
                  Generate targeted questions, symptom timelines, and documentation strategies to maximize your time with specialists and avoid starting from scratch.
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* Empathy Section */}
        <section className="py-20 bg-background" aria-label="Understanding diagnostic challenges">
          <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
            <h2 className="text-hero text-textPrimary mb-8">
              We understand the exhaustion of explaining your symptoms to yet another doctor who doesn't listen
            </h2>
            <div className="space-y-6 text-textSecondary text-body">
              <p>
                You're not imagining it, and you're not being dramatic—your symptoms matter and deserve serious analysis. 
                After years of being dismissed, misdiagnosed, or told "it's all in your head," you deserve tools that 
                take your experience seriously.
              </p>
              <p>
                SecondLook was built by people who've lived through diagnostic odysseys. We know what it's like 
                when doctors miss rare diseases, when medical gaslighting leaves you doubting yourself, and when 
                you need concrete documentation strategies to be taken seriously.
              </p>
            </div>
          </div>
        </section>

        {/* FAQ Section */}
        <section className="py-20 bg-backgroundElevated" aria-label="Frequently asked questions">
          <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
            <h2 className="text-hero text-textPrimary text-center mb-12">
              Diagnostic odyssey support questions
            </h2>
            
            <div className="space-y-8">
              <div className="bg-background border border-border rounded-lg p-6">
                <h3 className="text-lg font-semibold text-textPrimary mb-3">
                  What to do if doctors can't diagnose you?
                </h3>
                <p className="text-textSecondary">
                  When multiple doctors can't diagnose you, it's time to take a more systematic approach. Organize all your medical records, test results, and symptom timelines in one place. Consider seeking a second opinion at a major medical center that specializes in rare diseases, and prepare strategically for each appointment with targeted questions and comprehensive documentation.
                </p>
              </div>
              
              <div className="bg-background border border-border rounded-lg p-6">
                <h3 className="text-lg font-semibold text-textPrimary mb-3">
                  Where to go when no one can diagnose you?
                </h3>
                <p className="text-textSecondary">
                  Consider major medical centers like Mayo Clinic, Cleveland Clinic, or Johns Hopkins that have specialized rare disease programs. University hospitals often have research programs for undiagnosed conditions. Additionally, organizing your medical data with AI-powered tools can help identify patterns that individual doctors might miss.
                </p>
              </div>
              
              <div className="bg-background border border-border rounded-lg p-6">
                <h3 className="text-lg font-semibold text-textPrimary mb-3">
                  What is the hardest medical condition to diagnose?
                </h3>
                <p className="text-textSecondary">
                  Rare diseases, autoimmune conditions, and complex multi-system disorders are among the hardest to diagnose. Conditions like fibromyalgia, chronic fatigue syndrome, and many genetic disorders can take years to identify because they present with overlapping symptoms that mimic more common conditions.
                </p>
              </div>
              
              <div className="bg-background border border-border rounded-lg p-6">
                <h3 className="text-lg font-semibold text-textPrimary mb-3">
                  How to organize medical records for difficult diagnosis?
                </h3>
                <p className="text-textSecondary">
                  Create a comprehensive timeline of symptoms, treatments, and test results. Organize records by specialist and date, compile all imaging and lab results in one folder, and maintain a detailed symptom diary. Use digital tools to track patterns over time and prepare summary documents for new healthcare providers.
                </p>
              </div>
            </div>
          </div>
        </section>
      </main>

      <footer className="bg-background border-t border-border py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid md:grid-cols-4 gap-8">
            <div>
              <h3 className="text-lg font-semibold text-textPrimary mb-4">SecondLook</h3>
              <p className="text-textMuted text-small">
                Your diagnostic companion when doctors can't find answers
              </p>
            </div>
            
            <div>
              <h4 className="font-semibold text-textPrimary mb-4">Resources</h4>
              <ul className="space-y-2">
                <li><a href="/blog" className="text-textSecondary hover:text-textPrimary transition-colors text-small">Heart Health Blog</a></li>
                <li><a href="/compare" className="text-textSecondary hover:text-textPrimary transition-colors text-small">Compare Solutions</a></li>
                <li><a href="/faq" className="text-textSecondary hover:text-textPrimary transition-colors text-small">Diagnostic FAQ</a></li>
              </ul>
            </div>
            
            <div>
              <h4 className="font-semibold text-textPrimary mb-4">Support</h4>
              <ul className="space-y-2">
                <li><a href="#" className="text-textSecondary hover:text-textPrimary transition-colors text-small">Contact</a></li>
                <li><a href="#" className="text-textSecondary hover:text-textPrimary transition-colors text-small">Privacy</a></li>
                <li><a href="#" className="text-textSecondary hover:text-textPrimary transition-colors text-small">Terms</a></li>
              </ul>
            </div>
            
            <div>
              <h4 className="font-semibold text-textPrimary mb-4">Community</h4>
              <p className="text-textMuted text-small">
                Join thousands seeking diagnostic breakthroughs
              </p>
            </div>
          </div>
          
          <div className="border-t border-border mt-8 pt-8 text-center">
            <p className="text-textMuted text-small">
              © 2024 SecondLook. Built for patients navigating complex diagnoses.
            </p>
          </div>
        </div>
      </footer>
    </>
  );
}