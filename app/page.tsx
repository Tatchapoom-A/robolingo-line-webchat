

import { ChatMessage } from "@/lib/message";
import ChatClient from "@/components/ChatClient";

export default async function Home() {

  const res = await fetch('/api/message', {
    cache: 'no-store',
  })

  const data: { messages: ChatMessage[] } = await res.json()

  return (
    <ChatClient initialMessages={data.messages} />
  )
}
