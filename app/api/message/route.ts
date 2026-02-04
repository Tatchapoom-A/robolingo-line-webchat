import { messages } from '@/lib/message';
import { NextRequest, NextResponse } from 'next/server';


export async function GET(request: NextRequest) {
  const searchParams = request.nextUrl.searchParams;
  const userId = searchParams.get('userId');

  //const filterdData = messages.filter(u => u.userId === userId);
  const allMessage = [...messages];

  allMessage.sort((a,b) => b.createdAt - a.createdAt)
  return NextResponse.json({ messages: allMessage });
}
