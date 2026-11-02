"use client";

import { useEffect, useState } from "react";

const labels = {checking:"Checking",connected:"Connected",not_connected:"Not connected",not_configured:"Not configured",unavailable:"Not available",reauthorization_required:"Reconnect required"};

function StatusRow({title,status,detail}) {
  return <div style={{display:"flex",justifyContent:"space-between",gap:16,padding:"14px 0",borderBottom:"1px solid #334155"}}>
    <div><strong>{title}</strong>{detail ? <div style={{fontSize:12,color:"#94a3b8",marginTop:4}}>{detail}</div> : null}</div>
    <span style={{fontSize:13,color:status==="connected"?"#86efac":"#cbd5e1"}}>{labels[status] || "Not verified"}</span>
  </div>;
}

export default function ExternalServicesStatus() {
  const [gmail,setGmail] = useState({status:"checking"});
  const [firebase,setFirebase] = useState({status:"checking"});
  const [socket,setSocket] = useState({status:"not_configured",detail:"No public WebSocket URL configured."});

  useEffect(() => {
    let active = true;
    fetch("/api/gmail/status",{cache:"no-store"}).then(r=>r.json()).then(d=>{if(active)setGmail(d)}).catch(()=>{if(active)setGmail({status:"unavailable"})});
    fetch("/api/integrations/status",{cache:"no-store"}).then(r=>r.json()).then(d=>{if(active)setFirebase(d.firebase || {status:"not_configured"})}).catch(()=>{if(active)setFirebase({status:"unavailable"})});

    const url = process.env.NEXT_PUBLIC_ORG_SUITE_WEBSOCKET_URL;
    if (!url) return () => { active = false; };
    setSocket({status:"checking",detail:"Attempting a real WebSocket handshake."});
    let ws;
    try {
      ws = new WebSocket(url);
      ws.onopen = () => { if(active)setSocket({status:"connected",detail:"WebSocket handshake succeeded."}); };
      ws.onerror = () => { if(active)setSocket({status:"unavailable",detail:"WebSocket handshake failed."}); };
      ws.onclose = () => { if(active)setSocket(current=>current.status==="connected"?{status:"not_connected",detail:"WebSocket closed."}:current); };
    } catch {
      setSocket({status:"unavailable",detail:"WebSocket URL is invalid."});
    }
    return () => { active=false; if(ws)ws.close(); };
  },[]);

  return <section style={{background:"#1e293b",border:"1px solid #334155",borderRadius:16,padding:24,color:"#f8fafc"}}>
    <h2 style={{marginTop:0}}>Service connections</h2>
    <StatusRow title="Google sign-in" status="connected" detail="Authenticated dashboard session." />
    <StatusRow title="Gmail API (read-only)" status={gmail.status} detail={gmail.emailAddress || gmail.detail} />
    <StatusRow title="Firebase / Cloud Functions" status={firebase.status} detail={firebase.detail} />
    <StatusRow title="WebSocket live feed" status={socket.status} detail={socket.detail} />
    <StatusRow title="Google Flow / Flow Music" status="not_available" detail="Shortcut links only — not integrations." />
  </section>;
}
