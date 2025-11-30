import { useState } from 'react'

export default function Home() {
  const [ticker, setTicker] = useState('AAPL')
  const [result, setResult] = useState(null)
  const [loading, setLoading] = useState(false)

  async function predict() {
    setLoading(true)
    setResult(null)
    try {
      const res = await fetch('/api/predict', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ ticker })
      })
      const data = await res.json()
      setResult(data)
    } catch (e) {
      setResult({ error: 'فشل في الاتصال بالـ API' })
    } finally {
      setLoading(false)
    }
  }

  return (
    <div style={{ maxWidth: 720, margin: '40px auto', fontFamily: 'Arial, sans-serif' }}>
      <h1>نظام التنبؤ بالأسهم (نسخة سريعة)</h1>
      <p>أدخل رمز السهم ثم اضغط "تنبؤ". هذه نسخة تجريبية تستخدم نموذجاً افتراضياً.</p>

      <div style={{ display: 'flex', gap: 8, marginBottom: 12 }}>
        <input value={ticker} onChange={e => setTicker(e.target.value.toUpperCase())}
               style={{ flex: 1, padding: 8, fontSize: 16 }} />
        <button onClick={predict} style={{ padding: '8px 16px', fontSize: 16 }} disabled={loading}>
          {loading ? 'جاري...' : 'تنبؤ'}
        </button>
      </div>

      {result && (
        <div style={{ marginTop: 16, padding: 12, border: '1px solid #ddd', borderRadius: 6 }}>
          <pre style={{ margin: 0 }}>{JSON.stringify(result, null, 2)}</pre>
        </div>
      )}

      <hr style={{ margin: '24px 0' }} />
      <small>لتوصيل نموذج حقيقي لاحقاً يمكن إضافة خدمة ML أو استدعاء واجهة خارجية.</small>
    </div>
  )
}
