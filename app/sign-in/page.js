"use client";

import { signIn } from "next-auth/react";

export default function SignInPage() {
  return (
    <main style={{minHeight:"100vh",display:"grid",placeItems:"center",background:"#0f172a",color:"#f8fafc",padding:24}}>
      <section style={{width:"min(100%,420px)",padding:32,border:"1px solid #334155",borderRadius:20,background:"#1e293b",textAlign:"center"}}>
        <div style={{fontSize:13,letterSpacing:2,color:"#94a3b8",textTransform:"uppercase"}}>OrgSuite</div>
        <h1 style={{fontSize:30,margin:"12px 0"}}>Command Center</h1>
        <p style={{color:"#cbd5e1",lineHeight:1.6}}>Sign in securely with your Google account to view your connected services.</p>
        <button onClick={() => signIn("google", { callbackUrl:"/dashboard" })} style={{marginTop:20,width:"100%",padding:"14px 18px",border:0,borderRadius:10,background:"#f8fafc",color:"#111827",fontWeight:700,cursor:"pointer"}}>
          Continue with Google
        </button>
        <p style={{fontSize:12,color:"#94a3b8",marginTop:20}}>Gmail access is read-only. No messages are sent.</p>
      </section>
    </main>
  );
}
