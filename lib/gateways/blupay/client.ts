export async function blupayRequest(
  path: string,
  method: 'GET' | 'POST',
  body?: any
) {
  const baseUrl = process.env.BLUPAY_API_URL
  const auth = process.env.BLUPAY_AUTH

  if (!baseUrl || !auth) {
    throw new Error('BluPay env vars not set')
  }

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
    throw new Error(text)
  }

  return JSON.parse(text)
}
