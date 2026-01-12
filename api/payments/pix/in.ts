import type { VercelRequest, VercelResponse } from '@vercel/node'
import { createPixIn } from '../../../lib/gateways/blupay/pix'

export const config = { runtime: 'nodejs' }

export default async function handler(
  req: VercelRequest,
  res: VercelResponse
) {
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' })
  }

  try {
    const pix = await createPixIn(req.body)
    return res.status(200).json(pix)
  } catch (err: any) {
  console.error('PIX ERROR:', err)

  return res.status(err?.status || 500).json({
    error: err?.data || err,
  })
}

