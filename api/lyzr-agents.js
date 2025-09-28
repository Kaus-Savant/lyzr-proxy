// api/lyzr-agents.js
export default async function handler(req, res) {
  if (req.method !== 'GET') return res.status(405).json({ error: 'Only GET allowed' });

  const apiKey = process.env.LYZR_API_KEY;
  if (!apiKey) return res.status(500).json({ error: 'Missing LYZR_API_KEY env var' });

  try {
    const r = await fetch('https://agent-prod.studio.lyzr.ai/v3/agents/', {
      method: 'GET',
      headers: {
        'accept': 'application/json',
        'x-api-key': apiKey
      }
    });
    const data = await r.json();
    return res.status(r.status).json(data);
  } catch (err) {
    return res.status(500).json({ error: err.message });
  }
}
