import { messages } from '@/lib/message';
import type { NextApiRequest, NextApiResponse } from 'next';


export default function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  res.status(200).json(messages);
  messages.length = 0;
}
