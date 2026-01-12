headers: {
  Authorization: `Basic ${process.env.BLUPAY_AUTH}`,
  'Content-Type': 'application/json',
},
const BLUPAY_BASE_URL = 'https://api.blupayip.io'
const BLUPAY_AUTH = process.env.BLUPAY_AUTH!

export async function blupayRequest(
  path: string,
  method: string,
  body?: any
) {
  const res = await fetch(`${BLUPAY_BASE_URL}${path}`, {
    method,
    headers: {
      Authorization: `Basic ${BLUPAY_AUTH}`,
      'Content-Type': 'application/json',
    },
    body: body ? JSON.stringify(body) : undefined,
  })

  const text = await res.text()

  if (!res.ok) {
    throw new Error(`BluPay error ${res.status}: ${text}`)
  }

  return JSON.parse(text)
}
