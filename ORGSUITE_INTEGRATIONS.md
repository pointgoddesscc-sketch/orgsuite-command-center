# OrgSuite integration map

## Verified status at implementation time

The existing repository README mentions Railway, Render, and Fly.io as possible WebSocket hosting choices, but does not identify a selected host, service name, endpoint, or deployment URL. Those details remain **not verified**.

## WebSocket endpoint discovery

1. Check the Railway project/service dashboard for a deployed WebSocket service and its public domain.
2. If no Railway service exists, check Render dashboards for a Web Service configured to accept WebSocket upgrades.
3. If neither exists, check Fly.io apps and their allocated public hostnames.
4. Verify the chosen service's WebSocket URL and deployment before configuring `NEXT_PUBLIC_ORG_SUITE_WEBSOCKET_URL`.
5. The dashboard reports **Connected** only after the browser's WebSocket `onopen` event confirms a successful handshake. A configured URL alone never counts as connected.

## Firebase Cloud Functions

1. Inspect the Firebase project and its deployed Functions list.
2. Identify a dedicated health function and verify its HTTPS URL and authentication requirements.
3. Configure `FIREBASE_HEALTHCHECK_URL` only after that endpoint is verified.
4. The dashboard reports **Connected** only when the configured health endpoint responds successfully. No endpoint is assumed or fabricated.

## Dashboard states

- **Connected**: an actual service handshake or health request succeeded.
- **Not configured**: no endpoint has been provided.
- **Not connected**: a connection was previously open but has closed.
- **Unavailable**: a configured endpoint could not be reached.
- **Not available**: the service is deliberately link-only or has no supported integration in this project.

The dashboard placeholders do not create or deploy external infrastructure.
