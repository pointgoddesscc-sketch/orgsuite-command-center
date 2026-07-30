export const metadata = {
  title: 'Orgsuite Command Center',
  description: 'Unified AI Org Hub • SimplyWise Receptionist • Business Command Center',
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
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
