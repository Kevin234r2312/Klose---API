const MEDIUS_BASE_URL = process.env.MEDIUS_BASE_URL
const MEDIUS_SECRET_KEY = process.env.MEDIUS_SECRET_KEY

function getAuthHeader() {
  const token = Buffer.from(`${MEDIUS_SECRET_KEY}:x`).toString("base64")
  return `Basic ${token}`
}

async function mediusRequest(path, options = {}) {
  const response = await fetch(`${MEDIUS_BASE_URL}${path}`, {
    ...options,
    headers: {
      "Content-Type": "application/json",
      Authorization: getAuthHeader(),
      ...(options.headers || {})
    }
  })

  const data = await response.json()

  if (!response.ok) {
    throw {
      status: response.status,
      data
    }
  }

  return data
}

module.exports = {
  mediusRequest
}
