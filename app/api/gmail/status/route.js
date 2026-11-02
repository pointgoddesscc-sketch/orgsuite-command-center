import { getGoogleAccessToken } from "../../../../lib/google-token";

export const dynamic = "force-dynamic";

function jsonWithCookies(payload, status, cookies = []) {
  const response = Response.json(payload, {
    status,
    headers: { "cache-control": "no-store" }
  });
  for (const cookie of cookies) response.headers.append("set-cookie", cookie);
  return response;
}

export async function GET(request) {
  const { accessToken, setCookies } = await getGoogleAccessToken(request);
  if (!accessToken) {
    return jsonWithCookies(
      { status: "disconnected", detail: "A valid Google session and refresh token are required. Sign in again." },
      401,
      setCookies
    );
  }

  const response = await fetch("https://gmail.googleapis.com/gmail/v1/users/me/profile", {
    headers: { authorization: `Bearer ${accessToken}` },
    cache: "no-store"
  });

  if (response.status === 401) {
    return jsonWithCookies(
      { status: "disconnected", detail: "Google rejected the access token. Sign in again." },
      401,
      setCookies
    );
  }
  if (!response.ok) {
    return jsonWithCookies(
      { status: "disconnected", detail: `Gmail API returned HTTP ${response.status}.` },
      502,
      setCookies
    );
  }

  const profile = await response.json();
  return jsonWithCookies(
    { status: "connected", emailAddress: profile.emailAddress, messagesTotal: profile.messagesTotal },
    200,
    setCookies
  );
}
