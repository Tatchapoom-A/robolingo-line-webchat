import { messages } from '@/lib/message';
import type { NextApiRequest, NextApiResponse } from 'next';
import { NextResponse } from 'next/server';


export async function GET() {
  const allMessage = [...messages];
  allMessage.sort((a,b) => b.createdAt - a.createdAt)
  return NextResponse.json({ messages: allMessage });
}
