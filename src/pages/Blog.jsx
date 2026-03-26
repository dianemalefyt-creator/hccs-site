import { useState } from 'react'
import { Link, useParams, useNavigate } from 'react-router-dom'
import { POSTS } from '../data/blog'
import { getAllPosts } from './Admin'

function renderBody(text, navigate) {
  const lines = text.trim().split('\n')
  const elements = []
  let i = 0

  while (i < lines.length) {
    const line = lines[i]

    if (line.startsWith('## ')) {
      elements.push(<h2 key={i} style={{ fontSize: 22, fontWeight: 700, color: '#0f172a', margin: '32px 0 12px' }}>{line.slice(3)}</h2>)
    } else if (line.startsWith('**') && line.endsWith('**')) {
      elements.push(<p key={i} style={{ fontSize: 16, lineHeight: 1.7, color: '#334155', fontWeight: 700, margin: '16px 0 4px' }}>{line.slice(2, -2)}</p>)
    } else if (line.startsWith('**') && line.includes('**:')) {
      const boldEnd = line.indexOf('**:')
      const bold = line.slice(2, boldEnd)
      const rest = line.slice(boldEnd + 3)
      elements.push(<p key={i} style={{ fontSize: 16, lineHeight: 1.7, color: '#334155', margin: '12px 0' }}><strong>{bold}:</strong>{renderInline(rest, navigate)}</p>)
    } else if (line.trim() === '') {
      // skip blank lines
    } else {
      elements.push(<p key={i} style={{ fontSize: 16, lineHeight: 1.7, color: '#475569', margin: '12px 0' }}>{renderInline(line, navigate)}</p>)
    }
    i++
  }
  return elements
}

function renderInline(text, navigate) {
  const parts = text.split(/(\[[^\]]+\]\([^)]+\)|\*\*[^*]+\*\*)/g)
  return parts.map((part, i) => {
    const linkMatch = part.match(/\[([^\]]+)\]\(([^)]+)\)/)
    if (linkMatch) {
      const [, label, href] = linkMatch
      if (href.startsWith('/')) {
        return <a key={i} href={href} onClick={e => { e.preventDefault(); navigate(href) }} style={{ color: '#2563eb', fontWeight: 500 }}>{label}</a>
      }
      return <a key={i} href={href} target="_blank" rel="noopener" style={{ color: '#2563eb' }}>{label}</a>
    }
    const boldMatch = part.match(/\*\*([^*]+)\*\*/)
    if (boldMatch) return <strong key={i}>{boldMatch[1]}</strong>
    return <span key={i}>{part}</span>
  })
}

const CATEGORIES = ['All', 'Governance', 'AI & Hiring', 'Research', 'Compliance', 'Tools', 'Case Studies', 'Opinion']

function BlogList() {
  const [cat, setCat] = useState('All')
  const allPosts = getAllPosts()
  const filtered = cat === 'All' ? allPosts : allPosts.filter(p => p.category === cat)

  return (
    <div style={{ minHeight: '100vh', background: '#f8fafc' }}>
      <section style={{ background: 'linear-gradient(165deg, #0a1628, #1a2d4a, #0f3460)', padding: '80px 24px 60px' }}>
        <div style={{ maxWidth: 800, margin: '0 auto', textAlign: 'center' }}>
          <div style={{ letterSpacing: '0.25em', fontSize: 12, textTransform: 'uppercase', color: '#5b9bd5', marginBottom: 16, fontWeight: 500 }}>HCCS™ Blog</div>
          <h1 style={{ fontSize: 40, fontWeight: 700, color: '#fff', margin: '0 0 16px' }}>Insights on hiring governance</h1>
          <p style={{ fontSize: 17, color: '#94a3b8', maxWidth: 560, margin: '0 auto', lineHeight: 1.6 }}>
            Research, analysis, and practical guidance on building audit-ready hiring practices.
          </p>
        </div>
      </section>

      <section style={{ padding: '32px 24px 0' }}>
        <div style={{ maxWidth: 800, margin: '0 auto', display: 'flex', gap: 8, flexWrap: 'wrap' }}>
          {CATEGORIES.map(c => (
            <button key={c} onClick={() => setCat(c)} style={{
              padding: '6px 16px', borderRadius: 20, fontSize: 13, fontWeight: 600, cursor: 'pointer',
              background: cat === c ? '#0f172a' : '#fff', color: cat === c ? '#fff' : '#64748b',
              border: cat === c ? '1px solid #0f172a' : '1px solid #e2e8f0',
            }}>{c}</button>
          ))}
        </div>
      </section>

      <section style={{ padding: '32px 24px 80px' }}>
        <div style={{ maxWidth: 800, margin: '0 auto' }}>
          {filtered.map(post => (
            <Link key={post.slug} to={`/blog/${post.slug}`} style={{ textDecoration: 'none', display: 'block', marginBottom: 20 }}>
              <article style={{
                background: '#fff', border: '1px solid #e2e8f0', borderRadius: 14, padding: '28px 32px',
                transition: 'border-color 0.2s, box-shadow 0.2s',
              }}
                onMouseOver={e => { e.currentTarget.style.borderColor = '#2563eb'; e.currentTarget.style.boxShadow = '0 4px 16px rgba(37,99,235,0.08)' }}
                onMouseOut={e => { e.currentTarget.style.borderColor = '#e2e8f0'; e.currentTarget.style.boxShadow = 'none' }}>
                <div style={{ display: 'flex', gap: 12, marginBottom: 8, alignItems: 'center' }}>
                  <span style={{ fontSize: 12, fontWeight: 600, color: '#2563eb', background: '#eff6ff', padding: '3px 10px', borderRadius: 12 }}>{post.category}</span>
                  <span style={{ fontSize: 12, color: '#94a3b8' }}>{new Date(post.date).toLocaleDateString('en-US', { month: 'long', day: 'numeric', year: 'numeric' })}</span>
                  <span style={{ fontSize: 12, color: '#94a3b8' }}>{post.readTime}</span>
                </div>
                <h2 style={{ fontSize: 22, fontWeight: 700, color: '#0f172a', margin: '0 0 8px', lineHeight: 1.3 }}>{post.title}</h2>
                <p style={{ fontSize: 15, color: '#64748b', lineHeight: 1.6, margin: 0 }}>{post.excerpt}</p>
              </article>
            </Link>
          ))}
          {filtered.length === 0 && (
            <div style={{ textAlign: 'center', padding: 48, color: '#94a3b8' }}>No posts in this category yet.</div>
          )}
        </div>
      </section>
    </div>
  )
}

