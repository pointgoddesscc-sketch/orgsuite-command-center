'use client';

import { useState } from 'react';

export default function OrgsuiteCommandCenter() {
  const [logs] = useState([
    { id: 1, time: '14:32', source: 'SimplyWise', message: 'Incoming call handled by Diane', phone: '+1 512-562-4400' },
    { id: 2, time: '14:18', source: 'WhatsApp', message: 'New lead text received and logged', phone: '+1 512-562-4400' },
    { id: 3, time: '13:55', source: 'Marketing Form', message: 'Contact form submission copied to Firestore', phone: '+1 512-562-4400' },
    { id: 4, time: '13:40', source: 'Orgsuite', message: 'Cross-AI sync completed (Meta • ChatGPT • Telegram • Copilot)', phone: null },
    { id: 5, time: '13:22', source: 'System', message: 'Command Center online — waiting for Firebase + WebSocket connection', phone: null },
  ]);

  return (
    <div style={{
      minHeight: '100vh',
      background: '#0f172a',
      position: 'relative',
      overflow: 'hidden'
    }}>
      {/* Orgsuite Logo Background */}
      <div style={{
        position: 'fixed',
        inset: 0,
        backgroundImage: 'radial-gradient(ellipse at 30% 20%, rgba(59, 130, 246, 0.15) 0%, transparent 50%), radial-gradient(ellipse at 70% 80%, rgba(139, 92, 246, 0.12) 0%, transparent 50%)',
        pointerEvents: 'none',
        zIndex: 0
      }} />

      {/* Large faded logo watermark */}
      <div style={{
        position: 'fixed',
        top: '50%',
        left: '50%',
        transform: 'translate(-50%, -50%)',
        width: 'min(80vw, 600px)',
        height: 'min(80vw, 600px)',
        borderRadius: '50%',
        background: 'linear-gradient(135deg, rgba(59, 130, 246, 0.08), rgba(139, 92, 246, 0.08))',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        fontSize: 'clamp(120px, 25vw, 220px)',
        fontWeight: 800,
        color: 'rgba(148, 163, 184, 0.06)',
        pointerEvents: 'none',
        zIndex: 0,
        userSelect: 'none'
      }}>
        O
      </div>

      <div style={{ maxWidth: 1100, margin: '0 auto', padding: '32px 20px', position: 'relative', zIndex: 1 }}>
        {/* Header */}
        <header style={{
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          marginBottom: 40,
          flexWrap: 'wrap',
          gap: 16
        }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: 16 }}>
            <div style={{
              width: 58, height: 58, borderRadius: 14,
              background: 'linear-gradient(135deg, #3b82f6, #8b5cf6)',
              display: 'flex', alignItems: 'center', justifyContent: 'center',
              fontWeight: 800, fontSize: 24, color: 'white',
              boxShadow: '0 8px 24px rgba(59, 130, 246, 0.35)'
            }}>O</div>
            <div>
              <h1 style={{ margin: 0, fontSize: 26, fontWeight: 700, color: '#f8fafc' }}>
                Orgsuite Command Center
              </h1>
              <p style={{ margin: '4px 0 0', color: '#94a3b8', fontSize: 14 }}>
                Unified AI Org Hub • SimplyWise Receptionist • Live Operations
              </p>
            </div>
          </div>

          <div style={{
            background: 'linear-gradient(135deg, #22c55e, #16a34a)',
            color: 'white',
            padding: '8px 16px',
            borderRadius: 999,
            fontSize: 13,
            fontWeight: 600,
            display: 'flex',
            alignItems: 'center',
            gap: 8,
            boxShadow: '0 4px 12px rgba(34, 197, 94, 0.3)'
          }}>
            <span style={{
              width: 8, height: 8, borderRadius: '50%',
              background: 'white', display: 'inline-block'
            }} />
            Live
          </div>
        </header>

        {/* KPI Cards */}
        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))',
          gap: 16,
          marginBottom: 32
        }}>
          <KpiCard title="AI Syncs Today" value="47" subtitle="Meta • ChatGPT • Telegram • Copilot" />
          <KpiCard title="Receptionist Calls" value="12" subtitle="Diane • +1 512-562-4400" />
          <KpiCard title="Leads Logged" value="9" subtitle="Forms + WhatsApp + Voice" />
          <KpiCard title="Domain Health" value="98%" subtitle="GoDaddy monitored" />
        </div>

        {/* SimplyWise Card */}
        <div style={{
          background: 'linear-gradient(135deg, rgba(30, 41, 59, 0.95), rgba(15, 23, 42, 0.95))',
          border: '1px solid #334155',
          borderRadius: 16,
          padding: 28,
          marginBottom: 28,
          backdropFilter: 'blur(8px)'
        }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', flexWrap: 'wrap', gap: 12 }}>
            <div>
              <h2 style={{ margin: '0 0 6px', fontSize: 20, color: '#f1f5f9' }}>
                SimplyWise AI Receptionist — Diane
              </h2>
              <p style={{ margin: 0, color: '#94a3b8', fontSize: 15 }}>
                Phone: <strong style={{ color: '#38bdf8' }}>+1 512-562-4400</strong>
              </p>
            </div>
            <div style={{
              background: '#0ea5e9',
              color: 'white',
              padding: '6px 14px',
              borderRadius: 8,
              fontSize: 13,
              fontWeight: 600
            }}>
              Active
            </div>
          </div>

          <p style={{ margin: '18px 0 0', color: '#cbd5e1', lineHeight: 1.6, fontSize: 15 }}>
            Every call, text, and form submission is automatically logged into Firestore and appears here in real time.
            The number <strong>+1 512-562-4400</strong> is stored with every entry for complete traceability.
          </p>
        </div>

        {/* Live Logs */}
        <div style={{
          background: 'rgba(30, 41, 59, 0.95)',
          border: '1px solid #334155',
          borderRadius: 16,
          overflow: 'hidden',
          backdropFilter: 'blur(8px)'
        }}>
          <div style={{
            padding: '18px 24px',
            borderBottom: '1px solid #334155',
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'center'
          }}>
            <h3 style={{ margin: 0, fontSize: 17, color: '#f1f5f9' }}>Live Receptionist & AI Logs</h3>
            <span style={{ fontSize: 13, color: '#64748b' }}>Real-time feed</span>
          </div>

          <div>
            {logs.map((log) => (
              <div key={log.id} style={{
                padding: '16px 24px',
                borderBottom: '1px solid rgba(30, 41, 59, 0.8)',
                display: 'grid',
                gridTemplateColumns: '70px 1fr auto',
                gap: 16,
                alignItems: 'center'
              }}>
                <span style={{ color: '#64748b', fontSize: 13 }}>{log.time}</span>
                <div>
                  <div style={{ fontWeight: 600, color: '#e2e8f0', marginBottom: 2 }}>{log.source}</div>
                  <div style={{ color: '#94a3b8', fontSize: 14 }}>{log.message}</div>
                </div>
                {log.phone && (
                  <span style={{
                    background: '#0f172a',
                    color: '#38bdf8',
                    padding: '4px 10px',
                    borderRadius: 6,
                    fontSize: 12,
                    fontFamily: 'ui-monospace, monospace'
                  }}>
                    {log.phone}
                  </span>
                )}
              </div>
            ))}
          </div>
        </div>

        {/* Next Steps */}
        <div style={{
          marginTop: 36,
          background: 'rgba(15, 23, 42, 0.8)',
          border: '1px solid #334155',
          borderRadius: 16,
          padding: 28
        }}>
          <h3 style={{ margin: '0 0 16px', fontSize: 18, color: '#f1f5f9' }}>Finish the Full System</h3>
          <ol style={{ margin: 0, paddingLeft: 20, color: '#cbd5e1', lineHeight: 1.8 }}>
            <li><strong>Firebase Cloud Functions</strong> — Deploy the SimplyWise backend so real calls & texts appear here.</li>
            <li><strong>WebSocket Server</strong> — Deploy to Railway / Render / Fly.io and connect the live feed.</li>
            <li><strong>Connect real-time logs</strong> — Point this dashboard at your Firestore + WebSocket URL.</li>
            <li><strong>GitHub auto-deploy</strong> — Link the repo in Vercel Settings → Git for continuous deploys.</li>
          </ol>
        </div>

        {/* Quick Links */}
        <div style={{
          marginTop: 32,
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(240px, 1fr))',
          gap: 16
        }}>
          <QuickLink
            title="Email Deliverability Suite"
            desc="Branded SMTP • DMARC • Postmaster Tools"
            href="https://branded-email-sender-pink.vercel.app"
          />
          <QuickLink
            title="Weekly Checklist"
            desc="Postmaster + DMARC + SNDS routine"
            href="https://branded-email-sender-pink.vercel.app/checklist"
          />
          <QuickLink
            title="Setup Guides"
            desc="SPF • DKIM • DMARC • Postmaster"
            href="https://branded-email-sender-pink.vercel.app/guide"
          />
        </div>

        <footer style={{
          marginTop: 48,
          textAlign: 'center',
          color: '#64748b',
          fontSize: 13
        }}>
          Orgsuite Command Center • SimplyWise Diane (+1 512-562-4400) • Business & Marketing Hub
        </footer>
      </div>
    </div>
  );
}

