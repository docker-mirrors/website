import type { Metadata, Viewport } from 'next'
import { Inter } from 'next/font/google'
import { ThemeProvider } from '@/components/ThemeProvider'

import { cn } from '@/lib/utils'
import { defaultLocales, locales, type Locale } from '@/i18n'

import './globals.css'
import { TailwindIndicator } from '@/components/tailwind-indicator'

const inter = Inter({ subsets: ['latin'] })

export const metadata: Metadata = {
  title: 'Docker Reply',
  description: 'Generated by create next app',
  keywords: ['docker', 'docker images']
}

export const viewport: Viewport = {
  themeColor: [
    { media: '(prefers-color-scheme: light)', color: 'white' },
    { media: '(prefers-color-scheme: dark)', color: 'black' }
  ]
}

export async function generateStaticParams() {
  return locales.map((lang) => ({ lang }))
}

export type RootLayoutProps = Readonly<{
  children: React.ReactNode
  params: {
    lang?: Locale
  }
}>

export default function RootLayout({ children, params }: RootLayoutProps) {
  return (
    <html lang={params.lang ?? defaultLocales} suppressHydrationWarning>
      <head />
      <body
        className={cn(
          'min-h-screen bg-background font-sans antialiased',
          inter.className
        )}
      >
        <ThemeProvider
          enableSystem
          disableTransitionOnChange
          attribute="class"
          defaultTheme="system"
        >
          <div vaul-drawer-wrapper="">
            <div className="relative flex min-h-screen flex-col bg-background">
              {children}
            </div>
          </div>
          <TailwindIndicator/>
        </ThemeProvider>
      </body>
    </html>
  )
}
