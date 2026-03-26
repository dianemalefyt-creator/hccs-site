// Blog post storage - shared between Blog.jsx and Admin.jsx
import { POSTS as STATIC_POSTS } from '../data/blog'

const BLOG_STORAGE_KEY = 'hccs_blog_posts'

export function getDynamicPosts() {
  try { return JSON.parse(localStorage.getItem(BLOG_STORAGE_KEY) || '[]') } catch { return [] }
}

export function saveDynamicPosts(posts) {
  localStorage.setItem(BLOG_STORAGE_KEY, JSON.stringify(posts))
}

// showAll = true for admin (includes drafts), false for public blog
export function getAllPosts(showAll = false) {
  try {
    const dynamic = getDynamicPosts()
    const staticFiltered = STATIC_POSTS.filter(sp => !dynamic.find(dp => dp.slug === sp.slug))
    const all = [
      ...dynamic,
      ...staticFiltered.map(p => ({ ...p, status: p.status || 'published' }))
    ].sort((a, b) => new Date(b.date) - new Date(a.date))
    if (showAll) return all
    return all.filter(p => (p.status || 'published') === 'published')
  } catch {
    // Fallback to static posts if anything breaks
    return STATIC_POSTS.map(p => ({ ...p, status: 'published' }))
  }
}

export { STATIC_POSTS }
