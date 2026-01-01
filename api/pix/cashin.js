import type { VercelRequest, VercelResponse } from "@vercel/node"

export const config = {
  runtime: "nodejs",
}

export default async function handler(
  req: VercelRequest,
  res: VercelResponse
) {
  console.log("🔥 CASHIN TESTE CHEGOU")

  return res.status(200).json({
    ok: true,
    message: "cashin funcionando",
    body: req.body,
  })
}
