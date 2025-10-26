import './globals.css'

import { Bebas_Neue, Space_Grotesk } from 'next/font/google'

import Navbar from '../src/components/Navbar'
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
  title: 'GLB E-Comm',
  description:
    'Modern fashion drops with immersive storytelling, interactive visuals, and elevated shopping flows.',
}

export default function RootLayout({ children }) {
  return (
    <html lang="en" className={`${display.variable} ${grotesk.variable}`}>
      <body className="bg-ink text-sand antialiased">
        <Providers>
          <div className="relative flex min-h-screen flex-col overflow-x-hidden bg-gradient-to-b from-ink via-charcoal/80 to-ink">
            <Navbar />
            <main className="flex-1">{children}</main>
          </div>
        </Providers>
      </body>
    </html>
  )
}