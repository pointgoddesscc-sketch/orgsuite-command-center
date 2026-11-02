import { encode, getToken } from "next-auth/jwt";

const SESSION_MAX_AGE_SECONDS = 30 * 24 * 60 * 60;

function sessionCookieNames(request) {
  const secure = new URL(request.url).protocol === "https:";
  const base = secure ? "__Secure-authjs.session-token" : "authjs.session-token";
  const header = request.headers.get("cookie") || "";
  const present = header.split(";").map((part) => part.trim().split("=")[0]).filter(Boolean);
  const names = new Set([base, ...present.filter((name) =>
    name === "authjs.session-token" ||
    name === "__Secure-authjs.session-token" ||
    name.startsWith("authjs.session-token.") ||
    name.startsWith("__Secure-authjs.session-token.")
  )]);
  return { base, names, secure };
}

function expiredCookie(name, secure) {
  return `${name}=; Path=/; HttpOnly; SameSite=Lax; Max-Age=0${secure ? "; Secure" : ""}`;
}

function clearSessionCookies(request) {
  const { names, secure } = sessionCookieNames(request);
  return [...names].map((name) => expiredCookie(name, secure));
}

function sessionCookie(name, value, secure) {
  return `${name}=${value}; Path=/; HttpOnly; SameSite=Lax; Max-Age=${SESSION_MAX_AGE_SECONDS}${secure ? "; Secure" : ""}`;
}

export async function refreshToken(refreshTokenValue) {
  if (!process.env.GOOGLE_CLIENT_ID || !process.env.GOOGLE_CLIENT_SECRET) {
    throw new Error("Google OAuth client credentials are not configured.");
  }
  if (!refreshTokenValue) {
    throw new Error("Google refresh token is missing.");
  }

  const response = await fetch("https://oauth2.googleapis.com/token", {
    method: "POST",
    headers: { "Content-Type": "application/x-www-form-urlencoded" },
    body: new URLSearchParams({
      client_id: process.env.GOOGLE_CLIENT_ID,
      client_secret: process.env.GOOGLE_CLIENT_SECRET,
      refresh_token: refreshTokenValue,
      grant_type: "refresh_token"
    }),
    cache: "no-store"
  });

  if (!response.ok) {
    throw new Error(`Google token refresh failed with HTTP ${response.status}.`);
  }

  const tokens = await response.json();
  if (!tokens.access_token || !Number.isFinite(Number(tokens.expires_in))) {
    throw new Error("Google token refresh response was incomplete.");
  }

  return {
    accessToken: tokens.access_token,
    expiresAtMs: Date.now() + Number(tokens.expires_in) * 1000,
    refreshToken: tokens.refresh_token || refreshTokenValue
  };
}

/**
 * Reads the encrypted Auth.js JWT, refreshes Google credentials when needed,
 * and persists the updated JWT in an HttpOnly cookie on the API response.
 * Provider tokens are never copied into the browser-visible Auth.js session.
 */
export async function getGoogleAccessToken(request) {
  const secret = process.env.NEXTAUTH_SECRET || process.env.AUTH_SECRET;
  const { base, names, secure } = sessionCookieNames(request);
  if (!secret) {
    return { accessToken: null, setCookies: clearSessionCookies(request) };
  }

  let token;
  try {
    token = await getToken({ req: request, secret, secureCookie: secure, cookieName: base });
  } catch {
    return { accessToken: null, setCookies: clearSessionCookies(request) };
  }

  if (!token?.googleAccessToken || !token?.googleRefreshToken) {
    return { accessToken: null, setCookies: clearSessionCookies(request) };
  }

  const expiresAtMs = Number(token.googleAccessTokenExpires || 0);
  if (expiresAtMs > Date.now() + 60_000) {
    return { accessToken: token.googleAccessToken, setCookies: [] };
  }

  try {
    const refreshed = await refreshToken(token.googleRefreshToken);
    const updatedToken = {
      ...token,
      googleAccessToken: refreshed.accessToken,
      googleRefreshToken: refreshed.refreshToken,
      googleAccessTokenExpires: refreshed.expiresAtMs
    };
    const encoded = await encode({
      token: updatedToken,
      secret,
      salt: base,
      maxAge: SESSION_MAX_AGE_SECONDS
    });

    if (encoded.length > 3800) {
      throw new Error("Refreshed Auth.js session cookie exceeds the safe single-cookie size.");
    }

    const staleChunks = [...names].filter((name) => name !== base);
    return {
      accessToken: refreshed.accessToken,
      setCookies: [
        ...staleChunks.map((name) => expiredCookie(name, secure)),
        sessionCookie(base, encoded, secure)
      ]
    };
  } catch (error) {
    console.error("Google token refresh failed; clearing the session cookie.", error);
    return { accessToken: null, setCookies: clearSessionCookies(request) };
  }
}
