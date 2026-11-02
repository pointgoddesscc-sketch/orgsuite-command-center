/**
 * DEPRECATED — DO NOT IMPORT
 * This legacy component contained simulated connection states, KPIs, and
 * delivery claims. Use the authenticated /dashboard page instead.
 * No active application imports were found in the feature branch.
 */
export default function OrgsuiteCommandCenterDashboardRealtime() {
  return (
    <section role="status" style={{padding:24,border:"1px solid #64748b",borderRadius:12,background:"#0f172a",color:"#f8fafc"}}>
      <strong>Deprecated component</strong>
      <p style={{marginBottom:0,color:"#cbd5e1"}}>
        This legacy demo is disabled. No real-time connection, AI delivery,
        device bridge, domain health, or marketing KPI data is available here.
        Use the authenticated OrgSuite Command Center dashboard for verified status checks.
      </p>
    </section>
  );
}
