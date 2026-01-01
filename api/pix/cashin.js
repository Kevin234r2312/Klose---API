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
