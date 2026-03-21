import { NextRequest, NextResponse } from 'next/server';

export async function GET(request: NextRequest): Promise<NextResponse> {
  const apiUrl = process.env.NEXT_PUBLIC_SUBSCRIBER_API_URL;
  const { searchParams } = new URL(request.url);
  const analyticsUserId = searchParams.get('analyticsUserId');

  if (!apiUrl || !analyticsUserId) {
    return NextResponse.json({ state: 'not_found' }, { status: 200 });
  }

  const res = await fetch(`${apiUrl}/status?analyticsUserId=${encodeURIComponent(analyticsUserId)}`);
  const data = await res.json();
  return NextResponse.json(data, { status: res.status });
}
