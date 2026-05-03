import '../styles/globals.css';

export const metadata = {
  title: 'CST Monitoring System',
  description: 'Continuous Settling Tank Real-time Monitoring Dashboard'
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}
