import { messages } from '@/lib/message';
import type { NextApiRequest, NextApiResponse } from 'next';
import { NextResponse } from 'next/server';


export async function GET() {
    return NextResponse.json({ messages: messages });
}

