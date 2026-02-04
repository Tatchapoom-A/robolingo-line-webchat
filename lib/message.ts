export type ChatMessage = {
  text: string;
  createdAt: number;
  sender: 'user' | 'other';
};

export const messages: ChatMessage[] = [];
