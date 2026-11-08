import "server-only";

export type Provider = "google" | "github";
export const isProvider = (p: string): p is Provider => p === "google" || p === "github";

export type OAuthProfile = { providerId: string; name: string; email: string | null; image: string | null };

const cfg = {
  google: {
    authUrl: "https://accounts.google.com/o/oauth2/v2/auth",
    tokenUrl: "https://oauth2.googleapis.com/token",
    scope: "openid email profile",
    extra: { prompt: "select_account" },
    clientId: () => process.env.GOOGLE_CLIENT_ID,
    clientSecret: () => process.env.GOOGLE_CLIENT_SECRET,
  },
  github: {
    authUrl: "https://github.com/login/oauth/authorize",
    tokenUrl: "https://github.com/login/oauth/access_token",
    scope: "read:user",
    extra: {},
    clientId: () => process.env.GITHUB_CLIENT_ID,
    clientSecret: () => process.env.GITHUB_CLIENT_SECRET,
  },
} as const;

export const isConfigured = (p: Provider) => Boolean(cfg[p].clientId() && cfg[p].clientSecret());

// behind Cloudflare/standalone the request origin can be the internal host, so prefer SITE_URL
export const redirectUri = (p: Provider, origin: string) =>
  `${process.env.SITE_URL ?? origin}/api/auth/${p}/callback`;

export function authorizeUrl(p: Provider, redirect: string, state: string) {
  const c = cfg[p];
  const q = new URLSearchParams({
    client_id: c.clientId()!,
    redirect_uri: redirect,
    response_type: "code",
    scope: c.scope,
    state,
    ...c.extra,
  });
  return `${c.authUrl}?${q}`;
}

async function json(res: Response) {
  if (!res.ok) throw new Error(`OAuth request failed: ${res.status}`);
  return res.json();
}

export async function fetchProfile(p: Provider, code: string, redirect: string): Promise<OAuthProfile> {
  const c = cfg[p];
  const token = await json(
    await fetch(c.tokenUrl, {
      method: "POST",
      headers: { Accept: "application/json", "Content-Type": "application/x-www-form-urlencoded" },
      body: new URLSearchParams({
        client_id: c.clientId()!,
        client_secret: c.clientSecret()!,
        code,
        redirect_uri: redirect,
        grant_type: "authorization_code",
      }),
    })
  );
  if (!token.access_token) throw new Error("OAuth: no access token");
  const auth = { Authorization: `Bearer ${token.access_token}`, "User-Agent": "izzy-portfolio" };

  if (p === "google") {
    const u = await json(await fetch("https://openidconnect.googleapis.com/v1/userinfo", { headers: auth }));
    return {
      providerId: String(u.sub),
      name: String(u.name ?? u.email ?? "Pengguna").slice(0, 100),
      email: u.email_verified ? String(u.email).slice(0, 150) : null,
      image: u.picture ? String(u.picture).slice(0, 500) : null,
    };
  }

  const u = await json(await fetch("https://api.github.com/user", { headers: auth }));
  return {
    providerId: String(u.id),
    name: String(u.name ?? u.login).slice(0, 100),
    email: null, // read:user scope: the email is often private, so it is not requested
    image: u.avatar_url ? String(u.avatar_url).slice(0, 500) : null,
  };
}
