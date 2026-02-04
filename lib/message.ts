export type ChatMessage = {
  text: string;
  createdAt: number;
  sender: 'user' | 'other';
  userId: string
};

export const messages: ChatMessage[] = [];
