"use client";

import { useState } from "react";

export default function PromptCopy({ text }) {
  const [copied, setCopied] = useState(false);
  async function copyPrompt() {
    try {
      await navigator.clipboard.writeText(text);
      setCopied(true);
      window.setTimeout(() => setCopied(false), 1800);
    } catch {
      setCopied(false);
    }
  }
  return <button type="button" onClick={copyPrompt} style={{padding:"8px 12px",border:0,borderRadius:8,background:"#e2e8f0",color:"#0f172a",cursor:"pointer"}}>{copied ? "Copied" : "Copy prompt"}</button>;
}
