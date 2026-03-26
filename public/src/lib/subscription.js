// Subscription management - localStorage-based with Stripe verification
// Pro status persists via localStorage after Stripe checkout redirect

const STORAGE_KEY = 'hccs_sub'
const USAGE_KEY = 'hccs_usage'

// Free tier limits per tool
const FREE_LIMITS = {
  jd: 1,
  scorecard: 1,
  comp: 3,
  adt: 1,
  bias: 999, // unlimited - it's the viral one
}

export function getSubscription() {
  try {
    const raw = localStorage.getItem(STORAGE_KEY)
    if (!raw) return null
    const sub = JSON.parse(raw)
    // Check if expired
    if (sub.expiresAt && new Date(sub.expiresAt) < new Date()) {
      localStorage.removeItem(STORAGE_KEY)
      return null
    }
    return sub
  } catch { return null }
}

export function setSubscription(data) {
  localStorage.setItem(STORAGE_KEY, JSON.stringify({
    ...data,
    activatedAt: new Date().toISOString(),
  }))
}

export function isPro() {
  const sub = getSubscription()
  return sub && sub.status === 'active'
}

export function getUsage(toolId) {
  try {
    const raw = localStorage.getItem(USAGE_KEY)
    const usage = raw ? JSON.parse(raw) : {}
    return usage[toolId] || 0
  } catch { return 0 }
}

export function incrementUsage(toolId) {
  try {
    const raw = localStorage.getItem(USAGE_KEY)
    const usage = raw ? JSON.parse(raw) : {}
    usage[toolId] = (usage[toolId] || 0) + 1
    localStorage.setItem(USAGE_KEY, JSON.stringify(usage))
    return usage[toolId]
  } catch { return 1 }
}

export function canUse(toolId) {
  if (isPro()) return true
  const used = getUsage(toolId)
  const limit = FREE_LIMITS[toolId] || 1
  return used < limit
}

export function getRemainingUses(toolId) {
  if (isPro()) return Infinity
  const used = getUsage(toolId)
  const limit = FREE_LIMITS[toolId] || 1
  return Math.max(0, limit - used)
}

export { FREE_LIMITS }
