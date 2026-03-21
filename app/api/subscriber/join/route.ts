import { NextRequest, NextResponse } from 'next/server';

export async function POST(request: NextRequest): Promise<NextResponse> {
  const apiUrl = process.env.NEXT_PUBLIC_SUBSCRIBER_API_URL;

  if (!apiUrl) {
    return NextResponse.json({ error: 'Subscriber API not configured' }, { status: 500 });
  }

  const body = await request.json();
  const res = await fetch(`${apiUrl}/join`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(body),
  });

  const data = await res.json();
  return NextResponse.json(data, { status: res.status });
}
