import crypto from "crypto";
import type { VercelRequest, VercelResponse } from "@vercel/node";

export default function handler(req: VercelRequest, res: VercelResponse) {
  if (req.method !== "POST") {
    return res.status(405).json({ error: "Method not allowed" });
  }

  const { creatorId, postId, fileName } = req.body;

  if (!creatorId || !postId || !fileName) {
    return res.status(400).json({ error: "Missing fields" });
  }

  const safeFileName = fileName.replace(/[^a-zA-Z0-9.\-_]/g, "");
  const path = `creators/${creatorId}/posts/${postId}/${safeFileName}`;

  const expires = Math.floor(Date.now() / 1000) + 300; // 5 min

  const signature = crypto
    .createHash("sha256")
    .update(process.env.BUNNY_STORAGE_KEY + path + expires)
    .digest("hex");

  return res.status(200).json({
    uploadUrl: `https://storage.bunnycdn.com/${process.env.BUNNY_STORAGE_NAME}/${path}`,
    signature,
    expires,
    path,
  });
}
