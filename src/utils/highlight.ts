export interface HighlightPart {
  key: number
  type: 'text' | 'match'
  value: string
}

function escapeRegex(str: string): string {
  return str.replace(/[.*+?^${}()|[\]\\]/g, '\\$&')
}

export function getHighlightParts(text: string, query: string): HighlightPart[] {
  if (!query.trim()) {
    return [{ key: 0, type: 'text', value: text }]
  }

  const escaped = escapeRegex(query.trim())
  const re = new RegExp(`(${escaped})`, 'gi')
  const parts = text.split(re)
  const result: HighlightPart[] = []
  let key = 0

  for (let i = 0; i < parts.length; i++) {
    const value = parts[i]
    if (value === '') continue
    const isMatch = i % 2 === 1
    result.push({ key: key++, type: isMatch ? 'match' : 'text', value })
  }

  return result.length ? result : [{ key: 0, type: 'text', value: text }]
}
