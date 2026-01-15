import type { VercelRequest, VercelResponse } from '@vercel/node'

export const config = { runtime: 'nodejs' }

export default function handler(
  req: VercelRequest,
  res: VercelResponse
) {
  return res.status(200).json({
    baseUrl: process.env.BLUPAY_BASE_URL,
    authExists: !!process.env.BLUPAY_AUTH,
  })
}
