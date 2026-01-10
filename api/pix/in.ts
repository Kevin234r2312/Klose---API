import type { VercelRequest, VercelResponse } from '@vercel/node'
import { blupayRequest } from '../../lib/blupay/client'

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
    const { amount, externalRef, payer } = req.body

    if (!amount || !externalRef || !payer?.document) {
      return res.status(400).json({
        error: 'amount, externalRef and payer.document are required',
      })
    }

    const pix = await blupayRequest('/pix/in', 'POST', {
      amount,
      externalRef,
      payer,
      description: 'Pagamento via Klose',
    })

    res.status(200).json({
      ok: true,
      pix,
    })
  } catch (error: any) {
    res.status(500).json({
      ok: false,
      error: error.message,
    })
  }
}
