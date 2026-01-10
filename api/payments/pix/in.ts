import type { VercelRequest, VercelResponse } from '@vercel/node'
import { createPixIn } from '../../../../lib/payments/pix'

export const config = {
  runtime: 'nodejs',
}

export default async function handler(
  req: VercelRequest,
  res: VercelResponse
) {
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' })
  }

  try {
    const pix = await createPixIn(req.body)
    return res.status(201).json(pix)
  } catch (error: any) {
    return res.status(500).json({ error: error.message })
  }
}

