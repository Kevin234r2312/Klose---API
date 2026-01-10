import type { VercelRequest, VercelResponse } from '@vercel/node'
import { blupayRequest } from '../lib/blupay/client'

export const config = { runtime: 'nodejs' }

export default async function handler(
  req: VercelRequest,
  res: VercelResponse
) {
  try {
    const result = await blupayRequest('/', 'GET')
    res.status(200).json({ ok: true, result })
  } catch (error: any) {
    res.status(500).json({ ok: false, error: error.message })
  }
}
