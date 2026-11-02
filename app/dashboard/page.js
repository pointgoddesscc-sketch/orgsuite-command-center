import { auth, signOut } from "../../auth";
import { redirect } from "next/navigation";
import ExternalServicesStatus from "../../components/ExternalServicesStatus";
import PromptCopy from "../../components/PromptCopy";

const shortcuts = [
  {title:"YouTube",href:"https://www.youtube.com/"},
  {title:"YouTube Studio",href:"https://studio.youtube.com/"},
  {title:"Google Flow",href:"https://flow.google/"},
  {title:"Flow Music",href:"https://flowmusic.app/"}
];

export default async function DashboardPage() {
  const session = await auth();
  if (!session) redirect("/sign-in");

  return <main style={{minHeight:"100vh",background:"#0f172a",color:"#f8fafc",padding:"32px 20px"}}>
    <div style={{maxWidth:1000,margin:"0 auto"}}>
      <header style={{display:"flex",justifyContent:"space-between",alignItems:"center",gap:16,flexWrap:"wrap",marginBottom:28}}>
        <div><div style={{fontSize:12,letterSpacing:2,color:"#94a3b8"}}>ORGSUITE</div><h1 style={{margin:"8px 0"}}>Command Center</h1><p style={{color:"#cbd5e1",margin:0}}>Signed in as {session.user?.email || "Google user"}</p></div>
        <form action={async()=>{"use server";await signOut({redirectTo:"/sign-in"});}}><button style={{padding:"10px 16px",borderRadius:9,border:"1px solid #475569",background:"transparent",color:"#f8fafc"}}>Sign out</button></form>
      </header>
      <ExternalServicesStatus />
      <section style={{marginTop:24,background:"#1e293b",border:"1px solid #334155",borderRadius:16,padding:24}}>
        <h2 style={{marginTop:0}}>Creator shortcuts</h2><p style={{color:"#cbd5e1"}}>Open official sites in a new tab. Flow and Flow Music are links only, not connected services.</p>
        <div style={{display:"grid",gridTemplateColumns:"repeat(auto-fit,minmax(190px,1fr))",gap:12}}>
          {shortcuts.map(item=><a key={item.title} href={item.href} target="_blank" rel="noreferrer" style={{padding:16,border:"1px solid #475569",borderRadius:10,color:"#f8fafc",textDecoration:"none"}}>{item.title} ↗</a>)}
        </div>
      </section>
      <section style={{marginTop:24,background:"#1e293b",border:"1px solid #334155",borderRadius:16,padding:24}}>
        <h2 style={{marginTop:0}}>Copy-ready prompt library</h2>
        <PromptItem title="Music video brief" text="Create a full-length visual music video using the supplied original track. Build a clear visual concept, match edits to the song's energy, and keep branding consistent. Do not imitate a specific living artist." />
        <PromptItem title="YouTube release package" text="Prepare an accurate YouTube title, description, chapters where appropriate, thumbnail concept, and relevant tags for the supplied track. Do not claim a scheduled or published release unless confirmed in YouTube Studio." />
      </section>
    </div>
  </main>;
}

function PromptItem({title,text}) {
  return <div style={{padding:"14px 0",borderBottom:"1px solid #334155"}}><strong>{title}</strong><p style={{color:"#cbd5e1",lineHeight:1.6}}>{text}</p><PromptCopy text={text}/></div>;
}
