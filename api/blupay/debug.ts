import type { VercelRequest, VercelResponse } from '@vercel/node'

export const config = { runtime: 'nodejs' }

export default function handler(req: VercelRequest, res: VercelResponse) {
  const auth = process.env.BLUPAY_AUTH?.trim() || ''

  const header = `Basic ${auth}`

  return res.status(200).json({
    rawAuth: auth,
    authorizationHeader: header,
    length: header.length,
    startsWithBasic: header.startsWith('Basic ')
  })
}
