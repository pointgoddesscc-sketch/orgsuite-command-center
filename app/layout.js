export const metadata = {
  title: {
    default: 'OrgSuite — Unified AI workplace for PSE Management',
    template: '%s | OrgSuite'
  },
  description:
    'OrgSuite connects Grok, ChatGPT/Codex, Copilot, GitHub, Linear, Vercel, Outlook, and secure domains into one command center for Point Goddess CC / PSE Management.',
  applicationName: 'OrgSuite',
  keywords: [
    'OrgSuite',
    'PSE Management',
    'Point Goddess CC',
    'AI workplace',
    'Grok',
    'ChatGPT Codex',
    'Linear',
    'Vercel command center'
  ],
  authors: [{ name: 'Point Goddess CC' }],
  robots: { index: true, follow: true },
  alternates: {
    canonical: 'https://orgsuite-command-center.vercel.app/'
  },
  openGraph: {
    type: 'website',
    locale: 'en_US',
    url: 'https://orgsuite-command-center.vercel.app/',
    siteName: 'OrgSuite',
    title: 'OrgSuite — Unified AI workplace for PSE Management',
    description:
      'Official OrgSuite command center: multi-AI work, official connectors, and secure operations for Point Goddess CC / PSE Management.'
  },
  twitter: {
    card: 'summary_large_image',
    title: 'OrgSuite — Unified AI workplace',
    description:
      'Official workplace OS for Point Goddess CC / PSE Management — one hub for AI, connectors, and operations.',
    creator: '@PointGoddessCc'
  }
};

const jsonLd = {
  '@context': 'https://schema.org',
  '@type': 'Organization',
  name: 'OrgSuite',
  legalName: 'Point Goddess CC / PSE Management',
  url: 'https://orgsuite-command-center.vercel.app/',
  sameAs: [
    'https://github.com/pointgoddesscc-sketch/orgsuite-workspace',
    'https://orgsuite-codex-command-center.vercel.app/',
    'https://linear.app/pse-management/project/orgsuite-codex-app-9146b449b7a1'
  ],
  description:
    'OrgSuite is the unified workplace ecosystem for Point Goddess CC / PSE Management.'
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <head>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
      </head>
      <body style={{
        margin: 0,
        fontFamily: '-apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, Helvetica, Arial, sans-serif',
        background: '#0f172a',
        color: '#e2e8f0',
        minHeight: '100vh'
      }}>
        {children}
      </body>
    </html>
  );
}
