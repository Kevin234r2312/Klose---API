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
    const { amount, externalRef, customer } = req.body

    if (!amount || !externalRef || !customer) {
      return res.status(400).json({
        error: 'amount, externalRef and customer are required',
      })
    }

    const transaction = await blupayRequest(
      '/api/v1/transactions',
      'POST',
      {
        amount, // em centavos
        paymentMethod: 'pix',
        externalRef,
        customer,
        items: [
          {
            title: 'Pagamento Klose',
            unitPrice: amount,
            quantity: 1,
            tangible: false,
          },
        ],
      }
    )

    res.status(201).json({
      ok: true,
      transaction,
    })
  } catch (error: any) {
    res.status(500).json({
      ok: false,
      error: error.message,
    })
  }
}
