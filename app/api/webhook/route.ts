import { messages } from '@/lib/message';
import type { NextApiRequest, NextApiResponse } from 'next';
import { NextResponse } from 'next/server';

export async function POST(request: Request) {
  console.log('Webhook POST called');
  console.log(request.body);
  // if (request?.type === 'message' && request.message.type === 'text') {
  //   messages.push({
  //     from: 'line',
  //     text: event.message.text,
  //     createdAt: Date.now(),
  //   });
  // }
  return NextResponse.json({ ok: true });
}

export async function GET() {
  return NextResponse.json({ ok: true });
}