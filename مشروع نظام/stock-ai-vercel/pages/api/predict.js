export default function handler(req, res) {
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' })
  }
  const { ticker } = req.body || {}
  if (!ticker) return res.status(400).json({ error: 'ticker required' })

  // Placeholder prediction logic (randomized for demo)
  const rand = Math.random()
  const prediction = rand > 0.5 ? 'up' : 'down'
  const confidence = Math.round((0.5 + Math.abs(rand - 0.5)) * 100) / 100 // 0.5..1.0
  const response = {
    ticker: ticker.toUpperCase(),
    prediction,
    confidence,
    timestamp: new Date().toISOString()
  }

  // Simulate small delay
  setTimeout(() => res.status(200).json(response), 600)
}
