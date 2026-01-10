// lib/blupay/client.ts
export type BluPayRequestOptions = {
  idempotencyKey?: string
}

export async function blupayRequest<T>(
  path: string,
  method: 'GET' | 'POST',
  body?: unknown,
  options?: BluPayRequestOptions
): Promise<T> {
  const baseUrl = process.env.BLUPAY_API_URL!
  const publicKey = process.env.BLUPAY_PUBLIC_KEY!
  const secretKey = process.env.BLUPAY_SECRET_KEY!

  if (!baseUrl || !publicKey || !secretKey) {
    throw new Error('BluPay env vars not configured')
  }

  // Edge suporta btoa
  const auth = btoa(`${secretKey}:${publicKey}`)

  const headers: HeadersInit = {
    'Content-Type': 'application/json',
    Authorization: `Basic ${auth}`,
  }

  if (options?.idempotencyKey) {
    headers['Idempotency-Key'] = options.idempotencyKey
  }

  const res = await fetch(`${baseUrl}${path}`, {
    method,
    headers,
    body: body ? JSON.stringify(body) : undefined,
  })

  const text = await res.text()

  if (!res.ok) {
    throw new Error(`BluPay error ${res.status}: ${text}`)
  }

  return JSON.parse(text)
}
