import type { NextApiRequest, NextApiResponse } from 'next';

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.method !== 'POST') {
    return res.status(200).end();
  }
  console.log('Webhook called');
  console.log(JSON.stringify(req.body, null, 2));

  res.status(200).json({ success: true });
}