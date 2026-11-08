// Import one markdown file as a blog post. Dry run by default; add --apply to write.
// usage: bun scripts/import-post.ts <file.md> --slug <slug> --num 01 --tag NETWORKING --title "..." \
//          --description "..." --date 2026-11-08 --read-time "6 min" [--apply]
import "dotenv/config";
import { readFileSync } from "node:fs";
import { prisma } from "../src/lib/prisma";

const argv = process.argv.slice(2);
const file = argv.find((a) => !a.startsWith("--"));
const flag = (name: string) => {
  const i = argv.indexOf(`--${name}`);
  return i === -1 ? undefined : argv[i + 1];
};
const apply = argv.includes("--apply");

const fields = {
  slug: flag("slug"),
  num: flag("num"),
  tag: flag("tag"),
  title: flag("title"),
  description: flag("description"),
  date: flag("date"),
  readTime: flag("read-time"),
};
const missing = Object.entries(fields).filter(([, v]) => !v).map(([k]) => k);
if (!file || missing.length) {
  console.error(`Kurang argumen: ${missing.join(", ") || "file"}`);
  process.exit(1);
}

const content = readFileSync(file, "utf8").trim();
const data = {
  ...(fields as Record<string, string>),
  tagColor: null,
  content,
  coverImage: null,
  views: "0", // legacy NOT NULL column, real counts live in viewCount
  featured: false,
  order: 0,
};

const existing = await prisma.blogPost.findUnique({ where: { slug: data.slug }, select: { id: true, title: true } });
if (existing) {
  console.error(`Slug "${data.slug}" sudah dipakai: "${existing.title}". Tidak ada yang ditulis.`);
  process.exit(1);
}

console.log("Akan dimasukkan:");
console.log({ ...data, content: `${content.slice(0, 80)}... (${content.length} karakter)` });

if (!apply) {
  console.log("\nDry run. Jalankan lagi dengan --apply untuk menulis.");
} else {
  const row = await prisma.blogPost.create({ data });
  console.log(`\nSelesai. id=${row.id} -> /blog/${row.slug}`);
}
await prisma.$disconnect();
