import { useState, useEffect } from 'react'
import { fetchPosts, createPost, updatePost, deletePostApi, togglePostStatus, STATIC_POSTS } from '../lib/blog'
import { fetchDocs, createDoc, updateDoc, deleteDocApi, STATIC_DOCS } from '../lib/docs'

// Password checked via SHA-256 hash - actual password not stored in source
const ADMIN_HASH = '1c332aa95ebca407af243b2365f811ba6e723bad264b26425adfc67690f10274'
async function hashPass(p) {
  const buf = await crypto.subtle.digest('SHA-256', new TextEncoder().encode(p))
  return Array.from(new Uint8Array(buf)).map(b => b.toString(16).padStart(2, '0')).join('')
}

const CATEGORIES = ['Governance', 'AI & Hiring', 'Research', 'Compliance', 'Tools', 'Case Studies', 'Opinion']

function renderBold(text) {
  if (!text) return text
  const parts = text.split(/(\*\*[^*]+\*\*)/g)
  return parts.map((part, i) => {
    const m = part.match(/^\*\*([^*]+)\*\*$/)
    if (m) return <strong key={i}>{m[1]}</strong>
    return <span key={i}>{part}</span>
  })
}

export default function Admin() {
  const [authed, setAuthed] = useState(false)
  const [adminKey, setAdminKey] = useState('')
  const [pass, setPass] = useState('')
  const [passErr, setPassErr] = useState('')
  const [posts, setPosts] = useState([])
  const [editing, setEditing] = useState(null)
  const [form, setForm] = useState({ title: '', slug: '', excerpt: '', category: '', content: '', date: '' })
  const [tab, setTab] = useState('blog')
  const [docs, setDocs] = useState([])
  const [editingDoc, setEditingDoc] = useState(null)
  const [docForm, setDocForm] = useState({ docId: '', title: '', subtitle: '', desc: '', details: '', file: '', color: '#185FA5', pages: '', format: 'pdf', sortOrder: 99, status: 'published' })

  const [loading, setLoading] = useState(false)
  const [saveMsg, setSaveMsg] = useState('')

  const refreshPosts = async () => {
    setLoading(true)
    try {
      const p = await fetchPosts(true)
      setPosts(p)
    } catch { }
    setLoading(false)
  }

  const refreshDocs = async () => {
    try {
      const d = await fetchDocs(true)
      setDocs(d)
    } catch { }
  }

  useEffect(() => {
    if (authed) { refreshPosts(); refreshDocs() }
  }, [authed])

  const login = async () => {
    const h = await hashPass(pass)
    if (h === ADMIN_HASH) { setAuthed(true); setAdminKey(h); setPassErr('') }
    else setPassErr('Wrong password')
  }

  const set = (k, v) => { setSaveMsg(''); setForm(p => ({ ...p, [k]: v })) }

  const autoSlug = (title) => title.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/^-|-$/g, '').slice(0, 60)

  const startNew = () => {
    setSaveMsg('')
    setForm({ title: '', slug: '', excerpt: '', category: 'Governance', content: '', date: new Date().toISOString().split('T')[0], author: 'Diane Malefyt', authorTitle: 'Author, HCCS™ Standard', status: 'draft' })
    setEditing('new')
  }

  const startEdit = (post) => {
    setSaveMsg('')
    setForm({ title: post.title, slug: post.slug, excerpt: post.excerpt, category: post.category, content: post.body || post.content || '', date: post.date, author: post.author || 'Diane Malefyt', authorTitle: post.authorTitle || '', status: post.status || 'published', _recordId: post.id || null })
    setEditing(post.slug)
  }

  const savePost = async (publishStatus) => {
    if (!form.title || !form.content) {
      setSaveMsg('Error: Title and content are required.')
      return
    }
    const slug = form.slug || autoSlug(form.title)
    if (!slug) {
      setSaveMsg('Error: Could not generate a URL slug.')
      return
    }
    setSaveMsg('Saving...')
    setLoading(true)
    const post = {
      title: form.title,
      slug,
      excerpt: form.excerpt || '',
      category: form.category || 'Governance',
      body: form.content,
      date: form.date || new Date().toISOString().split('T')[0],
      author: form.author || 'Diane Malefyt',
      authorTitle: form.authorTitle || '',
      status: publishStatus || form.status || 'draft',
      readTime: `${Math.max(3, Math.ceil(form.content.split(/\s+/).length / 200))} min read`,
    }

    try {
      let result
      if (editing === 'new') {
        result = await createPost(post, adminKey)
      } else if (form._recordId) {
        result = await updatePost(form._recordId, post, adminKey)
      } else {
        result = await createPost(post, adminKey)
      }
      if (result.error) throw new Error(result.error)
      setSaveMsg('')
      await refreshPosts()
      setEditing(null)
    } catch (err) {
      console.error('Save error:', err)
      setSaveMsg('Error: ' + (err.message || 'Save failed. Is the Blog table created in Airtable?'))
      setLoading(false)
    }
  }

  const handleToggleStatus = async (post) => {
    if (!post.id) {
      alert('Cannot toggle built-in posts. Edit and save to Airtable first.')
      return
    }
    setLoading(true)
    await togglePostStatus(post.id, adminKey)
    await refreshPosts()
  }

  const handleDelete = async (post) => {
    if (!confirm('Delete this post permanently?')) return
    if (!post.id) {
      alert('Cannot delete built-in posts.')
      return
    }
    setLoading(true)
    await deletePostApi(post.id, adminKey)
    await refreshPosts()
  }

  const isStatic = (post) => post.source === 'static' && !post.id

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
        <div style={{ display: 'flex', gap: 10, alignItems: 'center' }}>
          <button onClick={() => setEditing(null)} style={{ background: 'none', border: '1px solid rgba(255,255,255,0.2)', color: '#94a3b8', padding: '6px 16px', borderRadius: 6, cursor: 'pointer', fontSize: 13 }}>Cancel</button>
          <button onClick={() => savePost('draft')} disabled={loading || !form.title || !form.content}
            style={{ padding: '6px 20px', borderRadius: 6, border: '1px solid rgba(255,255,255,0.2)', background: 'transparent', color: '#cbd5e1', fontSize: 13, fontWeight: 600, cursor: form.title && form.content ? 'pointer' : 'default' }}>
            Save draft
          </button>
          <button onClick={() => savePost('published')} disabled={loading || !form.title || !form.content}
            style={{ padding: '6px 20px', borderRadius: 6, border: 'none', background: form.title && form.content ? '#059669' : '#475569', color: '#fff', fontSize: 13, fontWeight: 600, cursor: form.title && form.content ? 'pointer' : 'default' }}>
            Publish
          </button>
        </div>
      </div>
      <div style={{ maxWidth: 800, margin: '0 auto', padding: '32px 24px' }}>
        <div style={{ marginBottom: 16 }}>
          <label style={{ display: 'block', fontSize: 12, fontWeight: 600, color: '#334155', marginBottom: 4 }}>Title</label>
          <input value={form.title} onChange={e => { set('title', e.target.value); if (editing === 'new') set('slug', autoSlug(e.target.value)) }}
            style={{ width: '100%', padding: '12px 14px', borderRadius: 8, border: '1px solid #e2e8f0', fontSize: 16, fontWeight: 600, outline: 'none', boxSizing: 'border-box' }} />
        </div>
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr 1fr', gap: 12, marginBottom: 16 }}>
          <div>
            <label style={{ display: 'block', fontSize: 12, fontWeight: 600, color: '#334155', marginBottom: 4 }}>URL</label>
            <div style={{ display: 'flex', alignItems: 'center', borderRadius: 8, border: '1px solid #e2e8f0', overflow: 'hidden' }}>
              <span style={{ padding: '10px 0 10px 12px', fontSize: 13, color: '#94a3b8', background: '#f8fafc', whiteSpace: 'nowrap', userSelect: 'all' }}>hccsstandard.com/blog/</span>
              <input value={form.slug} onChange={e => set('slug', e.target.value.toLowerCase().replace(/[^a-z0-9-]/g, ''))}
                style={{ flex: 1, padding: '10px 12px 10px 0', borderRadius: 0, border: 'none', fontSize: 13, fontFamily: 'monospace', outline: 'none', boxSizing: 'border-box', background: '#f8fafc' }} />
            </div>
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
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 12, marginBottom: 16 }}>
          <div>
            <label style={{ display: 'block', fontSize: 12, fontWeight: 600, color: '#334155', marginBottom: 4 }}>Author</label>
            <input value={form.author} onChange={e => set('author', e.target.value)} placeholder="Author name"
              style={{ width: '100%', padding: '10px 12px', borderRadius: 8, border: '1px solid #e2e8f0', fontSize: 14, outline: 'none', boxSizing: 'border-box' }} />
          </div>
          <div>
            <label style={{ display: 'block', fontSize: 12, fontWeight: 600, color: '#334155', marginBottom: 4 }}>Author title</label>
            <input value={form.authorTitle} onChange={e => set('authorTitle', e.target.value)} placeholder="e.g. Author, HCCS™ Standard"
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
        {/* Sticky publish bar */}
        <div style={{ position: 'sticky', bottom: 0, left: 0, right: 0, background: '#fff', borderTop: '2px solid #e2e8f0', padding: '16px 24px', display: 'flex', gap: 12, justifyContent: 'flex-end', alignItems: 'center', marginTop: 24, marginLeft: -24, marginRight: -24, marginBottom: -32, boxShadow: '0 -4px 12px rgba(0,0,0,0.06)' }}>
          <span style={{ flex: 1, fontSize: 13, color: '#64748b' }}>
            {saveMsg ? <span style={{ color: saveMsg.startsWith('Error') ? '#dc2626' : saveMsg === 'Saving...' ? '#2563eb' : '#059669', fontWeight: 600 }}>{saveMsg}</span> : (
              <>
                {form.title ? `"${form.title}"` : 'Untitled'}
                {form.status === 'published' ? <span style={{ marginLeft: 8, fontSize: 11, padding: '2px 8px', borderRadius: 4, background: '#f0fdf4', color: '#059669', fontWeight: 600 }}>Published</span> : <span style={{ marginLeft: 8, fontSize: 11, padding: '2px 8px', borderRadius: 4, background: '#fefce8', color: '#854d0e', fontWeight: 600 }}>Draft</span>}
              </>
            )}
          </span>
          <button onClick={() => setEditing(null)} style={{ padding: '12px 20px', borderRadius: 8, border: '1px solid #e2e8f0', background: '#fff', color: '#64748b', fontSize: 14, cursor: 'pointer' }}>Cancel</button>
          <button onClick={() => savePost('draft')} disabled={loading || !form.title || !form.content}
            style={{ padding: '12px 24px', borderRadius: 8, border: '1px solid #e2e8f0', background: '#fff', color: '#334155', fontSize: 14, fontWeight: 600, cursor: form.title && form.content ? 'pointer' : 'default' }}>
            Save draft
          </button>
          <button onClick={() => savePost('published')} disabled={loading || !form.title || !form.content}
            style={{ padding: '12px 28px', borderRadius: 8, border: 'none', background: form.title && form.content ? '#059669' : '#94a3b8', color: '#fff', fontSize: 15, fontWeight: 700, cursor: form.title && form.content ? 'pointer' : 'default', minWidth: 120 }}>
            Publish
          </button>
        </div>
        {form.content && (
          <div style={{ marginTop: 32, paddingTop: 24, borderTop: '1px solid #e2e8f0' }}>
            <div style={{ fontSize: 12, fontWeight: 600, color: '#64748b', marginBottom: 12 }}>Preview</div>
            <div style={{ background: '#fff', border: '1px solid #e2e8f0', borderRadius: 12, padding: '32px 28px' }}>
              <h1 style={{ fontSize: 24, fontWeight: 700, color: '#0f172a', margin: '0 0 8px' }}>{form.title}</h1>
              <div style={{ fontSize: 13, color: '#64748b', marginBottom: 20 }}>{form.date} · {form.category} · {form.author || 'Author'}</div>
              <div style={{ fontSize: 15, lineHeight: 1.8, color: '#334155' }}>
                {form.content.split('\n').map((line, i) => {
                  if (line.startsWith('## ')) return <h2 key={i} style={{ fontSize: 20, fontWeight: 700, color: '#0f172a', margin: '24px 0 8px' }}>{line.slice(3)}</h2>
                  if (line.startsWith('### ')) return <h3 key={i} style={{ fontSize: 17, fontWeight: 600, color: '#0f172a', margin: '20px 0 6px' }}>{line.slice(4)}</h3>
                  if (line.startsWith('> ')) return <blockquote key={i} style={{ borderLeft: '3px solid #5b9bd5', paddingLeft: 16, margin: '12px 0', color: '#475569', fontStyle: 'italic' }}>{line.slice(2)}</blockquote>
                  if (line.startsWith('- ')) return <div key={i} style={{ paddingLeft: 16, marginBottom: 4 }}>• {renderBold(line.slice(2))}</div>
                  if (line.trim() === '') return <div key={i} style={{ height: 12 }} />
                  return <p key={i} style={{ margin: '0 0 8px' }}>{renderBold(line)}</p>
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
      {/* Tabs */}
      <div style={{ background: '#fff', borderBottom: '1px solid #e2e8f0', padding: '0 24px' }}>
        <div style={{ maxWidth: 900, margin: '0 auto', display: 'flex', gap: 0 }}>
          {[['blog', 'Blog'], ['docs', 'Documents']].map(([key, label]) => (
            <button key={key} onClick={() => { setTab(key); setEditing(null); setEditingDoc(null) }}
              style={{ padding: '14px 24px', fontSize: 14, fontWeight: 600, cursor: 'pointer', border: 'none', borderBottom: tab === key ? '3px solid #2563eb' : '3px solid transparent', background: 'none', color: tab === key ? '#0f172a' : '#64748b' }}>
              {label}
            </button>
          ))}
        </div>
      </div>
      <div style={{ maxWidth: 900, margin: '0 auto', padding: '32px 24px' }}>

      {/* === BLOG TAB === */}
      {tab === 'blog' && !editing && (<>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 24 }}>
          <h1 style={{ fontSize: 24, fontWeight: 700, color: '#0f172a', margin: 0 }}>Blog posts</h1>
          <div style={{ display: 'flex', gap: 16, alignItems: 'center' }}>
            <span style={{ fontSize: 13, color: '#059669', fontWeight: 600 }}>{posts.filter(p => (p.status || 'published') === 'published').length} published</span>
            <span style={{ fontSize: 13, color: '#854d0e', fontWeight: 600 }}>{posts.filter(p => p.status === 'draft').length} drafts</span>
            <button onClick={startNew} style={{ padding: '10px 24px', borderRadius: 8, border: 'none', background: '#2563eb', color: '#fff', fontSize: 14, fontWeight: 600, cursor: 'pointer' }}>+ New post</button>
          </div>
        </div>

        {saveMsg && <div style={{ marginBottom: 16, padding: '10px 16px', borderRadius: 8, background: saveMsg.startsWith('Error') ? '#fef2f2' : saveMsg.startsWith('Done') ? '#f0fdf4' : '#eff6ff', color: saveMsg.startsWith('Error') ? '#dc2626' : saveMsg.startsWith('Done') ? '#059669' : '#2563eb', fontSize: 13, fontWeight: 600 }}>{saveMsg}</div>}
        {loading && <div style={{ textAlign: 'center', padding: '24px', color: '#64748b', fontSize: 14 }}>Loading from Airtable...</div>}
        {!loading && posts.length === 0 ? (
          <div style={{ textAlign: 'center', padding: 48, color: '#64748b' }}>No posts yet. Click "New post" to create one.</div>
        ) : (
          posts.map(post => {
            const status = post.status || 'published'
            const isDraft = status === 'draft'
            const hasAirtable = !!post.id
            return (
            <div key={post.id || post.slug} className='admin-post-row' style={{ background: '#fff', border: `1px solid ${isDraft ? '#fde68a' : '#e2e8f0'}`, borderRadius: 10, padding: '18px 22px', marginBottom: 10, display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', opacity: isDraft ? 0.85 : 1 }}>
              <div style={{ flex: 1 }}>
                <div style={{ display: 'flex', gap: 8, alignItems: 'center', marginBottom: 4 }}>
                  <div style={{ fontSize: 16, fontWeight: 600, color: '#0f172a' }}>{post.title}</div>
                  {isDraft
                    ? <span style={{ fontSize: 10, padding: '2px 8px', borderRadius: 4, background: '#fefce8', color: '#854d0e', fontWeight: 600, border: '1px solid #fde68a' }}>Draft</span>
                    : <span style={{ fontSize: 10, padding: '2px 8px', borderRadius: 4, background: '#f0fdf4', color: '#059669', fontWeight: 600, border: '1px solid #bbf7d0' }}>Published</span>
                  }
                  {!hasAirtable && <span style={{ fontSize: 10, padding: '2px 8px', borderRadius: 4, background: '#f1f5f9', color: '#64748b', fontWeight: 600 }}>Code only</span>}
                </div>
                <div style={{ fontSize: 13, color: '#64748b' }}>
                  {post.date} · {post.category} · {post.author} · /blog/{post.slug}
                </div>
                {post.lastModified && <div style={{ fontSize: 11, color: '#94a3b8', marginTop: 2 }}>Last modified: {new Date(post.lastModified).toLocaleString()}</div>}
                {post.excerpt && <div style={{ fontSize: 13, color: '#94a3b8', marginTop: 4 }}>{post.excerpt.slice(0, 120)}...</div>}
              </div>
              <div className='admin-post-actions' style={{ display: 'flex', gap: 8, flexShrink: 0, marginLeft: 16, flexWrap: 'wrap', justifyContent: 'flex-end' }}>
                {hasAirtable && <button onClick={() => handleToggleStatus(post)} disabled={loading}
                  style={{ padding: '6px 14px', borderRadius: 6, border: `1px solid ${isDraft ? '#bbf7d0' : '#fde68a'}`, background: isDraft ? '#f0fdf4' : '#fefce8', color: isDraft ? '#059669' : '#854d0e', fontSize: 12, fontWeight: 600, cursor: 'pointer' }}>
                  {isDraft ? 'Publish' : 'Unpublish'}
                </button>}
                <button onClick={() => startEdit(post)} style={{ padding: '6px 14px', borderRadius: 6, border: '1px solid #e2e8f0', background: '#fff', color: '#2563eb', fontSize: 12, fontWeight: 600, cursor: 'pointer' }}>Edit</button>
                {hasAirtable && <button onClick={() => handleDelete(post)} disabled={loading} style={{ padding: '6px 14px', borderRadius: 6, border: '1px solid #fecaca', background: '#fff', color: '#dc2626', fontSize: 12, fontWeight: 600, cursor: 'pointer' }}>Delete</button>}
                {!isDraft && <a href={`/blog/${post.slug}`} target="_blank" style={{ padding: '6px 14px', borderRadius: 6, border: '1px solid #e2e8f0', background: '#f8fafc', color: '#475569', fontSize: 12, fontWeight: 600, textDecoration: 'none' }}>View</a>}
              </div>
            </div>
          )})
        )}

        <div style={{ marginTop: 40, padding: 24, background: '#0f172a', borderRadius: 12 }}>
          <div style={{ fontSize: 14, fontWeight: 600, color: '#fff', marginBottom: 8 }}>Quick reference</div>
          <div style={{ fontSize: 13, color: '#94a3b8', lineHeight: 1.7 }}>
            Posts use Markdown-style formatting: <code style={{ background: '#1e293b', padding: '2px 6px', borderRadius: 4 }}>## Heading</code>, <code style={{ background: '#1e293b', padding: '2px 6px', borderRadius: 4 }}>**bold**</code>, <code style={{ background: '#1e293b', padding: '2px 6px', borderRadius: 4 }}>*italic*</code>, <code style={{ background: '#1e293b', padding: '2px 6px', borderRadius: 4 }}>{'>'}  blockquote</code>, <code style={{ background: '#1e293b', padding: '2px 6px', borderRadius: 4 }}>- list item</code>
          </div>
          <div style={{ fontSize: 13, color: '#64748b', marginTop: 8 }}>
            <strong>Draft/Publish:</strong> New posts start as drafts. Drafts are only visible in admin. Click "Publish" to make a post live on the blog. You can unpublish anytime.
          </div>
          {STATIC_POSTS.length > 0 && (
            <div style={{ marginTop: 16, paddingTop: 16, borderTop: '1px solid #1e293b' }}>
              <div style={{ fontSize: 13, color: '#94a3b8', marginBottom: 8 }}>{STATIC_POSTS.length} built-in posts exist in code. Push them to Airtable so everything lives in one place.</div>
              <button onClick={async () => {
                if (!confirm(`Push ${STATIC_POSTS.length} built-in posts to Airtable? (Skips any that already exist by slug)`)) return
                setLoading(true)
                setSaveMsg('Seeding posts...')
                const existingSlugs = new Set(posts.filter(p => p.source === 'airtable').map(p => p.slug))
                let added = 0
                for (const sp of STATIC_POSTS) {
                  if (existingSlugs.has(sp.slug)) continue
                  await createPost({
                    title: sp.title, slug: sp.slug, excerpt: sp.excerpt || '', category: sp.category || 'Governance',
                    body: sp.body || sp.content || '', date: sp.date, author: sp.author || 'Diane Malefyt',
                    authorTitle: sp.authorTitle || 'Author, HCCS™ Standard', status: 'published',
                    readTime: sp.readTime || '4 min read',
                  }, adminKey)
                  added++
                }
                await refreshPosts()
                setSaveMsg(added > 0 ? `Done! Added ${added} posts to Airtable.` : 'All built-in posts already exist in Airtable.')
              }} disabled={loading}
                style={{ padding: '8px 20px', borderRadius: 6, border: '1px solid #5b9bd5', background: 'transparent', color: '#5b9bd5', fontSize: 13, fontWeight: 600, cursor: 'pointer' }}>
                Push built-in posts to Airtable
              </button>
            </div>
          )}
        </div>
      </>)}

      {/* === DOCUMENTS TAB === */}
      {tab === 'docs' && !editingDoc && (<>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 24 }}>
          <h1 style={{ fontSize: 24, fontWeight: 700, color: '#0f172a', margin: 0 }}>Documents</h1>
          <div style={{ display: 'flex', gap: 12, alignItems: 'center' }}>
            <span style={{ fontSize: 13, color: '#64748b' }}>{docs.length} documents</span>
            <button onClick={() => { setDocForm({ docId: '', title: '', subtitle: '', desc: '', details: '', file: '', color: '#185FA5', pages: '', format: 'pdf', sortOrder: docs.length + 1, status: 'published' }); setEditingDoc('new') }}
              style={{ padding: '10px 24px', borderRadius: 8, border: 'none', background: '#2563eb', color: '#fff', fontSize: 14, fontWeight: 600, cursor: 'pointer' }}>+ New document</button>
          </div>
        </div>

        {saveMsg && <div style={{ marginBottom: 16, padding: '10px 16px', borderRadius: 8, background: saveMsg.startsWith('Error') ? '#fef2f2' : saveMsg.startsWith('Done') ? '#f0fdf4' : '#eff6ff', color: saveMsg.startsWith('Error') ? '#dc2626' : saveMsg.startsWith('Done') ? '#059669' : '#2563eb', fontSize: 13, fontWeight: 600 }}>{saveMsg}</div>}
        {loading && <div style={{ textAlign: 'center', padding: 24, color: '#64748b' }}>Loading...</div>}

        {docs.map(doc => (
          <div key={doc.id || doc.docId} style={{ background: '#fff', border: '1px solid #e2e8f0', borderRadius: 10, padding: '18px 22px', marginBottom: 10, display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' }}>
            <div style={{ flex: 1 }}>
              <div style={{ display: 'flex', gap: 8, alignItems: 'center', marginBottom: 4 }}>
                <div style={{ width: 8, height: 8, borderRadius: '50%', background: doc.color }} />
                <div style={{ fontSize: 16, fontWeight: 600, color: '#0f172a' }}>{doc.title}</div>
                <span style={{ fontSize: 12, color: '#64748b' }}>{doc.subtitle}</span>
              </div>
              <div style={{ fontSize: 13, color: '#64748b' }}>{doc.format?.toUpperCase()} · {doc.pages} pages · Sort: {doc.sortOrder}</div>
              <div style={{ fontSize: 13, color: '#94a3b8', marginTop: 2 }}>{doc.file}</div>
            </div>
            <div style={{ display: 'flex', gap: 8, flexShrink: 0, marginLeft: 16 }}>
              <button onClick={() => { setDocForm({ ...doc, details: Array.isArray(doc.details) ? doc.details.join('\n') : doc.details || '', _recordId: doc.id }); setEditingDoc(doc.docId || doc.id) }}
                style={{ padding: '6px 14px', borderRadius: 6, border: '1px solid #e2e8f0', background: '#fff', color: '#2563eb', fontSize: 12, fontWeight: 600, cursor: 'pointer' }}>Edit</button>
              {doc.id && <button onClick={async () => { if (!confirm(`Delete "${doc.title}"?`)) return; setLoading(true); await deleteDocApi(doc.id, adminKey); await refreshDocs(); setLoading(false) }} disabled={loading}
                style={{ padding: '6px 14px', borderRadius: 6, border: '1px solid #fecaca', background: '#fff', color: '#dc2626', fontSize: 12, fontWeight: 600, cursor: 'pointer' }}>Delete</button>}
              {doc.file && <a href={doc.file} target="_blank" style={{ padding: '6px 14px', borderRadius: 6, border: '1px solid #e2e8f0', background: '#f8fafc', color: '#475569', fontSize: 12, fontWeight: 600, textDecoration: 'none' }}>View</a>}
            </div>
          </div>
        ))}

        {/* Seed built-in docs */}
        <div style={{ marginTop: 40, padding: 24, background: '#0f172a', borderRadius: 12 }}>
          <div style={{ fontSize: 14, fontWeight: 600, color: '#fff', marginBottom: 8 }}>Seed documents</div>
          <div style={{ fontSize: 13, color: '#94a3b8', marginBottom: 12 }}>{STATIC_DOCS.length} built-in documents in code. Push them to Airtable for centralized management.</div>
          <button onClick={async () => {
            if (!confirm(`Push ${STATIC_DOCS.length} documents to Airtable?`)) return
            setLoading(true)
            setSaveMsg('Seeding documents...')
            const existingIds = new Set(docs.filter(d => d.id).map(d => d.docId))
            let added = 0
            for (const sd of STATIC_DOCS) {
              if (existingIds.has(sd.docId)) continue
              await createDoc(sd, adminKey)
              added++
            }
            await refreshDocs()
            setSaveMsg(added > 0 ? `Done! Added ${added} documents.` : 'All documents already in Airtable.')
            setLoading(false)
          }} disabled={loading}
            style={{ padding: '8px 20px', borderRadius: 6, border: '1px solid #5b9bd5', background: 'transparent', color: '#5b9bd5', fontSize: 13, fontWeight: 600, cursor: 'pointer' }}>
            Push built-in documents to Airtable
          </button>
        </div>
      </>)}

      {/* === DOCUMENT EDITOR === */}
      {tab === 'docs' && editingDoc && (
        <div>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 24 }}>
            <h2 style={{ fontSize: 20, fontWeight: 700, color: '#0f172a', margin: 0 }}>{editingDoc === 'new' ? 'New document' : `Edit: ${docForm.title}`}</h2>
            <button onClick={() => setEditingDoc(null)} style={{ padding: '6px 16px', borderRadius: 6, border: '1px solid #e2e8f0', background: '#fff', color: '#64748b', fontSize: 13, cursor: 'pointer' }}>Cancel</button>
          </div>
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 12, marginBottom: 16 }}>
            <div>
              <label style={{ display: 'block', fontSize: 12, fontWeight: 600, color: '#334155', marginBottom: 4 }}>Title</label>
              <input value={docForm.title} onChange={e => setDocForm(p => ({ ...p, title: e.target.value }))}
                style={{ width: '100%', padding: '10px 12px', borderRadius: 8, border: '1px solid #e2e8f0', fontSize: 14, outline: 'none', boxSizing: 'border-box' }} />
            </div>
            <div>
              <label style={{ display: 'block', fontSize: 12, fontWeight: 600, color: '#334155', marginBottom: 4 }}>Subtitle / Version</label>
              <input value={docForm.subtitle} onChange={e => setDocForm(p => ({ ...p, subtitle: e.target.value }))} placeholder="e.g. HCCS-1.0"
                style={{ width: '100%', padding: '10px 12px', borderRadius: 8, border: '1px solid #e2e8f0', fontSize: 14, outline: 'none', boxSizing: 'border-box' }} />
            </div>
          </div>
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr 1fr 1fr', gap: 12, marginBottom: 16 }}>
            <div>
              <label style={{ display: 'block', fontSize: 12, fontWeight: 600, color: '#334155', marginBottom: 4 }}>Doc ID</label>
              <input value={docForm.docId} onChange={e => setDocForm(p => ({ ...p, docId: e.target.value }))} placeholder="HCCS-1.0"
                style={{ width: '100%', padding: '10px 12px', borderRadius: 8, border: '1px solid #e2e8f0', fontSize: 13, fontFamily: 'monospace', outline: 'none', boxSizing: 'border-box' }} />
            </div>
            <div>
              <label style={{ display: 'block', fontSize: 12, fontWeight: 600, color: '#334155', marginBottom: 4 }}>Format</label>
              <select value={docForm.format} onChange={e => setDocForm(p => ({ ...p, format: e.target.value }))}
                style={{ width: '100%', padding: '10px 12px', borderRadius: 8, border: '1px solid #e2e8f0', fontSize: 14, background: '#fff' }}>
                <option value="pdf">PDF</option><option value="docx">DOCX</option><option value="xlsx">XLSX</option>
              </select>
            </div>
            <div>
              <label style={{ display: 'block', fontSize: 12, fontWeight: 600, color: '#334155', marginBottom: 4 }}>Pages</label>
              <input value={docForm.pages} onChange={e => setDocForm(p => ({ ...p, pages: e.target.value }))} placeholder="~40"
                style={{ width: '100%', padding: '10px 12px', borderRadius: 8, border: '1px solid #e2e8f0', fontSize: 14, outline: 'none', boxSizing: 'border-box' }} />
            </div>
            <div>
              <label style={{ display: 'block', fontSize: 12, fontWeight: 600, color: '#334155', marginBottom: 4 }}>Sort order</label>
              <input type="number" value={docForm.sortOrder} onChange={e => setDocForm(p => ({ ...p, sortOrder: parseInt(e.target.value) || 0 }))}
                style={{ width: '100%', padding: '10px 12px', borderRadius: 8, border: '1px solid #e2e8f0', fontSize: 14, outline: 'none', boxSizing: 'border-box' }} />
            </div>
          </div>
          <div style={{ display: 'grid', gridTemplateColumns: '2fr 1fr', gap: 12, marginBottom: 16 }}>
            <div>
              <label style={{ display: 'block', fontSize: 12, fontWeight: 600, color: '#334155', marginBottom: 4 }}>File URL</label>
              <input value={docForm.file} onChange={e => setDocForm(p => ({ ...p, file: e.target.value }))} placeholder="/docs/filename.pdf"
                style={{ width: '100%', padding: '10px 12px', borderRadius: 8, border: '1px solid #e2e8f0', fontSize: 13, fontFamily: 'monospace', outline: 'none', boxSizing: 'border-box' }} />
            </div>
            <div>
              <label style={{ display: 'block', fontSize: 12, fontWeight: 600, color: '#334155', marginBottom: 4 }}>Color (hex)</label>
              <div style={{ display: 'flex', gap: 8, alignItems: 'center' }}>
                <input type="color" value={docForm.color} onChange={e => setDocForm(p => ({ ...p, color: e.target.value }))} style={{ width: 40, height: 38, border: 'none', cursor: 'pointer' }} />
                <input value={docForm.color} onChange={e => setDocForm(p => ({ ...p, color: e.target.value }))}
                  style={{ flex: 1, padding: '10px 12px', borderRadius: 8, border: '1px solid #e2e8f0', fontSize: 13, fontFamily: 'monospace', outline: 'none', boxSizing: 'border-box' }} />
              </div>
            </div>
          </div>
          <div style={{ marginBottom: 16 }}>
            <label style={{ display: 'block', fontSize: 12, fontWeight: 600, color: '#334155', marginBottom: 4 }}>Description</label>
            <textarea value={docForm.desc} onChange={e => setDocForm(p => ({ ...p, desc: e.target.value }))} rows={3}
              style={{ width: '100%', padding: '10px 12px', borderRadius: 8, border: '1px solid #e2e8f0', fontSize: 14, outline: 'none', fontFamily: 'inherit', resize: 'vertical', boxSizing: 'border-box', lineHeight: 1.5 }} />
          </div>
          <div style={{ marginBottom: 16 }}>
            <label style={{ display: 'block', fontSize: 12, fontWeight: 600, color: '#334155', marginBottom: 4 }}>Details (one per line, shown as arrow list)</label>
            <textarea value={docForm.details} onChange={e => setDocForm(p => ({ ...p, details: e.target.value }))} rows={6}
              style={{ width: '100%', padding: '10px 12px', borderRadius: 8, border: '1px solid #e2e8f0', fontSize: 13, fontFamily: 'monospace', outline: 'none', resize: 'vertical', boxSizing: 'border-box', lineHeight: 1.6 }} />
          </div>
          <div style={{ display: 'flex', gap: 12 }}>
            <button onClick={async () => {
              if (!docForm.title) return setSaveMsg('Error: Title required')
              setSaveMsg('Saving...')
              setLoading(true)
              const doc = { ...docForm, details: docForm.details.split('\n').filter(Boolean) }
              try {
                if (editingDoc === 'new') {
                  await createDoc(doc, adminKey)
                } else if (docForm._recordId) {
                  await updateDoc(docForm._recordId, doc, adminKey)
                } else {
                  await createDoc(doc, adminKey)
                }
                await refreshDocs()
                setEditingDoc(null)
                setSaveMsg('Saved!')
              } catch (err) {
                setSaveMsg('Error: ' + err.message)
              }
              setLoading(false)
            }} disabled={loading || !docForm.title}
              style={{ padding: '12px 28px', borderRadius: 8, border: 'none', background: docForm.title ? '#059669' : '#94a3b8', color: '#fff', fontSize: 15, fontWeight: 700, cursor: docForm.title ? 'pointer' : 'default' }}>
              {editingDoc === 'new' ? 'Create document' : 'Save changes'}
            </button>
            <button onClick={() => setEditingDoc(null)} style={{ padding: '12px 20px', borderRadius: 8, border: '1px solid #e2e8f0', background: '#fff', color: '#64748b', fontSize: 14, cursor: 'pointer' }}>Cancel</button>
          </div>
        </div>
      )}

      </div>
    </div>
  )
}
