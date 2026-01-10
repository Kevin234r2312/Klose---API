export async function blupayRequest(
  path: string,
  method: 'GET' | 'POST',
  body?: any
) {
  const baseUrl = process.env.BLUPAY_API_URL
  const publicKey = process.env.BLUPAY_PUBLIC_KEY
  const secretKey = process.env.BLUPAY_SECRET_KEY

  const auth = Buffer.from(`${secretKey}:${publicKey}`).toString('base64')

  const res = await fetch(`${baseUrl}${path}`, {
    method,
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Basic ${auth}`,
    },
    body: body ? JSON.stringify(body) : undefined,
  })

  const text = await res.text()

  if (!res.ok) {
    throw new Error(`BluPay error ${res.status}: ${text}`)
  }

  return JSON.parse(text)
}
