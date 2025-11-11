import './globals.css'

import { Bebas_Neue, Space_Grotesk } from 'next/font/google'

import Navbar from '../src/components/Navbar'
import LoadingScreen from '../src/components/LoadingScreen'
import Providers from './providers'

const display = Bebas_Neue({
  subsets: ['latin'],
  weight: '400',
  variable: '--font-display',
})

const grotesk = Space_Grotesk({
  subsets: ['latin'],
  weight: ['400', '500', '600', '700'],
  variable: '--font-sans',
})

export const metadata = {
  title: 'Give Love Back — Create with Purpose. Impact with Heart.',
  description:
    'Give Love Back is a creative brand blending design, compassion, and purpose. Discover visual experiences that inspire kindness, creativity, and human connection.',
  icons: {
    icon: '/assets/logo.png',
    shortcut: '/assets/logo.png',
    apple: '/assets/logo.png',
  },
  openGraph: {
    title: 'Give Love Back',
    description: 'Community-first fashion & creative movement.',
    url: 'https://giveloveback.example',
    siteName: 'Give Love Back',
    images: [
      {
        url: '/assets/logo.png',
        width: 512,
        height: 512,
        alt: 'Give Love Back Logo',
      },
    ],
    type: 'website',
  },
  twitter: {
    card: 'summary',
    title: 'Give Love Back',
    description: 'Community-first fashion & creative movement.',
    images: ['/assets/logo.png'],
  },
};

export default function RootLayout({ children }) {
  return (
    <html lang="en" className={`${display.variable} ${grotesk.variable}`}> 
      <body className="bg-ink text-sand antialiased">
        <Providers>
          <LoadingScreen />
          <div className="relative flex min-h-screen flex-col overflow-x-hidden bg-gradient-to-b from-ink via-charcoal/80 to-ink">
            <Navbar />
            <main className="flex-1">{children}</main>
          </div>
        </Providers>
      </body>
    </html>
  )
}