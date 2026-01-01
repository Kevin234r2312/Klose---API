module.exports = async function handler(req, res) {
  // ===============================
  // CORS
  // ===============================
  res.setHeader("Access-Control-Allow-Origin", "*")
  res.setHeader("Access-Control-Allow-Methods", "POST, OPTIONS")
  res.setHeader("Access-Control-Allow-Headers", "Content-Type")

  if (req.method === "OPTIONS") {
    return res.status(200).end()
  }

  if (req.method !== "POST") {
    return res.status(405).json({ error: "Method not allowed" })
  }

  try {
    const body = req.body || {}

    // ===============================
    // Validação
    // ===============================
    if (!body.amount || !body.name || !body.email || !body.phone || !body.cpf) {
      return res.status(400).json({
        error: "Missing required fields",
      })
    }

    // ===============================
    // MEDIUS PIX
    // ===============================
    const response = await fetch(
      process.env.MEDIUS_BASE_URL + "/functions/v1/transactions",
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization:
            "Basic " +
            Buffer.from(process.env.MEDIUS_SECRET_KEY + ":x").toString("base64"),
        },
        body: JSON.stringify({
          paymentMethod: "PIX",
          amount: body.amount,

          externalRef: "teste-klose-pix",

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

          postbackUrl:
            "https://klose-api.vercel.app/api/pix/postback",
        }),
      }
    )

    const data = await response.json()

    console.log("🟢 PIX GERADO:", JSON.stringify(data, null, 2))

    return res.status(200).json({
      ok: true,
      pix: data,
    })
  } catch (err) {
    console.error("❌ CASHIN ERROR:", err)
    return res.status(500).json({
      error: "Internal server error",
    })
  }
}
