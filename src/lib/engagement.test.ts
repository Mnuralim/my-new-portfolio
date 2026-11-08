import { expect, test } from "bun:test";
import { safeReturnTo } from "./safe-return";
import { isBot } from "./bot";
import { sortComments } from "./comment-sort";
import { shareLinks } from "./share";

test("safeReturnTo keeps same-site paths only", () => {
  expect(safeReturnTo("/blog/abc?x=1")).toBe("/blog/abc?x=1");
  for (const bad of ["//evil.com", "/\\evil.com", "https://evil.com", "javascript:alert(1)", "", null, undefined, "/a\nb"])
    expect(safeReturnTo(bad)).toBe("/");
});

test("isBot", () => {
  expect(isBot(null)).toBe(true);
  expect(isBot("Mozilla/5.0 (compatible; Googlebot/2.1)")).toBe(true);
  expect(isBot("WhatsApp/2.23")).toBe(true);
  expect(isBot("Mozilla/5.0 (X11; Linux x86_64) AppleWebKit/537.36 Chrome/120 Safari/537.36")).toBe(false);
});

test("sortComments", () => {
  const c = (id: string, likeCount: number, replies: number, createdAt: string) => ({ id, likeCount, createdAt, replies: Array(replies) });
  const list = [c("old-quiet", 0, 0, "2026-01-01"), c("liked", 3, 0, "2026-01-02"), c("new-quiet", 0, 0, "2026-01-03"), c("threaded", 0, 4, "2026-01-04")];
  expect(sortComments(list, "relevant").map((x) => x.id)).toEqual(["liked", "threaded", "new-quiet", "old-quiet"]);
  expect(sortComments(list, "newest").map((x) => x.id)).toEqual(["threaded", "new-quiet", "liked", "old-quiet"]);
  expect(list[0].id).toBe("old-quiet"); // input not mutated
});

test("shareLinks encodes url and title", () => {
  const l = shareLinks("https://izzy.my.id/blog/a?b=1&c=2", "Halo & dunia");
  expect(l.whatsapp).toBe("https://wa.me/?text=Halo%20%26%20dunia%20https%3A%2F%2Fizzy.my.id%2Fblog%2Fa%3Fb%3D1%26c%3D2");
  expect(l.facebook).toContain("u=https%3A%2F%2Fizzy.my.id%2Fblog%2Fa%3Fb%3D1%26c%3D2");
});
