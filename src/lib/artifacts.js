// Artifact storage - localStorage based
// Stores generated documents with metadata

const ARTIFACTS_KEY = 'hccs_artifacts'
const AI_USAGE_KEY = 'hccs_ai_uses'

export function getArtifacts() {
  try {
    return JSON.parse(localStorage.getItem(ARTIFACTS_KEY) || '[]')
  } catch { return [] }
}

export function saveArtifact(artifact) {
  const arts = getArtifacts()
  arts.unshift({
    ...artifact,
    id: Date.now().toString(36) + Math.random().toString(36).slice(2, 6),
    savedAt: new Date().toISOString(),
  })
  localStorage.setItem(ARTIFACTS_KEY, JSON.stringify(arts))
  return arts
}

export function deleteArtifact(id) {
  const arts = getArtifacts().filter(a => a.id !== id)
  localStorage.setItem(ARTIFACTS_KEY, JSON.stringify(arts))
  return arts
}

export function getAIUsage() {
  try { return +(localStorage.getItem(AI_USAGE_KEY) || '0') } catch { return 0 }
}

export function incrementAIUsage() {
  const n = getAIUsage() + 1
  localStorage.setItem(AI_USAGE_KEY, n.toString())
  return n
}

export const AI_FREE_LIMIT = 5
