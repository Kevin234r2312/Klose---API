return res.status(200).json({ ok: true, step: "cashin alive" })

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
  amount: body.amount,

  externalRef: "teste-user:teste-plan",

  items: [
    {
      title: "Assinatura Klose",
      unitPrice: body.amount,
      quantity: 1,
      externalRef: "klose-plan"
    }
  ],

  customer: {
    name: body.name,
    email: body.email,
    phone: body.phone,
    document: {
      type: "CPF",
      number: body.cpf
    }
  },

  postbackUrl: "https://klose-api.vercel.app/api/pix/postback"
})


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
