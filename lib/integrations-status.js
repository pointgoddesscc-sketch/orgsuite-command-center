export async function checkFirebaseStatus() {
  const url = process.env.FIREBASE_HEALTHCHECK_URL;
  if (!url) return {status:"not_configured",detail:"No verified Firebase health-check URL configured."};
  try {
    const response = await fetch(url,{cache:"no-store",signal:AbortSignal.timeout(4000)});
    return response.ok
      ? {status:"connected",detail:"Firebase health endpoint responded successfully."}
      : {status:"disconnected",detail:`Firebase health endpoint returned HTTP ${response.status}.`};
  } catch {
    return {status:"disconnected",detail:"Firebase health endpoint could not be reached."};
  }
}
