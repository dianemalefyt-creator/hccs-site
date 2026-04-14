import { Link } from 'react-router-dom'

export default function NotFound() {
  return (
    <div style={{ minHeight: '100vh', background: '#f8fafc', display: 'flex', alignItems: 'center', justifyContent: 'center', padding: 24 }}>
      <div style={{ textAlign: 'center', maxWidth: 480 }}>
        <div style={{ fontSize: 72, fontWeight: 700, color: '#e2e8f0', marginBottom: 8 }}>404</div>
        <h1 style={{ fontSize: 28, fontWeight: 700, color: '#0f172a', marginBottom: 12 }}>Page not found</h1>
        <p style={{ fontSize: 16, color: '#64748b', lineHeight: 1.6, marginBottom: 32 }}>
          The page you are looking for does not exist or has been moved.
        </p>
        <div style={{ display: 'flex', gap: 12, justifyContent: 'center', flexWrap: 'wrap' }}>
          <Link to="/" style={{ background: '#2563eb', color: '#fff', padding: '12px 28px', borderRadius: 8, fontSize: 15, fontWeight: 600, textDecoration: 'none' }}>Go home</Link>
          <Link to="/assess" style={{ background: '#fff', color: '#0f172a', padding: '12px 28px', borderRadius: 8, fontSize: 15, fontWeight: 600, textDecoration: 'none', border: '1px solid #e2e8f0' }}>Assess your governance</Link>
        </div>
      </div>
    </div>
  )
}
