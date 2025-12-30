import axios from "axios"

const MEDIUS_BASE_URL = process.env.MEDIUS_BASE_URL
const MEDIUS_SECRET_KEY = process.env.MEDIUS_SECRET_KEY

// ❌ NÃO lançar erro aqui
export function getMediusApi() {
  if (!MEDIUS_BASE_URL || !MEDIUS_SECRET_KEY) {
    throw new Error("Medius env vars not configured")
  }

  const auth = Buffer.from(`${MEDIUS_SECRET_KEY}:x`).toString("base64")

  return axios.create({
    baseURL: MEDIUS_BASE_URL,
    headers: {
      Authorization: `Basic ${auth}`,
      "Content-Type": "application/json",
      Accept: "application/json"
    },
    timeout: 15000
  })
}
