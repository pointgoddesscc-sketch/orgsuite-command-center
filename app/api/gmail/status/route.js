import { auth } from "../../../../auth";
import { getGoogleAccessToken } from "../../../../lib/google-token";

export const dynamic = "force-dynamic";

export async function GET(request) {
  const session = await auth();
  if (!session) return Response.json({ status: "not_connected" }, { status: 401 });

  const accessToken = await getGoogleAccessToken(request);
  if (!accessToken) {
    return Response.json({ status: "reauthorization_required", detail: "No usable Gmail access token is available." });
  }

  const response = await fetch("https://gmail.googleapis.com/gmail/v1/users/me/profile", {
    headers: { authorization: `Bearer ${accessToken}` },
    cache: "no-store"
  });
  if (!response.ok) {
    return Response.json({ status: "not_connected", detail: "Gmail API did not confirm access." });
  }
  const profile = await response.json();
  return Response.json({ status: "connected", emailAddress: profile.emailAddress, messagesTotal: profile.messagesTotal });
}
