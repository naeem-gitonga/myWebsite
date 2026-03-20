import { NextRequest, NextResponse } from 'next/server';

export async function GET(request: NextRequest): Promise<NextResponse> {
  const { searchParams } = new URL(request.url);
  const token = searchParams.get('token');
  const email = searchParams.get('email');
  const subscriberApiUrl = process.env.NEXT_PUBLIC_SUBSCRIBER_API_URL;
  const origin = process.env.NEXT_PUBLIC_SITE_URL || '';

  if (!token || !email || !subscriberApiUrl) {
    return NextResponse.redirect(new URL('/articles', origin));
  }

  try {
    const res = await fetch(
      `${subscriberApiUrl}/confirm?token=${encodeURIComponent(token)}&email=${encodeURIComponent(email)}`
    );
    const data: { confirmed: boolean } = await res.json();
    if (data.confirmed) {
      return NextResponse.redirect(new URL('/articles?subscribed=true', origin));
    }
  } catch {
    // fall through
  }

  return NextResponse.redirect(new URL('/articles', origin));
}
