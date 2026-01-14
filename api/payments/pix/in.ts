import type { VercelRequest, VercelResponse } from '@vercel/node'
import { createBluPayPixIn } from '../../../../lib/gateways/blupay/pix'

export const config = { runtime: 'nodejs' }

export default async function handler(
  req: VercelRequest,
  res: VercelResponse
) {
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' })
  }

  try {
    const result = await createBluPayPixIn(req.body)
    return res.status(200).json(result)
  } catch (err: any) {
    return res.status(err.status || 500).json(err.data || err)
  }
}
