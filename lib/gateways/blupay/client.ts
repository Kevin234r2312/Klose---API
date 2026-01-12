export async function blupayRequest(
  path: string,
  method: string,
  body?: any
) {
  const auth = process.env.BLUPAY_AUTH

  if (!auth) {
    throw new Error('BLUPAY_AUTH not set')
  }

  const res = await fetch(`https://api.blupayip.io${path}`, {
    method,
    headers: {
      Authorization: `Basic ${auth}`,
      'Content-Type': 'application/json',
    },
    body: body ? JSON.stringify(body) : undefined,
  })

  const text = await res.text()

  try {
    return JSON.parse(text)
  } catch {
    return { raw: text }
  }
}
