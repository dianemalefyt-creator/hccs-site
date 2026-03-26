// Blog CRUD via Airtable
// Table: "Blog" in existing HCCS base
// Fields: Title (text), Slug (text), Excerpt (long text), Category (text), 
//         Body (long text), Date (text), Author (text), AuthorTitle (text),
//         Status (text: draft/published), ReadTime (text), LastModified (text)

const AIRTABLE_API_KEY = process.env.AIRTABLE_API_KEY
const AIRTABLE_BASE_ID = process.env.AIRTABLE_BASE_ID
const TABLE = 'Blog'

const HEADERS = {
  'Content-Type': 'application/json',
  'Access-Control-Allow-Origin': '*',
}

async function airtableFetch(path, options = {}) {
  const res = await fetch(`https://api.airtable.com/v0/${AIRTABLE_BASE_ID}/${TABLE}${path}`, {
    ...options,
    headers: {
      Authorization: `Bearer ${AIRTABLE_API_KEY}`,
      'Content-Type': 'application/json',
      ...(options.headers || {}),
    },
  })
  return res.json()
}

exports.handler = async function(event) {
  if (!AIRTABLE_API_KEY || !AIRTABLE_BASE_ID) {
    return { statusCode: 200, headers: HEADERS,
      body: JSON.stringify({ error: 'Airtable not configured', posts: [] }) }
  }

  const method = event.httpMethod

  // CORS preflight
  if (method === 'OPTIONS') {
    return { statusCode: 204, headers: { ...HEADERS, 'Access-Control-Allow-Methods': 'GET, POST, OPTIONS', 'Access-Control-Allow-Headers': 'Content-Type' } }
  }

  // GET: list all posts
  if (method === 'GET') {
    try {
      const params = new URLSearchParams(event.queryStringParameters || {})
      const showAll = params.get('all') === 'true'
      
      // Fetch all records, sorted by date descending
      let allRecords = []
      let offset = null
      let rawResponse = null
      
      do {
        const url = offset ? `?offset=${offset}&sort%5B0%5D%5Bfield%5D=Date&sort%5B0%5D%5Bdirection%5D=desc` 
                           : '?sort%5B0%5D%5Bfield%5D=Date&sort%5B0%5D%5Bdirection%5D=desc'
        const data = await airtableFetch(url)
        if (!rawResponse) rawResponse = data
        if (data.error) {
          // Sort field might not exist, try without sort
          if (offset === null) {
            const retry = await airtableFetch('')
            if (retry.records && retry.records.length > 0) {
              allRecords = retry.records
              break
            }
          }
          return { statusCode: 200, headers: HEADERS,
            body: JSON.stringify({ error: `Airtable error: ${JSON.stringify(data.error)}`, posts: [], debug: data }) }
        }
        if (data.records) allRecords = allRecords.concat(data.records)
        offset = data.offset
      } while (offset)

      if (allRecords.length === 0) {
        return { statusCode: 200, headers: HEADERS,
          body: JSON.stringify({ posts: [], debug: { message: 'No records found', tableChecked: TABLE, baseId: AIRTABLE_BASE_ID, rawKeys: rawResponse ? Object.keys(rawResponse) : [], recordCount: rawResponse?.records?.length } }) }
      }

      const posts = allRecords.map(r => ({
        id: r.id,
        title: r.fields.Title || '',
        slug: r.fields.Slug || '',
        excerpt: r.fields.Excerpt || '',
        category: r.fields.Category || 'Governance',
        body: r.fields.Body || '',
        content: r.fields.Body || '',
        date: r.fields.Date || '',
        author: r.fields.Author || 'Diane Malefyt',
        authorTitle: r.fields.AuthorTitle || '',
        status: (r.fields.Status || 'draft').toLowerCase(),
        readTime: r.fields.ReadTime || '3 min read',
        lastModified: r.fields.LastModified || '',
      }))

      const filtered = showAll ? posts : posts.filter(p => p.status === 'published')

      return { statusCode: 200, headers: HEADERS,
        body: JSON.stringify({ posts: filtered }) }
    } catch (err) {
      console.error('Blog list error:', err)
      return { statusCode: 200, headers: HEADERS,
        body: JSON.stringify({ error: err.message, posts: [] }) }
    }
  }

  // POST: create or update
  if (method === 'POST') {
    try {
      const { action, post, recordId } = JSON.parse(event.body)

      const fields = {
        Title: post.title,
        Slug: post.slug,
        Excerpt: post.excerpt || '',
        Category: post.category || 'Governance',
        Body: post.body || post.content || '',
        Date: post.date || new Date().toISOString().split('T')[0],
        Author: post.author || 'Diane Malefyt',
        AuthorTitle: post.authorTitle || '',
        Status: post.status || 'draft',
        ReadTime: post.readTime || `${Math.max(3, Math.ceil((post.body || post.content || '').split(/\s+/).length / 200))} min read`,
        LastModified: new Date().toISOString(),
      }

      if (action === 'create') {
        const data = await airtableFetch('', {
          method: 'POST',
          body: JSON.stringify({ records: [{ fields }] }),
        })
        return { statusCode: 200, headers: HEADERS,
          body: JSON.stringify({ success: true, record: data.records?.[0] }) }
      }

      if (action === 'update' && recordId) {
        const data = await airtableFetch('', {
          method: 'PATCH',
          body: JSON.stringify({ records: [{ id: recordId, fields }] }),
        })
        return { statusCode: 200, headers: HEADERS,
          body: JSON.stringify({ success: true, record: data.records?.[0] }) }
      }

      if (action === 'delete' && recordId) {
        await airtableFetch(`/${recordId}`, { method: 'DELETE' })
        return { statusCode: 200, headers: HEADERS,
          body: JSON.stringify({ success: true }) }
      }

      if (action === 'toggleStatus' && recordId) {
        // Get current status, flip it
        const current = await airtableFetch(`/${recordId}`)
        const newStatus = current.fields?.Status === 'published' ? 'draft' : 'published'
        const data = await airtableFetch('', {
          method: 'PATCH',
          body: JSON.stringify({ records: [{ id: recordId, fields: { Status: newStatus, LastModified: new Date().toISOString() } }] }),
        })
        return { statusCode: 200, headers: HEADERS,
          body: JSON.stringify({ success: true, record: data.records?.[0] }) }
      }

      return { statusCode: 400, body: JSON.stringify({ error: 'Invalid action' }) }
    } catch (err) {
      console.error('Blog write error:', err)
      return { statusCode: 500, body: JSON.stringify({ error: err.message }) }
    }
  }

  return { statusCode: 405, body: 'Method not allowed' }
}
