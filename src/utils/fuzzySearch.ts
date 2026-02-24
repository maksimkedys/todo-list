/**
 * Lightweight fuzzy search engine.
 *
 * Scoring heuristics (higher = better match):
 *  - Exact substring match gets the highest score.
 *  - Subsequence match (all query chars appear in order) gets a medium score
 *    with bonuses for consecutive runs and word-boundary alignment.
 *  - Levenshtein-based similarity on individual words catches typos and
 *    transpositions (e.g. "tkas" → "task").
 *
 * The module exposes a single {@link fuzzyMatch} function that returns `null`
 * for non-matches or a {@link FuzzyResult} with a score and the character
 * indices that matched (used for highlighting).
 */

export interface FuzzyResult {
  score: number
  matchedIndices: number[]
}

export function fuzzyMatch(text: string, query: string): FuzzyResult | null {
  const q = query.trim().toLowerCase()
  if (q.length === 0) return null

  const t = text.toLowerCase()

  const exact = exactSubstringMatch(t, q)
  if (exact) return exact

  const subseq = subsequenceMatch(t, q)
  if (subseq) return subseq

  const wordLevel = wordSimilarityMatch(t, q)
  if (wordLevel) return wordLevel

  return null
}

function exactSubstringMatch(text: string, query: string): FuzzyResult | null {
  const idx = text.indexOf(query)
  if (idx === -1) return null

  const matchedIndices = Array.from({ length: query.length }, (_, i) => idx + i)
  const boundaryBonus = idx === 0 || /\s/.test(text[idx - 1]) ? 50 : 0
  return { score: 1000 + boundaryBonus, matchedIndices }
}

function subsequenceMatch(text: string, query: string): FuzzyResult | null {
  const indices: number[] = []
  let ti = 0

  for (let qi = 0; qi < query.length; qi++) {
    const ch = query[qi]
    let found = false
    while (ti < text.length) {
      if (text[ti] === ch) {
        indices.push(ti)
        ti++
        found = true
        break
      }
      ti++
    }
    if (!found) return null
  }

  let score = 100
  for (let i = 1; i < indices.length; i++) {
    if (indices[i] === indices[i - 1] + 1) score += 10
  }
  for (const idx of indices) {
    if (idx === 0 || /\s/.test(text[idx - 1])) score += 5
  }

  return { score, matchedIndices: indices }
}

function wordSimilarityMatch(text: string, query: string): FuzzyResult | null {
  const textWords = splitWords(text)
  const queryWords = query.split(/\s+/).filter(Boolean)
  if (queryWords.length === 0) return null

  const matchedIndices: number[] = []
  let totalScore = 0
  let wordsMatched = 0

  for (const qw of queryWords) {
    let bestScore = 0
    let bestIndices: number[] = []

    for (const { word, startIndex } of textWords) {
      const dist = levenshtein(qw, word)
      const maxLen = Math.max(qw.length, word.length)
      if (maxLen === 0) continue

      const similarity = 1 - dist / maxLen
      if (similarity < 0.6) continue

      const score = similarity * 50
      if (score > bestScore) {
        bestScore = score
        const matchLen = Math.min(qw.length, word.length)
        bestIndices = Array.from({ length: matchLen }, (_, i) => startIndex + i)
      }
    }

    if (bestScore > 0) {
      totalScore += bestScore
      wordsMatched++
      matchedIndices.push(...bestIndices)
    }
  }

  if (wordsMatched === 0) return null
  const coverageBonus = (wordsMatched / queryWords.length) * 20
  const sorted = [...new Set(matchedIndices)].sort((a, b) => a - b)
  return { score: 10 + totalScore + coverageBonus, matchedIndices: sorted }
}

interface WordInfo {
  word: string
  startIndex: number
}

function splitWords(text: string): WordInfo[] {
  const result: WordInfo[] = []
  const re = /\S+/g
  let m: RegExpExecArray | null
  while ((m = re.exec(text)) !== null) {
    result.push({ word: m[0], startIndex: m.index })
  }
  return result
}

function levenshtein(a: string, b: string): number {
  const la = a.length
  const lb = b.length
  if (la === 0) return lb
  if (lb === 0) return la

  let prev = Array.from({ length: lb + 1 }, (_, i) => i)
  let curr = new Array<number>(lb + 1)

  for (let i = 1; i <= la; i++) {
    curr[0] = i
    for (let j = 1; j <= lb; j++) {
      const cost = a[i - 1] === b[j - 1] ? 0 : 1
      curr[j] = Math.min(prev[j] + 1, curr[j - 1] + 1, prev[j - 1] + cost)
    }
    ;[prev, curr] = [curr, prev]
  }

  return prev[lb]
}
