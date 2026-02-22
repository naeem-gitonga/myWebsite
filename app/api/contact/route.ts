import { NextRequest, NextResponse } from 'next/server';

const FORM_URL = process.env.VERCEL_ENV === 'production'
  ? 'https://ney0s44h42.execute-api.us-east-1.amazonaws.com/prod/api/ngcontact'
  : 'https://ans9ms0e2h.execute-api.us-east-1.amazonaws.com/prod/api/ngcontact-staging';

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();

    const res = await fetch(FORM_URL, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(body),
    });

    if (!res.ok) {
      const text = await res.text();
      console.error('Lambda error:', res.status, text);
      return NextResponse.json({ error: 'Failed to send message' }, { status: res.status });
    }

    return NextResponse.json({ success: true });
  } catch (e) {
    console.error('Contact route error:', e);
    return NextResponse.json({ error: String(e) }, { status: 500 });
  }
}
