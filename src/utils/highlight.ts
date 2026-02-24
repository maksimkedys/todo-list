import { fuzzyMatch } from './fuzzySearch'

export interface HighlightPart {
  key: number
  type: 'text' | 'match'
  value: string
}

export function getHighlightParts(text: string, query: string): HighlightPart[] {
  if (!query.trim()) {
    return [{ key: 0, type: 'text', value: text }]
  }

  const result = fuzzyMatch(text, query)
  if (!result || result.matchedIndices.length === 0) {
    return [{ key: 0, type: 'text', value: text }]
  }

  const matched = new Set(result.matchedIndices)
  const parts: HighlightPart[] = []
  let key = 0
  let i = 0

  while (i < text.length) {
    if (matched.has(i)) {
      let end = i
      while (end < text.length && matched.has(end)) end++
      parts.push({ key: key++, type: 'match', value: text.slice(i, end) })
      i = end
    } else {
      let end = i
      while (end < text.length && !matched.has(end)) end++
      parts.push({ key: key++, type: 'text', value: text.slice(i, end) })
      i = end
    }
  }

  return parts.length ? parts : [{ key: 0, type: 'text', value: text }]
}