function BlogPost() {
  const { slug } = useParams()
  const navigate = useNavigate()
  const allPosts = getAllPosts()
  const post = allPosts.find(p => p.slug === slug)

  if (!post) return (
    <div style={{ minHeight: '60vh', display: 'flex', alignItems: 'center', justifyContent: 'center', flexDirection: 'column', gap: 16 }}>
      <h1 style={{ fontSize: 28, color: '#0f172a' }}>Post not found</h1>
      <Link to="/blog" style={{ color: '#2563eb', fontWeight: 500 }}>Back to blog</Link>
    </div>
  )

  return (
    <div style={{ minHeight: '100vh', background: '#f8fafc' }}>
      <section style={{ background: 'linear-gradient(165deg, #0a1628, #1a2d4a, #0f3460)', padding: '80px 24px 60px' }}>
        <div style={{ maxWidth: 720, margin: '0 auto' }}>
          <Link to="/blog" style={{ fontSize: 13, color: '#5b9bd5', fontWeight: 500, display: 'inline-block', marginBottom: 20 }}>← Back to blog</Link>
          <div style={{ display: 'flex', gap: 12, marginBottom: 12, alignItems: 'center' }}>
            <span style={{ fontSize: 12, fontWeight: 600, color: '#fff', background: 'rgba(37,99,235,0.3)', padding: '3px 10px', borderRadius: 12 }}>{post.category}</span>
            <span style={{ fontSize: 13, color: '#94a3b8' }}>{new Date(post.date).toLocaleDateString('en-US', { month: 'long', day: 'numeric', year: 'numeric' })}</span>
            <span style={{ fontSize: 13, color: '#94a3b8' }}>{post.readTime}</span>
          </div>
          <h1 style={{ fontSize: 36, fontWeight: 700, color: '#fff', margin: 0, lineHeight: 1.2 }}>{post.title}</h1>
          <div style={{ fontSize: 14, color: '#64748b', marginTop: 16 }}>By {post.author}</div>
        </div>
      </section>

      <section style={{ padding: '48px 24px 80px' }}>
        <div style={{ maxWidth: 720, margin: '0 auto' }}>
          <article style={{ background: '#fff', border: '1px solid #e2e8f0', borderRadius: 14, padding: '40px 44px' }}>
            {renderBody(post.body, navigate)}
          </article>

          {/* Author */}
          <div style={{ display: 'flex', gap: 20, alignItems: 'center', marginTop: 32, padding: 24, background: '#fff', border: '1px solid #e2e8f0', borderRadius: 12 }}>
            <img src="/di-malefyt.png" alt="Diane Malefyt" style={{ width: 64, height: 64, borderRadius: '50%', objectFit: 'cover', flexShrink: 0 }} />
            <div>
              <div style={{ fontSize: 15, fontWeight: 700, color: '#0f172a' }}>{post.author}</div>
              <div style={{ fontSize: 13, color: '#64748b', lineHeight: 1.5 }}>Author of the HCCS™ Standard. Senior B2B SaaS executive. M.S. candidate, Forensic and Organizational Psychology, ASU.</div>
              <a href="https://www.linkedin.com/in/dianemalefyt/" target="_blank" rel="noopener" style={{ fontSize: 13, color: '#2563eb', fontWeight: 500 }}>Connect on LinkedIn</a>
            </div>
          </div>

          {/* Related posts */}
          {allPosts.filter(p => p.slug !== slug).length > 0 && (
            <div style={{ marginTop: 40 }}>
              <h3 style={{ fontSize: 18, fontWeight: 700, color: '#0f172a', marginBottom: 16 }}>More from the HCCS™ blog</h3>
              <div style={{ display: 'grid', gap: 12 }}>
                {allPosts.filter(p => p.slug !== slug).slice(0, 3).map(p => (
                  <Link key={p.slug} to={`/blog/${p.slug}`} style={{ textDecoration: 'none' }}>
                    <div style={{ background: '#fff', border: '1px solid #e2e8f0', borderRadius: 10, padding: '16px 20px', transition: 'border-color 0.2s' }}
                      onMouseOver={e => e.currentTarget.style.borderColor = '#2563eb'}
                      onMouseOut={e => e.currentTarget.style.borderColor = '#e2e8f0'}>
                      <div style={{ fontSize: 15, fontWeight: 600, color: '#0f172a', marginBottom: 4 }}>{p.title}</div>
                      <div style={{ fontSize: 13, color: '#64748b' }}>{p.readTime} · {p.category}</div>
                    </div>
                  </Link>
                ))}
              </div>
            </div>
          )}
        </div>
      </section>
    </div>
  )
}

export { BlogList, BlogPost }
