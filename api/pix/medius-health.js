const { mediusRequest } = require("../../lib/medius")

module.exports = async (req, res) => {
  try {
    // chamada simples só pra testar auth
    await mediusRequest("/functions/v1/transactions", {
      method: "POST",
      body: JSON.stringify({
        items: [
          {
            title: "Teste de conexão",
            unitPrice: 100,
            quantity: 1,
            externalRef: "health-check"
          }
        ],
        amount: 100
      })
    })

    return res.status(200).json({
      ok: true,
      message: "Conectado à Medius com sucesso 🔐"
    })
  } catch (err) {
    return res.status(500).json({
      ok: false,
      error: err
    })
  }
}
