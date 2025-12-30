import type { VercelRequest, VercelResponse } from "@vercel/node"
import { mediusApi } from "../../lib/medius"

export default async function handler(
  req: VercelRequest,
  res: VercelResponse
) {
  // CORS
  res.setHeader("Access-Control-Allow-Origin", "*")
  res.setHeader("Access-Control-Allow-Methods", "POST, OPTIONS")
  res.setHeader("Access-Control-Allow-Headers", "Content-Type, Authorization")

  if (req.method === "OPTIONS") {
    return res.status(200).end()
  }

  if (req.method !== "POST") {
    return res.status(405).json({ error: "Method not allowed" })
  }

  try {
    // 🔎 Teste simples de conexão (GET ou endpoint leve)
    const response = await mediusApi.get("/cashout")

    return res.status(200).json({
      ok: true,
      medius: "connected",
      sample: response.data
    })
  } catch (error: any) {
    return res.status(500).json({
      ok: false,
      error: "Failed to connect to Medius",
      details: error?.response?.data || error.message
    })
  }
}
