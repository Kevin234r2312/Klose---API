import type { VercelRequest, VercelResponse } from "@vercel/node"

export const config = {
  runtime: "nodejs",
}

// Função helper para chamar a Medius
async function mediusRequest(path: string, options: RequestInit) {
  const baseUrl = process.env.MEDIUS_BASE_URL
  const secretKey = process.env.MEDIUS_SECRET_KEY

  if (!baseUrl || !secretKey) {
    throw new Error("Medius env vars not configured")
  }

  const auth = Buffer.from(`${secretKey}:x`).toString("base64")

  const response = await fetch(`${baseUrl}${path}`, {
    ...options,
    headers: {
      "Content-Type": "application/json",
      Authorization: `Basic ${auth}`,
      ...(options.headers || {}),
    },
  })

  const data = await response.json()

  if (!response.ok) {
    throw new Error(JSON.stringify(data))
  }

  return data
}

export default async function handler(
  req: VercelRequest,
  res: VercelResponse
) {
  if (req.method !== "POST") {
    return res.status(405).json({ error: "Method not allowed" })
  }

  try {
    const body = req.body

    console.log("📩 CASHIN BODY:", JSON.stringify(body, null, 2))

    // validações mínimas
    if (!body?.amount || !body?.name || !body?.email || !body?.phone || !body?.cpf) {
      return res.status(400).json({
        error: "Missing required fields",
      })
    }

    const transaction = await mediusRequest(
      "/functions/v1/transactions",
      {
        method: "POST",
        body: JSON.stringify({
          paymentMethod: "PIX",
          amount: body.amount,

          // 🔑 LINK ENTRE PAGAMENTO → USUÁRIO/PLANO (TESTE FIXO)
          externalRef: "teste-user:teste-plan",

          items: [
            {
              title: "Assinatura Klose",
              unitPrice: body.amount,
              quantity: 1,
              externalRef: "klose-plan",
            },
          ],

          customer: {
            name: body.name,
            email: body.email,
            phone: body.phone,
            document: {
              type: "CPF",
              number: body.cpf,
            },
          },

          // 🔔 POSTBACK OBRIGATÓRIO
          postbackUrl: "https://klose-api.vercel.app/api/pix/postback",
        }),
      }
    )

    console.log("✅ PIX GERADO:", JSON.stringify(transaction, null, 2))

    return res.status(200).json({
      ok: true,
      pix: transaction.pix || transaction,
    })
  } catch (err: any) {
    console.error("❌ CASHIN ERROR:", err)

    return res.status(500).json({
      ok: false,
      error: err.message || "Internal server error",
    })
  }
}
