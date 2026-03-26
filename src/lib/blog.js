// Blog post storage - Airtable backend with static fallback
import { POSTS as STATIC_POSTS } from '../data/blog'

let cache = null
let cacheTime = 0
const CACHE_TTL = 30000

export async function fetchPosts(showAll = false) {
  const now = Date.now()
  if (cache && (now - cacheTime) < CACHE_TTL && !showAll) return cache

  try {
    const url = showAll ? '/.netlify/functions/blog-api?all=true' : '/.netlify/functions/blog-api'
    const res = await fetch(url)
    const data = await res.json()

    if (data.posts && data.posts.length > 0) {
      const airtableSlugs = new Set(data.posts.map(p => p.slug))
      const staticOnly = STATIC_POSTS
        .filter(p => !airtableSlugs.has(p.slug))
        .map(p => ({ ...p, status: 'published', source: 'static' }))
      const merged = [...data.posts.map(p => ({ ...p, source: 'airtable' })), ...staticOnly]
        .sort((a, b) => new Date(b.date) - new Date(a.date))
      if (!showAll) {
        const published = merged.filter(p => (p.status || 'published') === 'published')
        cache = published
        cacheTime = now
        return published
      }
      return merged
    }
    return STATIC_POSTS.map(p => ({ ...p, status: 'published', source: 'static' }))
  } catch {
    return STATIC_POSTS.map(p => ({ ...p, status: 'published', source: 'static' }))
  }
}

export function getAllPosts(showAll = false) {
  if (cache && !showAll) return cache
  return STATIC_POSTS.map(p => ({ ...p, status: 'published', source: 'static' }))
}

export function clearCache() { cache = null; cacheTime = 0 }

export async function createPost(post) {
  clearCache()
  const res = await fetch('/.netlify/functions/blog-api', {
    method: 'POST', headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ action: 'create', post }),
  })
  return res.json()
}

export async function updatePost(recordId, post) {
  clearCache()
  const res = await fetch('/.netlify/functions/blog-api', {
    method: 'POST', headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ action: 'update', recordId, post }),
  })
  return res.json()
}

export async function deletePostApi(recordId) {
  clearCache()
  const res = await fetch('/.netlify/functions/blog-api', {
    method: 'POST', headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ action: 'delete', recordId }),
  })
  return res.json()
}

export async function togglePostStatus(recordId) {
  clearCache()
  const res = await fetch('/.netlify/functions/blog-api', {
    method: 'POST', headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ action: 'toggleStatus', recordId }),
  })
  return res.json()
}

export { STATIC_POSTS }
