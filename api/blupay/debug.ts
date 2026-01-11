import type { VercelRequest, VercelResponse } from '@vercel/node'

export const config = { runtime: 'nodejs' }

export default async function handler(
  req: VercelRequest,
  res: VercelResponse
) {
  try {
    const r = await fetch(`${process.env.BLUPAY_API_URL}/api/v1/transactions`, {
      method: 'GET',
      headers: {
        Authorization: `Basic ${process.env.BLUPAY_AUTH}`,
        'Content-Type': 'application/json',
      },
    })

    const text = await r.text()

    return res.status(200).json({
      status: r.status,
      response: text,
    })
  } catch (err: any) {
    return res.status(500).json({ error: err.message })
  }
}
