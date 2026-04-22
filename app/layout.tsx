import type { Metadata } from 'next'
import './globals.css'

export const metadata: Metadata = {
  title: 'Arsalan Ahmad Khan — Senior Frontend Engineer',
  description: 'Senior Frontend Engineer & Frontend Lead with 8+ years building high-traffic ecommerce platforms.',
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  )
}
