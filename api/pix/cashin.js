module.exports = async function handler(req: any, res: any) {
  try {
    if (req.method !== "POST") {
      res.statusCode = 405
      return res.end(JSON.stringify({ error: "Method not allowed" }))
    }

    const body = req.body || {}

    if (!body.amount || !body.cpf || !body.email) {
      res.statusCode = 400
      return res.end(
        JSON.stringify({ error: "Missing required fields" })
      )
    }

    res.statusCode = 200
    return res.end(
      JSON.stringify({
        ok: true,
        message: "Cash-in endpoint alive",
        received: body
      })
    )
  } catch (err) {
    console.error("CASHIN ERROR:", err)
    res.statusCode = 500
    return res.end(
      JSON.stringify({ error: "Internal server error" })
    )
  }
}
