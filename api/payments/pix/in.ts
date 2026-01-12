import type { VercelRequest, VercelResponse } from '@vercel/node'

export const config = { runtime: 'nodejs' }

export default function handler(req: VercelRequest, res: VercelResponse) {
  return res.status(200).json({
    ok: true,
    route: '/api/payments/pix/in',
    method: req.method
  })
}
