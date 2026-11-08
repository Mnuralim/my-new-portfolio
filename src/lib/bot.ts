const BOT_RE = /bot|crawl|spider|slurp|preview|facebookexternalhit|whatsapp|headless|lighthouse|pagespeed|curl|wget|python|axios|node-fetch|go-http|java\//i;

// views are best-effort: missing or bot-like user agents are not counted
export function isBot(userAgent: string | null | undefined): boolean {
  return !userAgent || BOT_RE.test(userAgent);
}
