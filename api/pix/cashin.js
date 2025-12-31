const { mediusRequest } = require("../../lib/medius")

module.exports = async (req, res) => {
  if (req.method !== "POST") {
    return res.status(405).json({ error: "Method not allowed" })
  }

  try {
    // garante body válido
    const body =
      typeof req.body === "string"
        ? JSON.parse(req.body)
        : req.body || {}

    const transaction = await mediusRequest(
      "/functions/v1/transactions",
      {
        method: "POST",
        body: JSON.stringify({
          paymentMethod: "PIX",
          amount: body.amount || 2990,
          items: [
            {
              title: "Assinatura Klose",
              unitPrice: body.amount || 2990,
              quantity: 1,
              externalRef: "klose-plan"
            }
          ],
          customer: {
            name: body.name || "Usuário Klose",
            email: body.email || "user@klose.app",
            phone: body.phone || "11999999999",
            document: {
              type: "CPF",
              number: body.cpf || "08594408188"
            }
          }
        })
      }
    )

    return res.status(200).json({
      ok: true,
      pix: transaction.pix
    })
  } catch (err) {
    return res.status(500).json({
      ok: false,
      error: err
    })
  }
}
