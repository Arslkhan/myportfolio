import type { Metadata } from 'next'
import './globals.css'

export const metadata: Metadata = {
  title: 'Arsalan Ahmad Khan — Senior Frontend Engineer',
  description:
    'Frontend Lead with 8+ years building fast, scalable web experiences. Specialising in React, Next.js, and performance-driven ecommerce.',
  metadataBase: new URL('https://arsalanahmadkhan.vercel.app'),
  openGraph: {
    title: 'Arsalan Ahmad Khan — Senior Frontend Engineer',
    description:
      'Frontend Lead with 8+ years building fast, scalable web experiences. Specialising in React, Next.js, and performance-driven ecommerce.',
    url: 'https://arsalanahmadkhan.vercel.app',
    siteName: 'Arsalan Ahmad Khan',
    locale: 'en_US',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Arsalan Ahmad Khan — Senior Frontend Engineer',
    description:
      'Frontend Lead with 8+ years building fast, scalable web experiences. Specialising in React, Next.js, and performance-driven ecommerce.',
    creator: '@arslkhan',
  },
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              '@context': 'https://schema.org',
              '@type': 'Person',
              name: 'Arsalan Ahmad Khan',
              jobTitle: 'Senior Frontend Engineer',
              url: 'https://arsalanahmadkhan.vercel.app',
              email: 'arslkhan5@gmail.com',
              sameAs: [
                'https://linkedin.com/in/arslkhan',
                'https://github.com/Arslkhan',
              ],
            }),
          }}
        />
        {children}
      </body>
    </html>
  )
}
