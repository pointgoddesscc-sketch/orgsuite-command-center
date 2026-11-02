"use client";

import { useEffect, useState } from "react";

const labels = {
  checking: "Checking",
  connected: "Connected",
  not_configured: "Not configured",
  disconnected: "Disconnected",
  unverified: "Unverified"
};

function normalizeStatus(status) {
  if (status === "connected" || status === "checking" || status === "not_configured" || status === "unverified") return status;
  return "disconnected";
}

function StatusRow({title,status,detail}) {
  const safeStatus = normalizeStatus(status);
  return <div style={{display:"flex",justifyContent:"space-between",gap:16,padding:"14px 0",borderBottom:"1px solid #334155"}}>
    <div><strong>{title}</strong>{detail ? <div style={{fontSize:12,color:"#94a3b8",marginTop:4}}>{detail}</div> : null}</div>
    <span style={{fontSize:13,color:safeStatus==="connected"?"#86efac":"#cbd5e1"}}>{labels[safeStatus]}</span>
  </div>;
}

export default function ExternalServicesStatus() {
  const [google,setGoogle] = useState({status:"checking"});
  const [gmail,setGmail] = useState({status:"checking"});
  const [firebase,setFirebase] = useState({status:"not_configured",detail:"No verified Firebase health-check endpoint configured."});
  const [socket,setSocket] = useState({status:"not_configured",detail:"No public WebSocket URL configured."});

  useEffect(() => {
    let active = true;
    fetch("/api/auth/session",{cache:"no-store"})
      .then(r=>r.json())
      .then(d=>{if(active)setGoogle({status:d?.user?"connected":"disconnected",detail:d?.user?.email || "No authenticated Google session."});})
      .catch(()=>{if(active)setGoogle({status:"unverified",detail:"Could not verify the Auth.js session endpoint."});});

    fetch("/api/gmail/status",{cache:"no-store"})
      .then(async r=>{const d=await r.json();return {...d,status:r.status===401?"disconnected":d.status};})
      .then(d=>{if(active)setGmail({status:normalizeStatus(d.status),detail:d.emailAddress || d.detail});})
      .catch(()=>{if(active)setGmail({status:"unverified",detail:"Could not verify Gmail API access."});});

    fetch("/api/integrations/status",{cache:"no-store"})
      .then(r=>r.json())
      .then(d=>{if(active)setFirebase(d.firebase || {status:"not_configured"});})
      .catch(()=>{if(active)setFirebase({status:"unverified",detail:"Could not verify Firebase status."});});

    const url = process.env.NEXT_PUBLIC_ORG_SUITE_WEBSOCKET_URL;
    if (!url) return () => { active = false; };
    setSocket({status:"checking",detail:"Attempting a real WebSocket handshake."});
    let ws;
    try {
      ws = new WebSocket(url);
      ws.onopen = () => { if(active)setSocket({status:"connected",detail:"WebSocket handshake succeeded."}); };
      ws.onerror = () => { if(active)setSocket({status:"disconnected",detail:"WebSocket handshake failed."}); };
      ws.onclose = () => { if(active)setSocket(current=>current.status==="connected"?{status:"disconnected",detail:"WebSocket closed."}:current); };
    } catch {
      setSocket({status:"disconnected",detail:"WebSocket URL is invalid."});
    }
    return () => { active=false; if(ws)ws.close(); };
  },[]);

  return <section style={{background:"#1e293b",border:"1px solid #334155",borderRadius:16,padding:24,color:"#f8fafc"}}>
    <h2 style={{marginTop:0}}>Service connections</h2>
    <StatusRow title="Google sign-in" status={google.status} detail={google.detail} />
    <StatusRow title="Gmail API (read-only)" status={gmail.status} detail={gmail.detail} />
    <StatusRow title="Firebase / Cloud Functions" status={firebase.status} detail={firebase.detail} />
    <StatusRow title="WebSocket live feed" status={socket.status} detail={socket.detail} />
    <StatusRow title="Vercel" status="not_configured" detail="Deployment is managed externally; no website-side Vercel integration is configured." />
    <StatusRow title="Google Flow / Flow Music" status="not_configured" detail="Links only — not connected." />
  </section>;
}
