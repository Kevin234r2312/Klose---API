import { blupayRequest } from '../lib/blupay/client'

export const config = {
  runtime: 'nodejs',
}

export default async function handler() {
  try {
    const balance = await blupayRequest('/wallet/balance', 'GET')

    return new Response(
      JSON.stringify({
        ok: true,
        balance,
      }),
      { status: 200 }
    )
  } catch (error: any) {
    return new Response(
      JSON.stringify({
        ok: false,
        error: error.message,
      }),
      { status: 500 }
    )
  }
}
