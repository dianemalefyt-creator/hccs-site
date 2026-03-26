import { Link, useLocation } from 'react-router-dom'
import { useState, useRef, useEffect } from 'react'

const NAV = [
  { label: 'Home', to: '/' },
  { label: 'Assess', children: [
    { label: 'Quick assessment', desc: 'Free, 10 questions, 3 minutes', to: '/assess' },
    { label: 'Full assessment', desc: '67 controls, pricing & access codes', to: '/assess/full' },
  ]},
  { label: 'Standard', children: [
    { label: 'Controls library', desc: 'All 67 controls with definitions', to: '/controls' },
    { label: 'Documents', desc: 'Core Standard, IG, Template Library', to: '/documents' },
    { label: 'Fillable templates', desc: 'Fill online, generate PDF', to: '/templates' },
  ]},
  { label: 'About', children: [
    { label: 'About HCCS\u2122', desc: 'What it is, who built it, why', to: '/about' },
    { label: "Applicant's Bill of Rights", desc: '15 rights for candidates', to: '/rights' },
    { label: "Organization's Bill of Rights", desc: '12 rights for employers', to: '/org-rights' },
    { label: 'Business case & ROI', desc: 'Cost of inaction, how to sell internally', to: '/business-case' },
  ]},
  { label: 'Contact', to: '/contact' },
]

function Dropdown({ item, pathname }) {
  const [open, setOpen] = useState(false)
  const timeout = useRef(null)

  const handleEnter = () => { clearTimeout(timeout.current); setOpen(true) }
  const handleLeave = () => { timeout.current = setTimeout(() => setOpen(false), 150) }

  useEffect(() => { return () => clearTimeout(timeout.current) }, [])

  const childActive = item.children.some(c => pathname === c.to || pathname.startsWith(c.to + '/'))

  return (
    <div onMouseEnter={handleEnter} onMouseLeave={handleLeave} style={{ position: 'relative' }}>
      <button onClick={() => setOpen(!open)} style={{
        fontSize: 14, fontWeight: 500, color: childActive ? '#5b9bd5' : '#94a3b8',
        borderBottom: childActive ? '2px solid #5b9bd5' : '2px solid transparent',
        paddingBottom: 4, background: 'none', border: 'none', cursor: 'pointer',
        display: 'flex', alignItems: 'center', gap: 4, fontFamily: 'inherit',
      }}>
        {item.label}
        <span style={{ fontSize: 10, opacity: 0.6, transition: 'transform 0.2s', transform: open ? 'rotate(180deg)' : 'rotate(0)' }}>▾</span>
      </button>
      {open && (
        <div style={{
          position: 'absolute', top: '100%', left: '50%', transform: 'translateX(-50%)',
          marginTop: 8, background: '#fff', borderRadius: 12, padding: '8px 0',
          boxShadow: '0 12px 32px rgba(0,0,0,0.15), 0 2px 8px rgba(0,0,0,0.08)',
          minWidth: 260, zIndex: 100, border: '1px solid #e2e8f0',
        }}>
          {item.children.map(child => (
            <Link key={child.to} to={child.to} onClick={() => setOpen(false)} style={{
              display: 'block', padding: '10px 18px', textDecoration: 'none',
              background: pathname === child.to ? '#f1f5f9' : 'transparent',
              transition: 'background 0.1s',
            }}
              onMouseOver={e => { if (pathname !== child.to) e.currentTarget.style.background = '#f8fafc' }}
              onMouseOut={e => { if (pathname !== child.to) e.currentTarget.style.background = 'transparent' }}>
              <div style={{ fontSize: 14, fontWeight: 600, color: '#0f172a' }}>{child.label}</div>
              {child.desc && <div style={{ fontSize: 12, color: '#64748b', marginTop: 2 }}>{child.desc}</div>}
            </Link>
          ))}
        </div>
      )}
    </div>
  )
}

export default function Nav() {
  const { pathname } = useLocation()
  const isAssess = pathname.startsWith('/assess')

  return (
    <nav style={{ background: '#0a1628', borderBottom: '1px solid rgba(255,255,255,0.06)', position: 'sticky', top: 0, zIndex: 50 }}>
      <div style={{ maxWidth: 1100, margin: '0 auto', padding: '0 24px', display: 'flex', justifyContent: 'space-between', alignItems: 'center', height: 64 }}>
        <Link to="/" style={{ display: 'flex', alignItems: 'baseline', gap: 6 }}>
          <span style={{ fontSize: 20, fontWeight: 700, color: '#fff', letterSpacing: '0.05em' }}>HCCS</span>
          <span style={{ fontSize: 20, fontWeight: 700, color: '#5b9bd5', letterSpacing: '0.05em' }}>Standard</span>
          <span style={{ fontSize: 10, color: '#5b9bd5', fontWeight: 500, position: 'relative', top: -8 }}>™</span>
        </Link>

        <div style={{ display: 'flex', gap: 28, alignItems: 'center' }}>
          {NAV.map(item => (
            item.children ? (
              <Dropdown key={item.label} item={item} pathname={pathname} />
            ) : (
              <Link key={item.to} to={item.to} style={{
                fontSize: 14, fontWeight: 500,
                color: pathname === item.to ? '#5b9bd5' : '#94a3b8',
                borderBottom: pathname === item.to ? '2px solid #5b9bd5' : '2px solid transparent',
                paddingBottom: 4,
              }}>{item.label}</Link>
            )
          ))}
          {!isAssess && <Link to="/assess" style={{
            background: '#2563eb', color: '#fff', padding: '8px 20px', borderRadius: 6,
            fontSize: 13, fontWeight: 600,
          }}>Start assessment</Link>}
        </div>
      </div>
    </nav>
  )
}
