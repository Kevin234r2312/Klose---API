import { blupayRequest } from './client'

export async function createBluPayPixIn(data: any) {
  return blupayRequest('/api/v1/transactions', 'POST', {
    amount: data.amount, // centavos
    paymentMethod: 'pix',
    externalRef: data.externalRef,
    customer: data.customer,
    items: data.items ?? [
      {
        title: 'Pagamento Klose',
        unitPrice: data.amount,
        quantity: 1,
        tangible: false,
      },
    ],
  })
}
