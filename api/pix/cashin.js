const fetch = require("node-fetch")

module.exports = async function handler(req, res) {
  // ===============================
  // CORS
  // ===============================
  res.setHeader("Access-Control-Allow-Origin", "*")
  res.setHeader("Access-Control-Allow-Methods", "POST, OPTIONS")
  res.setHeader("Access-Control-Allow-Headers", "Content-Type")

  if (req.method === "OPTIONS") {
    res.statusCode = 200
    return res.end()
  }

  if (req.method !== "POST") {
    res.statusCode = 405
    return res.end(JSON.stringify({ error: "Method not allowed" }))
  }

  try {
    const body = req.body || {}

    // ===============================
    // Validações básicas
    // ===============================
    if (
      !body.amount ||
      !body.name ||
      !body.email ||
      !body.phone ||
      !body.cpf
    ) {
      res.statusCode = 400
      return res.end(
        JSON.stringify({ error: "Missing required fields" })
      )
    }

    // ===============================
    // Request MEDIUS
    // ===============================
    const mediusResponse = await fetch(
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

    const data = await mediusResponse.json()

    console.log("🟢 MEDIUS RESPONSE:", JSON.stringify(data, null, 2))

    res.statusCode = 200
    return res.end(
      JSON.stringify({
        ok: true,
        pix: data,
      })
    )
  } catch (err) {
    console.error("❌ CASHIN ERROR:", err)
    res.statusCode = 500
    return res.end(JSON.stringify({ error: "Internal server error" }))
  }
}
module.exports = async function handler(req, res) {
  // 🔹 CORS headers
  res.setHeader("Access-Control-Allow-Origin", "*")
  res.setHeader("Access-Control-Allow-Methods", "POST, OPTIONS")
  res.setHeader("Access-Control-Allow-Headers", "Content-Type")

  // 🔹 Preflight (browser)
  if (req.method === "OPTIONS") {
    res.statusCode = 200
    return res.end()
  }

  // 🔹 Só aceita POST real
  if (req.method !== "POST") {
    res.statusCode = 405
    return res.end(JSON.stringify({ error: "Method not allowed" }))
  }

  try {
    const body = req.body || {}

    if (!body.amount || !body.cpf || !body.email) {
      res.statusCode = 400
      return res.end(
        JSON.stringify({ error: "Missing required fields" })
      )
    }

    console.log("✅ CASHIN RECEBIDO:", body)

    res.statusCode = 200
    return res.end(
      JSON.stringify({
        ok: true,
        message: "Cash-in endpoint alive",
        received: body
      })
    )
  } catch (err) {
    console.error("❌ CASHIN ERROR:", err)
    res.statusCode = 500
    return res.end(JSON.stringify({ error: "Internal server error" }))
  }
}
