import type { NextApiRequest, NextApiResponse } from 'next';

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {

  if (req.method !== 'POST') {
    return res.status(405).end();
  }

  const body = req.body;

  console.log('Webhook body:', JSON.stringify(body, null, 2));

  res.status(200).json({ success: true });
}