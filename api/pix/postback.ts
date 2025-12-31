import type { VercelRequest, VercelResponse } from "@vercel/node"

export const config = {
  runtime: "nodejs",
}

export default async function handler(
  req: VercelRequest,
  res: VercelResponse
) {
  if (req.method !== "POST") {
    return res.status(405).json({ error: "Method not allowed" })
  }

  try {
    const payload = req.body

    // LOG IMPORTANTE (debug)
    console.log("📩 POSTBACK MEDIUS:", JSON.stringify(payload, null, 2))

    const transaction = payload?.data

    if (!transaction) {
      return res.status(400).json({ error: "Invalid payload" })
    }

    // Status possíveis: waiting_payment | paid | canceled | refunded
    if (transaction.status === "paid") {
      // 👉 AQUI vamos liberar assinatura no próximo passo
      console.log("✅ PIX CONFIRMADO:", transaction.id)
    }

    return res.status(200).json({ received: true })
  } catch (err) {
    console.error("❌ POSTBACK ERROR:", err)
    return res.status(500).json({ error: "Internal server error" })
  }
}
