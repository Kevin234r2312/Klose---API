import type { VercelRequest, VercelResponse } from '@vercel/node'

export const config = { runtime: 'nodejs' }

export default async function handler(
  req: VercelRequest,
  res: VercelResponse
) {
  try {
    const auth = process.env.BLUPAY_AUTH?.trim()

    const response = await fetch(
      `${process.env.BLUPAY_API_URL}/api/v1/transactions`,
      {
        method: 'POST',
        headers: {
          Authorization: `Basic ${auth}`,
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          amount: 1000,
          paymentMethod: 'pix',
          externalRef: 'DEBUG-TEST',
          customer: {
            name: 'Teste',
            document: { type: 'cpf', number: '12345678910' },
          },
          items: [
            {
              title: 'Teste',
              unitPrice: 1000,
              quantity: 1,
              tangible: false,
            },
          ],
        }),
      }
    )

    const text = await response.text()
    return res.status(response.status).send(text)
  } catch (err: any) {
    return res.status(500).json({
      error: err.message,
    })
  }
}
