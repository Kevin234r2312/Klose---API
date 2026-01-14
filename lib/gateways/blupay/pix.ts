import { blupayRequest } from './client'

export async function createBluPayPixIn(data: any) {
  return blupayRequest('/api/v1/transactions', 'POST', {
    amount: data.amount,
    paymentMethod: 'pix',
    externalRef: data.externalRef,
    customer: data.customer,
    items: data.items,
    postbackUrl: data.postbackUrl,
    webhookSecret: data.webhookSecret,
    metadata: data.metadata,
  })
}
