import { messages } from '@/lib/message';
import type { NextApiRequest, NextApiResponse } from 'next';
import { NextResponse } from 'next/server';


export async function GET() {
  const otherMessage = [...messages];
  messages.length = 0;
  return NextResponse.json({ messages: otherMessage });
}
