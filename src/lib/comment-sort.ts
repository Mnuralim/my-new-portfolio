type Sortable = { likeCount: number; createdAt: string; replies: unknown[] };

// shortcut: sorts in memory, fine up to a few hundred comments per post; move to SQL (denormalised counts) beyond that
export function sortComments<T extends Sortable>(items: T[], sort: "relevant" | "newest"): T[] {
  const newest = (a: T, b: T) => b.createdAt.localeCompare(a.createdAt);
  // relevance = likes weigh double a reply; ties go to the newer comment
  const score = (c: T) => c.likeCount * 2 + c.replies.length;
  return [...items].sort(sort === "newest" ? newest : (a, b) => score(b) - score(a) || newest(a, b));
}
