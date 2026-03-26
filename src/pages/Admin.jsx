import { useState, useEffect } from 'react'
import { POSTS as STATIC_POSTS } from '../data/blog'

const ADMIN_PASS = 'hccsadmin2026'
const BLOG_STORAGE_KEY = 'hccs_blog_posts'

// Get all posts: static + localStorage
export function getAllPosts() {
  const dynamic = getDynamicPosts()
  // Dynamic posts override static posts with same slug
  const staticFiltered = STATIC_POSTS.filter(sp => !dynamic.find(dp => dp.slug === sp.slug))
  return [...dynamic, ...staticFiltered].sort((a, b) => new Date(b.date) - new Date(a.date))
}

function getDynamicPosts() {
  try { return JSON.parse(localStorage.getItem(BLOG_STORAGE_KEY) || '[]') } catch { return [] }
}

function saveDynamicPosts(posts) {
  localStorage.setItem(BLOG_STORAGE_KEY, JSON.stringify(posts))
}

const CATEGORIES = ['Governance', 'AI & Hiring', 'Research', 'Compliance', 'Tools', 'Case Studies', 'Opinion']

export default function Admin() {
  const [authed, setAuthed] = useState(false)
  const [pass, setPass] = useState('')
  const [passErr, setPassErr] = useState('')
  const [posts, setPosts] = useState([])
  const [editing, setEditing] = useState(null) // null = list, 'new' = new post, slug = editing
  const [form, setForm] = useState({ title: '', slug: '', excerpt: '', category: '', content: '', date: '' })

  useEffect(() => {
    if (authed) setPosts(getAllPosts())
  }, [authed])

  const login = () => {
    if (pass === ADMIN_PASS) { setAuthed(true); setPassErr('') }
    else setPassErr('Wrong password')
  }

  const set = (k, v) => setForm(p => ({ ...p, [k]: v }))

  const autoSlug = (title) => title.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/^-|-$/g, '').slice(0, 60)

  const startNew = () => {
    setForm({ title: '', slug: '', excerpt: '', category: 'Governance', content: '', date: new Date().toISOString().split('T')[0] })
    setEditing('new')
  }

  const startEdit = (post) => {
    setForm({ title: post.title, slug: post.slug, excerpt: post.excerpt, category: post.category, content: post.content, date: post.date })
    setEditing(post.slug)
  }

  const save = () => {
    if (!form.title || !form.content || !form.slug) return
    const dynamic = getDynamicPosts()
    const post = {
      ...form,
      slug: form.slug || autoSlug(form.title),
      date: form.date || new Date().toISOString().split('T')[0],
      author: 'Diane Malefyt',
      authorTitle: 'Author, HCCS™ Standard',
      readTime: `${Math.max(3, Math.ceil(form.content.split(/\s+/).length / 200))} min read`,
    }

    if (editing === 'new') {
      // Check slug collision
      if (dynamic.find(p => p.slug === post.slug)) {
        post.slug = post.slug + '-' + Date.now().toString(36).slice(-4)
      }
      dynamic.unshift(post)
    } else {
      const idx = dynamic.findIndex(p => p.slug === editing)
      if (idx >= 0) {
        dynamic[idx] = post
      } else {
        // Editing a static post - add as dynamic override
        dynamic.unshift(post)
      }
    }

    saveDynamicPosts(dynamic)
    setPosts(getAllPosts())
    setEditing(null)
  }

  const deletePost = (slug) => {
    if (!confirm('Delete this post?')) return
    const dynamic = getDynamicPosts().filter(p => p.slug !== slug)
    saveDynamicPosts(dynamic)
    setPosts(getAllPosts())
  }

  const isStatic = (slug) => STATIC_POSTS.some(p => p.slug === slug) && !getDynamicPosts().some(p => p.slug === slug)

  if (!authed) return (
    <div style={{ minHeight: '100vh', background: '#0a1628', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
      <div style={{ background: '#fff', borderRadius: 16, padding: 40, maxWidth: 400, width: '100%', textAlign: 'center' }}>
        <div style={{ fontSize: 20, fontWeight: 700, color: '#0f172a', marginBottom: 4 }}>HCCS™ Admin</div>
        <div style={{ fontSize: 14, color: '#64748b', marginBottom: 24 }}>Enter admin password to continue</div>
        <input type="password" value={pass} onChange={e => { setPass(e.target.value); setPassErr('') }} placeholder="Password"
          onKeyDown={e => { if (e.key === 'Enter') login() }}
          style={{ width: '100%', padding: '12px 16px', borderRadius: 8, border: `1px solid ${passErr ? '#fca5a5' : '#e2e8f0'}`, fontSize: 14, outline: 'none', boxSizing: 'border-box', marginBottom: 12 }} />
        {passErr && <div style={{ fontSize: 13, color: '#dc2626', marginBottom: 12 }}>{passErr}</div>}
        <button onClick={login} style={{ width: '100%', padding: '12px', borderRadius: 8, border: 'none', background: '#2563eb', color: '#fff', fontSize: 15, fontWeight: 600, cursor: 'pointer' }}>Log in</button>
      </div>
    </div>
  )

  if (editing) return (
    <div style={{ minHeight: '100vh', background: '#f8fafc' }}>
      <div style={{ background: '#0a1628', padding: '20px 24px', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
        <div style={{ fontSize: 16, fontWeight: 700, color: '#fff' }}>
          {editing === 'new' ? 'New blog post' : `Editing: ${form.title || editing}`}
        </div>
        <button onClick={() => setEditing(null)} style={{ background: 'none', border: '1px solid rgba(255,255,255,0.2)', color: '#94a3b8', padding: '6px 16px', borderRadius: 6, cursor: 'pointer', fontSize: 13 }}>Cancel</button>
      </div>
      <div style={{ maxWidth: 800, margin: '0 auto', padding: '32px 24px' }}>
        <div style={{ marginBottom: 16 }}>
          <label style={{ display: 'block', fontSize: 12, fontWeight: 600, color: '#334155', marginBottom: 4 }}>Title</label>
          <input value={form.title} onChange={e => { set('title', e.target.value); if (editing === 'new') set('slug', autoSlug(e.target.value)) }}
            style={{ width: '100%', padding: '12px 14px', borderRadius: 8, border: '1px solid #e2e8f0', fontSize: 16, fontWeight: 600, outline: 'none', boxSizing: 'border-box' }} />
        </div>
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr 1fr', gap: 12, marginBottom: 16 }}>
          <div>
            <label style={{ display: 'block', fontSize: 12, fontWeight: 600, color: '#334155', marginBottom: 4 }}>Slug (URL path)</label>
            <input value={form.slug} onChange={e => set('slug', e.target.value)}
              style={{ width: '100%', padding: '10px 12px', borderRadius: 8, border: '1px solid #e2e8f0', fontSize: 13, fontFamily: 'monospace', outline: 'none', boxSizing: 'border-box' }} />
          </div>
          <div>
            <label style={{ display: 'block', fontSize: 12, fontWeight: 600, color: '#334155', marginBottom: 4 }}>Category</label>
            <select value={form.category} onChange={e => set('category', e.target.value)}
              style={{ width: '100%', padding: '10px 12px', borderRadius: 8, border: '1px solid #e2e8f0', fontSize: 14, background: '#fff' }}>
              {CATEGORIES.map(c => <option key={c} value={c}>{c}</option>)}
            </select>
          </div>
          <div>
            <label style={{ display: 'block', fontSize: 12, fontWeight: 600, color: '#334155', marginBottom: 4 }}>Date</label>
            <input type="date" value={form.date} onChange={e => set('date', e.target.value)}
              style={{ width: '100%', padding: '10px 12px', borderRadius: 8, border: '1px solid #e2e8f0', fontSize: 14, outline: 'none', boxSizing: 'border-box' }} />
          </div>
        </div>
        <div style={{ marginBottom: 16 }}>
          <label style={{ display: 'block', fontSize: 12, fontWeight: 600, color: '#334155', marginBottom: 4 }}>Excerpt (shown in listing and meta)</label>
          <textarea value={form.excerpt} onChange={e => set('excerpt', e.target.value)} rows={2}
            style={{ width: '100%', padding: '10px 12px', borderRadius: 8, border: '1px solid #e2e8f0', fontSize: 14, outline: 'none', fontFamily: 'inherit', resize: 'vertical', boxSizing: 'border-box', lineHeight: 1.5 }} />
        </div>
        <div style={{ marginBottom: 16 }}>
          <label style={{ display: 'block', fontSize: 12, fontWeight: 600, color: '#334155', marginBottom: 4 }}>Content (Markdown supported: ## headings, **bold**, *italic*, - lists, > blockquotes)</label>
          <textarea value={form.content} onChange={e => set('content', e.target.value)} rows={20}
            style={{ width: '100%', padding: '14px', borderRadius: 8, border: '1px solid #e2e8f0', fontSize: 14, outline: 'none', fontFamily: "'IBM Plex Mono', monospace", resize: 'vertical', boxSizing: 'border-box', lineHeight: 1.7 }} />
        </div>
        <div style={{ display: 'flex', gap: 12 }}>
          <button onClick={save} disabled={!form.title || !form.content}
            style={{ padding: '14px 32px', borderRadius: 8, border: 'none', background: form.title && form.content ? '#059669' : '#94a3b8', color: '#fff', fontSize: 15, fontWeight: 600, cursor: form.title && form.content ? 'pointer' : 'default' }}>
            {editing === 'new' ? 'Publish post' : 'Save changes'}
          </button>
          <button onClick={() => setEditing(null)} style={{ padding: '14px 24px', borderRadius: 8, border: '1px solid #e2e8f0', background: '#fff', color: '#64748b', fontSize: 15, cursor: 'pointer' }}>Cancel</button>
        </div>
        {form.content && (
          <div style={{ marginTop: 32, paddingTop: 24, borderTop: '1px solid #e2e8f0' }}>
            <div style={{ fontSize: 12, fontWeight: 600, color: '#64748b', marginBottom: 12 }}>Preview</div>
            <div style={{ background: '#fff', border: '1px solid #e2e8f0', borderRadius: 12, padding: '32px 28px' }}>
              <h1 style={{ fontSize: 24, fontWeight: 700, color: '#0f172a', margin: '0 0 8px' }}>{form.title}</h1>
              <div style={{ fontSize: 13, color: '#64748b', marginBottom: 20 }}>{form.date} · {form.category} · Diane Malefyt</div>
              <div style={{ fontSize: 15, lineHeight: 1.8, color: '#334155' }}>
                {form.content.split('\n').map((line, i) => {
                  if (line.startsWith('## ')) return <h2 key={i} style={{ fontSize: 20, fontWeight: 700, color: '#0f172a', margin: '24px 0 8px' }}>{line.slice(3)}</h2>
                  if (line.startsWith('### ')) return <h3 key={i} style={{ fontSize: 17, fontWeight: 600, color: '#0f172a', margin: '20px 0 6px' }}>{line.slice(4)}</h3>
                  if (line.startsWith('> ')) return <blockquote key={i} style={{ borderLeft: '3px solid #5b9bd5', paddingLeft: 16, margin: '12px 0', color: '#475569', fontStyle: 'italic' }}>{line.slice(2)}</blockquote>
                  if (line.startsWith('- ')) return <div key={i} style={{ paddingLeft: 16, marginBottom: 4 }}>• {line.slice(2)}</div>
                  if (line.trim() === '') return <div key={i} style={{ height: 12 }} />
                  return <p key={i} style={{ margin: '0 0 8px' }}>{line}</p>
                })}
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  )

  return (
    <div style={{ minHeight: '100vh', background: '#f8fafc' }}>
      <div style={{ background: '#0a1628', padding: '20px 24px', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: 16 }}>
          <div style={{ fontSize: 16, fontWeight: 700, color: '#fff' }}>HCCS™ Admin</div>
          <a href="/" style={{ fontSize: 13, color: '#5b9bd5' }}>← Back to site</a>
        </div>
        <button onClick={() => setAuthed(false)} style={{ background: 'none', border: '1px solid rgba(255,255,255,0.2)', color: '#94a3b8', padding: '6px 16px', borderRadius: 6, cursor: 'pointer', fontSize: 13 }}>Log out</button>
      </div>
      <div style={{ maxWidth: 900, margin: '0 auto', padding: '32px 24px' }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 24 }}>
          <h1 style={{ fontSize: 24, fontWeight: 700, color: '#0f172a', margin: 0 }}>Blog posts ({posts.length})</h1>
          <button onClick={startNew} style={{ padding: '10px 24px', borderRadius: 8, border: 'none', background: '#2563eb', color: '#fff', fontSize: 14, fontWeight: 600, cursor: 'pointer' }}>+ New post</button>
        </div>

        {posts.length === 0 ? (
          <div style={{ textAlign: 'center', padding: 48, color: '#64748b' }}>No posts yet. Click "New post" to create one.</div>
        ) : (
          posts.map(post => (
            <div key={post.slug} style={{ background: '#fff', border: '1px solid #e2e8f0', borderRadius: 10, padding: '18px 22px', marginBottom: 10, display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' }}>
              <div style={{ flex: 1 }}>
                <div style={{ display: 'flex', gap: 8, alignItems: 'center', marginBottom: 4 }}>
                  <div style={{ fontSize: 16, fontWeight: 600, color: '#0f172a' }}>{post.title}</div>
                  {isStatic(post.slug) && <span style={{ fontSize: 10, padding: '2px 8px', borderRadius: 4, background: '#f1f5f9', color: '#64748b', fontWeight: 600 }}>Built-in</span>}
                </div>
                <div style={{ fontSize: 13, color: '#64748b' }}>
                  {post.date} · {post.category} · /blog/{post.slug}
                </div>
                {post.excerpt && <div style={{ fontSize: 13, color: '#94a3b8', marginTop: 4 }}>{post.excerpt.slice(0, 120)}...</div>}
              </div>
              <div style={{ display: 'flex', gap: 8, flexShrink: 0, marginLeft: 16 }}>
                <button onClick={() => startEdit(post)} style={{ padding: '6px 14px', borderRadius: 6, border: '1px solid #e2e8f0', background: '#fff', color: '#2563eb', fontSize: 12, fontWeight: 600, cursor: 'pointer' }}>Edit</button>
                <button onClick={() => deletePost(post.slug)} style={{ padding: '6px 14px', borderRadius: 6, border: '1px solid #fecaca', background: '#fff', color: '#dc2626', fontSize: 12, fontWeight: 600, cursor: 'pointer' }}>Delete</button>
                <a href={`/blog/${post.slug}`} target="_blank" style={{ padding: '6px 14px', borderRadius: 6, border: '1px solid #e2e8f0', background: '#f8fafc', color: '#475569', fontSize: 12, fontWeight: 600, textDecoration: 'none' }}>View</a>
              </div>
            </div>
          ))
        )}

        <div style={{ marginTop: 40, padding: 24, background: '#0f172a', borderRadius: 12 }}>
          <div style={{ fontSize: 14, fontWeight: 600, color: '#fff', marginBottom: 8 }}>Quick reference</div>
          <div style={{ fontSize: 13, color: '#94a3b8', lineHeight: 1.7 }}>
            Posts use Markdown-style formatting: <code style={{ background: '#1e293b', padding: '2px 6px', borderRadius: 4 }}>## Heading</code>, <code style={{ background: '#1e293b', padding: '2px 6px', borderRadius: 4 }}>**bold**</code>, <code style={{ background: '#1e293b', padding: '2px 6px', borderRadius: 4 }}>*italic*</code>, <code style={{ background: '#1e293b', padding: '2px 6px', borderRadius: 4 }}>{'>'}  blockquote</code>, <code style={{ background: '#1e293b', padding: '2px 6px', borderRadius: 4 }}>- list item</code>
          </div>
          <div style={{ fontSize: 13, color: '#64748b', marginTop: 8 }}>
            Built-in posts (from code) can be overridden by editing them here. New posts are stored in your browser's local storage. To make posts permanent across devices, export and add to src/data/blog.js.
          </div>
        </div>
      </div>
    </div>
  )
}
