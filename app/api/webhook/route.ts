import { messages } from '@/lib/message';
import type { NextApiRequest, NextApiResponse } from 'next';
import { NextResponse } from 'next/server';

export async function POST(request: Request) {
  console.log('Webhook POST called');

  const rawBody = await request.text();
  console.log(rawBody);
  const event = JSON.parse(rawBody).events[0];

  if (event?.type === 'message' && event.message.type === 'text') {
    messages.push({
      from: 'line',
      text: event.message.text,
      createdAt: Date.now(),
    });
  }
  return NextResponse.json({ ok: true });
}

export async function GET() {
  return NextResponse.json({ ok: true });
}