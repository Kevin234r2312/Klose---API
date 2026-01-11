export default function handler(req, res) {
  res.status(200).json({
    hasAuth: Boolean(process.env.BLUPAY_AUTH),
    authLength: process.env.BLUPAY_AUTH?.length || 0,
  })
}
