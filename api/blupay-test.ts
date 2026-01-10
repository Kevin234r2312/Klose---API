import type { VercelRequest, VercelResponse } from '@vercel/node'
import { blupayRequest } from '../lib/blupay/client'

export const config = {
  runtime: 'nodejs',
}

export default async function handler(
  req: VercelRequest,
  res: VercelResponse
) {
  try {
    const balance = await blupayRequest('/wallet/balance', 'GET')

    res.status(200).json({
      ok: true,
      balance,
    })
  } catch (error: any) {
    res.status(500).json({
      ok: false,
      error: error.message,
    })
  }
}
