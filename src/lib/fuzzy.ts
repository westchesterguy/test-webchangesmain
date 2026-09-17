/**
 * Tiny subsequence fuzzy matcher — no dependency.
 * Returns a score (higher = better) or null when the query doesn't match.
 * Bonuses: contiguous runs, start-of-word matches, and earlier matches.
 */
export function fuzzyScore(query: string, target: string): number | null {
  const q = query.trim().toLowerCase();
  if (!q) return 0;
  const t = target.toLowerCase();

  let score = 0;
  let qi = 0;
  let prevMatchIndex = -1;

  for (let ti = 0; ti < t.length && qi < q.length; ti++) {
    if (t[ti] !== q[qi]) continue;

    let charScore = 1;
    // Contiguous run bonus
    if (prevMatchIndex === ti - 1) charScore += 3;
    // Start-of-word bonus
    if (ti === 0 || t[ti - 1] === " " || t[ti - 1] === "-" || t[ti - 1] === "/") {
      charScore += 2;
    }
    // Earliness bonus
    charScore += Math.max(0, 2 - ti * 0.05);

    score += charScore;
    prevMatchIndex = ti;
    qi++;
  }

  return qi === q.length ? score : null;
}

export interface RankableItem {
  label: string;
  keywords?: string[];
}

/** Rank items by best fuzzy score across label + keywords; drops non-matches. */
export function fuzzyRank<T extends RankableItem>(query: string, items: T[]): T[] {
  if (!query.trim()) return items;
  return items
    .map((item) => {
      const haystacks = [item.label, ...(item.keywords ?? [])];
      const best = haystacks.reduce<number | null>((acc, h) => {
        const s = fuzzyScore(query, h);
        if (s === null) return acc;
        return acc === null ? s : Math.max(acc, s);
      }, null);
      return { item, score: best };
    })
    .filter((r): r is { item: T; score: number } => r.score !== null)
    .sort((a, b) => b.score - a.score)
    .map((r) => r.item);
}
