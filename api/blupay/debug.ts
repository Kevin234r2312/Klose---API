import type { VercelRequest, VercelResponse } from '@vercel/node'

export const config = { runtime: 'nodejs' }

export default async function handler(req: VercelRequest, res: VercelResponse) {
  const r = await fetch(`${process.env.BLUPAY_API_URL}/api/v1/transactions`, {
    method: 'POST',
    headers: {
      Authorization: `Basic ${process.env.BLUPAY_AUTH}`,
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      amount: 1000,
      paymentMethod: 'pix',
      externalRef: 'DEBUG-TEST',
      customer: {
        name: 'Teste Auth',
        document: { type: 'cpf', number: '12345678910' },
      },
      items: [
        { title: 'Teste', unitPrice: 1000, quantity: 1, tangible: false },
      ],
    }),
  })

  const json = await r.json()
  return res.status(r.status).json(json)
}
