
import axios from "axios"

const MEDIUS_BASE_URL = process.env.MEDIUS_BASE_URL
const MEDIUS_SECRET_KEY = process.env.MEDIUS_SECRET_KEY

if (!MEDIUS_BASE_URL || !MEDIUS_SECRET_KEY) {
  throw new Error("Medius env vars not configured")
}

// Basic Auth → base64(secret:x)
const auth = Buffer.from(`${MEDIUS_SECRET_KEY}:x`).toString("base64")

export const mediusApi = axios.create({
  baseURL: MEDIUS_BASE_URL,
  headers: {
    Authorization: `Basic ${auth}`,
    "Content-Type": "application/json",
    Accept: "application/json"
  },
  timeout: 15000
})
