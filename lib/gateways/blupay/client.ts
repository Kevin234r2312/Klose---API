export async function blupayRequest(
  path: string,
  method: 'POST' | 'GET',
  body?: any
) {
  const auth = process.env.BLUPAY_AUTH
  const baseUrl = process.env.BLUPAY_BASE_URL

  if (!auth || !baseUrl) {
    throw new Error('BLUPAY_AUTH ou BLUPAY_BASE_URL não definidos')
  }

  const res = await fetch(`${baseUrl}${path}`, {
    method,
    headers: {
      Authorization: `Basic ${auth}`,
      'Content-Type': 'application/json',
    },
    body: body ? JSON.stringify(body) : undefined,
  })

  const text = await res.text()

  let data: any
  try {
    data = JSON.parse(text)
  } catch {
    data = text
  }

  if (!res.ok) {
    throw {
      status: res.status,
      data,
    }
  }

  return data
}
