import type { VercelRequest, VercelResponse } from '@vercel/node'

export const config = { runtime: 'nodejs' }

export default async function handler(req: VercelRequest, res: VercelResponse) {
  const auth = process.env.BLUPAY_AUTH?.trim()

  // 👇 DEVOLVE O HEADER QUE ESTAMOS ENVIANDO
  return res.status(200).json({
    authorizationHeader: `Basic ${auth}`,
    length: auth?.length,
    startsWithBasic: auth?.startsWith('Basic '),
  })
}
