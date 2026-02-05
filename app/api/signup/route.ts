import { NextRequest, NextResponse } from 'next/server';
import { Redis } from '@upstash/redis';

const redis = new Redis({
  url: process.env.UPSTASH_REDIS_REST_URL!,
  token: process.env.UPSTASH_REDIS_REST_TOKEN!,
});

const SITE_ID = process.env.SITE_ID || 'secondlook';

export async function POST(request: NextRequest) {
  try {
    const { email } = await request.json();

    if (!email || typeof email !== 'string') {
      return NextResponse.json(
        { error: 'Valid email address is required' },
        { status: 400 }
      );
    }

    // Basic email validation
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      return NextResponse.json(
        { error: 'Please enter a valid email address' },
        { status: 400 }
      );
    }

    // Get client IP for deduplication
    const clientIP = request.headers.get('x-forwarded-for') || 'unknown';
    
    // Store the signup
    const signupData = {
      email: email.toLowerCase().trim(),
      timestamp: new Date().toISOString(),
      ip: clientIP,
      userAgent: request.headers.get('user-agent') || 'unknown'
    };

    // Add to email list
    await redis.rpush(`email_signups:${SITE_ID}`, JSON.stringify(signupData));
    
    // Increment counter
    await redis.incr(`email_signups_count:${SITE_ID}`);

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error('Signup error:', error);
    return NextResponse.json(
      { error: 'Failed to save signup. Please try again.' },
      { status: 500 }
    );
  }
}