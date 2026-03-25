import { Link, useLocation } from 'react-router-dom'
import { useState } from 'react'

export default function Nav() {
  const { pathname } = useLocation()
  const [open, setOpen] = useState(false)
  const isAssess = pathname.startsWith('/assess')

  const links = [
    { to: '/', label: 'Home' },
    { to: '/assess', label: 'Assessment' },
    { to: '/documents', label: 'Documents' },
    { to: '/about', label: 'About' },
  ]

  return (
    <nav style={{ background: '#0a1628', borderBottom: '1px solid rgba(255,255,255,0.06)', position: 'sticky', top: 0, zIndex: 50 }}>
      <div style={{ maxWidth: 1100, margin: '0 auto', padding: '0 24px', display: 'flex', justifyContent: 'space-between', alignItems: 'center', height: 64 }}>
        <Link to="/" style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
          <span style={{ fontSize: 20, fontWeight: 700, color: '#fff', letterSpacing: '0.08em' }}>HCCS™</span>
          <span style={{ fontSize: 12, color: '#5b9bd5', fontWeight: 500, letterSpacing: '0.04em' }}>STANDARD</span>
        </Link>

        {/* Desktop */}
        <div style={{ display: 'flex', gap: 32, alignItems: 'center' }}>
          {links.map(l => (
            <Link key={l.to} to={l.to} style={{
              fontSize: 14, fontWeight: 500, color: pathname === l.to ? '#5b9bd5' : '#94a3b8',
              transition: 'color 0.2s', borderBottom: pathname === l.to ? '2px solid #5b9bd5' : '2px solid transparent',
              paddingBottom: 4,
            }}>{l.label}</Link>
          ))}
          {!isAssess && <Link to="/assess" style={{
            background: '#2563eb', color: '#fff', padding: '8px 20px', borderRadius: 6,
            fontSize: 13, fontWeight: 600, transition: 'background 0.2s',
          }}>Start assessment</Link>}
        </div>
      </div>
    </nav>
  )
}
