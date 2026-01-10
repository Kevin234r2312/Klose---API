import { createBluPayPixIn } from '../../gateways/blupay/pix'

export async function createPixIn(data: any) {
  return createBluPayPixIn(data)
}
