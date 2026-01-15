import type { VercelRequest, VercelResponse } from '@vercel/node'
import { blupayRequest } from '../../../lib/gateways/blupay/client'

export const config = { runtime: 'nodejs' }

export default async function handler(
  req: VercelRequest,
  res: VercelResponse
) {
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' })
  }

  try {
    const result = await blupayRequest('/api/v1/transactions', 'POST', {
      amount: req.body.amount,
      paymentMethod: 'pix',
      externalRef: req.body.externalRef,
      customer: req.body.customer,
      items: req.body.items,
      postbackUrl: req.body.postbackUrl,
      webhookSecret: req.body.webhookSecret,
      metadata: req.body.metadata,
    })

    return res.status(200).json(result)
  } catch (err: any) {
    return res.status(500).json({
      error: err.message,
    })
  }
}
