import { blupayRequest } from '@/lib/blupay/client'

export const runtime = 'edge'

export async function GET() {
  try {
    const balance = await blupayRequest('/wallet/balance', 'GET')

    return Response.json({
      ok: true,
      balance,
    })
  } catch (error: any) {
    return Response.json(
      {
        ok: false,
        error: error.message,
      },
      { status: 500 }
    )
  }
}
