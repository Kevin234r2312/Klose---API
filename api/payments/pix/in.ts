import type { VercelRequest, VercelResponse } from '@vercel/node'
import { createPixIn } from '../../../lib/gateways/blupay/pix'

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
    const result = await createPixIn(req.body)
    return res.status(200).json(result)
  } catch (err: any) {
    console.error('PIX ERROR:', {
      message: err.message,
      data: err.response?.data,
      status: err.response?.status,
    })

    return res.status(err.response?.status || 500).json({
      error: err.response?.data || {
        message: err.message,
      },
    })
  }
}
