import { NextResponse } from 'next/server'
import axios from 'axios'
import { messages } from '@/lib/message';

export async function POST(req: Request) {
  const { userId, message } = await req.json()
  try {
    const res = await axios.post(
      'https://api.line.me/v2/bot/message/broadcast',
      {
        //to: userId,
        messages: [{ type: 'text', text: message }],
      },
      {
        headers: {
          Authorization: `Bearer ${process.env.LINE_CHANNEL_ACCESS_TOKEN}`,
          'Content-Type': 'application/json',
        },
      }
    )
    messages.push({
      text: message,
      createdAt: Date.now(),
      sender: "user",
      //userId: userId
    });
    return NextResponse.json({ success: true })
  } catch (error: any) {
    console.error(error.response?.data || error.message)
    return NextResponse.json({ success: false }, { status: 500 })
  }
}
