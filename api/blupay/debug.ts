const auth = String(process.env.BLUPAY_AUTH).trim()

const r = await fetch(`${process.env.BLUPAY_API_URL}/api/v1/transactions`, {
  method: 'POST',
  headers: {
    'Authorization': 'Basic ' + auth,
    'Content-Type': 'application/json',
  },
  body: JSON.stringify({
    amount: 1000,
    paymentMethod: 'pix',
    externalRef: 'DEBUG-TEST',
    customer: {
      name: 'Teste Auth',
      document: { type: 'cpf', number: '12345678910' },
    },
    items: [
      { title: 'Teste', unitPrice: 1000, quantity: 1, tangible: false },
    ],
  }),
})
