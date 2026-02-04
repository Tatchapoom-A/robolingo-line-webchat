export type ChatMessage = {
  from: 'line' | 'web';
  text: string;
  createdAt: number;
};

export const messages: ChatMessage[] = [];
