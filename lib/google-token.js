import { getToken } from "next-auth/jwt";

export async function getGoogleAccessToken(request) {
  const token = await getToken({
    req: request,
    secret: process.env.NEXTAUTH_SECRET || process.env.AUTH_SECRET
  });

  if (!token?.googleAccessToken) return null;

  const expiresAt = Number(token.googleAccessTokenExpires || 0);
  if (expiresAt && expiresAt < Date.now() + 60_000 && token.googleRefreshToken) {
    const response = await fetch("https://oauth2.googleapis.com/token", {
      method: "POST",
      headers: { "content-type": "application/x-www-form-urlencoded" },
      body: new URLSearchParams({
        client_id: process.env.GOOGLE_CLIENT_ID,
        client_secret: process.env.GOOGLE_CLIENT_SECRET,
        refresh_token: token.googleRefreshToken,
        grant_type: "refresh_token"
      }),
      cache: "no-store"
    });
    if (!response.ok) return null;
    const refreshed = await response.json();
    return refreshed.access_token || null;
  }
  return token.googleAccessToken;
}
