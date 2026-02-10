import { ChatMessage } from "@/lib/message";
import ChatClient from "@/components/ChatClient";
import { messages } from '@/lib/message'

export default async function Home() {

  return (
    <ChatClient initialMessages={messages} />
  )
}
