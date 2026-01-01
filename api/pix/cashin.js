export const config = {
  runtime: "nodejs"
}

export default async function handler(req: any, res: any) {
  try {
    if (req.method !== "POST") {
      return res.status(405).json({ error: "Method not allowed" })
    }

    const body = req.body

    if (!body?.amount || !body?.cpf || !body?.email) {
      return res.status(400).json({ error: "Missing required fields" })
    }

    return res.status(200).json({
      ok: true,
      message: "Cash-in endpoint alive",
      received: body
    })
  } catch (err) {
    console.error("CASHIN ERROR:", err)
    return res.status(500).json({ error: "Internal server error" })
  }
}