function KpiCard({ title, value, subtitle }) {
  return (
    <div style={{
      background: 'rgba(30, 41, 59, 0.9)',
      border: '1px solid #334155',
      borderRadius: 14,
      padding: '20px 22px',
      backdropFilter: 'blur(8px)'
    }}>
      <div style={{ fontSize: 13, color: '#94a3b8', marginBottom: 6 }}>{title}</div>
      <div style={{ fontSize: 28, fontWeight: 700, color: '#f8fafc', marginBottom: 4 }}>{value}</div>
      <div style={{ fontSize: 12, color: '#64748b' }}>{subtitle}</div>
    </div>
  );
}

function QuickLink({ title, desc, href }) {
  return (
    <a href={href} target="_blank" rel="noopener noreferrer" style={{
      background: 'rgba(30, 41, 59, 0.9)',
      border: '1px solid #334155',
      borderRadius: 12,
      padding: '18px 20px',
      textDecoration: 'none',
      color: 'inherit',
      display: 'block',
      backdropFilter: 'blur(8px)'
    }}>
      <div style={{ fontWeight: 600, color: '#e2e8f0', marginBottom: 4 }}>{title}</div>
      <div style={{ fontSize: 13, color: '#94a3b8' }}>{desc}</div>
    </a>
  );
}
