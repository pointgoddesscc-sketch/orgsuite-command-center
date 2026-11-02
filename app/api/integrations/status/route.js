import { auth } from "../../../../auth";
import { checkFirebaseStatus } from "../../../../lib/integrations-status";

export const dynamic = "force-dynamic";

export async function GET() {
  const session = await auth();
  if (!session) return Response.json({error:"Unauthorized"},{status:401});
  return Response.json({firebase:await checkFirebaseStatus()},{headers:{"cache-control":"no-store"}});
}
