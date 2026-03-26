const AIRTABLE_API_KEY = process.env.AIRTABLE_API_KEY
const AIRTABLE_BASE_ID = process.env.AIRTABLE_BASE_ID
const TABLE_NAME = encodeURIComponent('Blog')
const BASE_URL = `https://api.airtable.com/v0/${AIRTABLE_BASE_ID}/${TABLE_NAME}`

const HEADERS = {
  'Content-Type': 'application/json',
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Methods': 'GET, POST, OPTIONS',
  'Access-Control-Allow-Headers': 'Content-Type',
}

async function callAirtable(path, options = {}) {
  const url = `${BASE_URL}${path}`
  const res = await fetch(url, {
    ...options,
    headers: {
      Authorization: `Bearer ${AIRTABLE_API_KEY}`,
      'Content-Type': 'application/json',
      ...(options.headers || {}),
    },
  })
  const text = await res.text()
  try { return JSON.parse(text) } catch { return { error: 'Invalid JSON', raw: text.slice(0, 500) } }
}

exports.handler = async function(event) {
  if (event.httpMethod === 'OPTIONS') {
    return { statusCode: 204, headers: HEADERS }
  }

  if (!AIRTABLE_API_KEY || !AIRTABLE_BASE_ID) {
    return { statusCode: 200, headers: HEADERS,
      body: JSON.stringify({ posts: [], error: 'Missing env vars', hasKey: !!AIRTABLE_API_KEY, hasBase: !!AIRTABLE_BASE_ID }) }
  }

  if (event.httpMethod === 'GET') {
    try {
      const showAll = (event.queryStringParameters || {}).all === 'true'
      const data = await callAirtable('')

      if (data.error) {
        return { statusCode: 200, headers: HEADERS,
          body: JSON.stringify({ posts: [], error: data.error, debug: data }) }
      }

      if (!data.records) {
        return { statusCode: 200, headers: HEADERS,
          body: JSON.stringify({ posts: [], error: 'No records array', debug: { keys: Object.keys(data) } }) }
      }

      const posts = data.records.map(r => {
        const f = r.fields || {}
        return {
          id: r.id,
          title: f.Title || f.title || f.Name || '',
          slug: f.Slug || f.slug || '',
          excerpt: f.Excerpt || f.excerpt || '',
          category: f.Category || f.category || 'Governance',
          body: f.Body || f.body || f.Content || f.content || '',
          content: f.Body || f.body || f.Content || f.content || '',
          date: f.Date || f.date || '',
          author: f.Author || f.author || 'Diane Malefyt',
          authorTitle: f.AuthorTitle || f.authorTitle || f['Author Title'] || '',
          status: (f.Status || f.status || 'draft').toLowerCase(),
          readTime: f.ReadTime || f.readTime || f['Read Time'] || '3 min read',
          lastModified: f.LastModified || f.lastModified || f['Last Modified'] || '',
        }
      }).sort((a, b) => new Date(b.date) - new Date(a.date))

      const filtered = showAll ? posts : posts.filter(p => p.status === 'published')

      return { statusCode: 200, headers: HEADERS,
        body: JSON.stringify({ posts: filtered }) }
    } catch (err) {
      return { statusCode: 200, headers: HEADERS,
        body: JSON.stringify({ posts: [], error: err.message, stack: err.stack?.slice(0, 300) }) }
    }
  }

  if (event.httpMethod === 'POST') {
    try {
      const { action, post, recordId } = JSON.parse(event.body)

      const fields = {
        Title: post?.title || '',
        Slug: post?.slug || '',
        Excerpt: post?.excerpt || '',
        Category: post?.category || 'Governance',
        Body: post?.body || post?.content || '',
        Date: post?.date || new Date().toISOString().split('T')[0],
        Author: post?.author || 'Diane Malefyt',
        AuthorTitle: post?.authorTitle || '',
        Status: post?.status || 'draft',
        ReadTime: post?.readTime || '3 min read',
        LastModified: new Date().toISOString(),
      }

      if (action === 'create') {
        const data = await callAirtable('', {
          method: 'POST',
          body: JSON.stringify({ records: [{ fields }] }),
        })
        if (data.error) return { statusCode: 200, headers: HEADERS, body: JSON.stringify({ error: data.error, debug: data }) }
        return { statusCode: 200, headers: HEADERS, body: JSON.stringify({ success: true, record: data.records?.[0] }) }
      }

      if (action === 'update' && recordId) {
        const data = await callAirtable('', {
          method: 'PATCH',
          body: JSON.stringify({ records: [{ id: recordId, fields }] }),
        })
        if (data.error) return { statusCode: 200, headers: HEADERS, body: JSON.stringify({ error: data.error }) }
        return { statusCode: 200, headers: HEADERS, body: JSON.stringify({ success: true, record: data.records?.[0] }) }
      }

      if (action === 'delete' && recordId) {
        const data = await callAirtable(`/${recordId}`, { method: 'DELETE' })
        if (data.error) return { statusCode: 200, headers: HEADERS, body: JSON.stringify({ error: data.error }) }
        return { statusCode: 200, headers: HEADERS, body: JSON.stringify({ success: true }) }
      }

      if (action === 'toggleStatus' && recordId) {
        const current = await callAirtable(`/${recordId}`)
        if (current.error) return { statusCode: 200, headers: HEADERS, body: JSON.stringify({ error: current.error }) }
        const curStatus = (current.fields?.Status || current.fields?.status || 'draft').toLowerCase()
        const newStatus = curStatus === 'published' ? 'draft' : 'published'
        const data = await callAirtable('', {
          method: 'PATCH',
          body: JSON.stringify({ records: [{ id: recordId, fields: { Status: newStatus, LastModified: new Date().toISOString() } }] }),
        })
        if (data.error) return { statusCode: 200, headers: HEADERS, body: JSON.stringify({ error: data.error }) }
        return { statusCode: 200, headers: HEADERS, body: JSON.stringify({ success: true, record: data.records?.[0] }) }
      }

      return { statusCode: 400, headers: HEADERS, body: JSON.stringify({ error: 'Invalid action: ' + action }) }
    } catch (err) {
      return { statusCode: 200, headers: HEADERS, body: JSON.stringify({ error: err.message }) }
    }
  }

  return { statusCode: 405, headers: HEADERS, body: JSON.stringify({ error: 'Method not allowed' }) }
}
