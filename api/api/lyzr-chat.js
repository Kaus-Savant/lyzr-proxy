// api/lyzr-chat.js
export default async function handler(req, res) {
  if (req.method !== 'POST') return res.status(405).json({ error: 'Only POST allowed' });

  const apiKey = process.env.LYZR_API_KEY;
  if (!apiKey) return res.status(500).json({ error: 'Missing LYZR_API_KEY env var' });

  try {
    const lyzrRes = await fetch('https://agent-prod.studio.lyzr.ai/v3/inference/chat/', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'x-api-key': apiKey
      },
      body: JSON.stringify(req.body)
    });

    const data = await lyzrRes.json();
    return res.status(lyzrRes.status).json(data);
  } catch (err) {
    return res.status(500).json({ error: err.message });
  }
}
