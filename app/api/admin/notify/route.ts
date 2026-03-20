import { NextRequest, NextResponse } from 'next/server';

export async function POST(request: NextRequest) {
  const session = request.cookies.get('admin_session')?.value;
  if (!session || session !== process.env.ADMIN_PASS) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  }

  const apiUrl = process.env.NEXT_PUBLIC_SUBSCRIBER_API_URL;
  if (!apiUrl) {
    return NextResponse.json({ error: 'Subscriber API not configured' }, { status: 500 });
  }

  const body = await request.json();

  const upstream = await fetch(`${apiUrl}/notify`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(body),
  });

  const data = await upstream.json();
  return NextResponse.json(data, { status: upstream.status });
}
