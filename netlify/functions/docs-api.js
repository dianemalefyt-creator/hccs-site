const AIRTABLE_API_KEY = process.env.AIRTABLE_API_KEY
const AIRTABLE_BASE_ID = process.env.AIRTABLE_BASE_ID
const TABLE_NAME = encodeURIComponent('Documents')
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
      body: JSON.stringify({ docs: [], error: 'Missing env vars' }) }
  }

  if (event.httpMethod === 'GET') {
    try {
      const showAll = (event.queryStringParameters || {}).all === 'true'
      const data = await callAirtable('')

      if (data.error) {
        return { statusCode: 200, headers: HEADERS,
          body: JSON.stringify({ docs: [], error: data.error }) }
      }

      if (!data.records) {
        return { statusCode: 200, headers: HEADERS,
          body: JSON.stringify({ docs: [], error: 'No records' }) }
      }

      const docs = data.records.map(r => {
        const f = r.fields || {}
        return {
          id: r.id,
          docId: f.DocID || f.docId || '',
          title: f.Title || '',
          subtitle: f.Subtitle || '',
          desc: f.Description || '',
          details: (f.Details || '').split('\n').filter(Boolean),
          file: f.FileURL || f.File || '',
          color: f.Color || '#185FA5',
          pages: f.Pages || '',
          format: f.Format || 'pdf',
          sortOrder: parseInt(f.SortOrder || '99', 10),
          status: (f.Status || 'published').toLowerCase(),
        }
      }).sort((a, b) => a.sortOrder - b.sortOrder)

      const filtered = showAll ? docs : docs.filter(d => d.status === 'published')

      return { statusCode: 200, headers: HEADERS,
        body: JSON.stringify({ docs: filtered }) }
    } catch (err) {
      return { statusCode: 200, headers: HEADERS,
        body: JSON.stringify({ docs: [], error: err.message }) }
    }
  }

  if (event.httpMethod === 'POST') {
    try {
      const { action, doc, recordId } = JSON.parse(event.body)

      const fields = {
        DocID: doc?.docId || '',
        Title: doc?.title || '',
        Subtitle: doc?.subtitle || '',
        Description: doc?.desc || '',
        Details: (doc?.details || []).join('\n'),
        FileURL: doc?.file || '',
        Color: doc?.color || '#185FA5',
        Pages: doc?.pages || '',
        Format: doc?.format || 'pdf',
        SortOrder: String(doc?.sortOrder || 99),
        Status: doc?.status || 'published',
      }

      if (action === 'create') {
        const data = await callAirtable('', {
          method: 'POST',
          body: JSON.stringify({ records: [{ fields }] }),
        })
        if (data.error) return { statusCode: 200, headers: HEADERS, body: JSON.stringify({ error: data.error }) }
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

      return { statusCode: 400, headers: HEADERS, body: JSON.stringify({ error: 'Invalid action' }) }
    } catch (err) {
      return { statusCode: 200, headers: HEADERS, body: JSON.stringify({ error: err.message }) }
    }
  }

  return { statusCode: 405, headers: HEADERS, body: JSON.stringify({ error: 'Method not allowed' }) }
}
