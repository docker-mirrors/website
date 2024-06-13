'use client'
import type { RootLayoutProps } from '@/app/layout'
import { IntlProvider } from '@/i18n'
import { Header } from '@/components/Header'
import { Footer } from '@/components/Footer'

export default function RootLayout({ children, params }: RootLayoutProps) {
  return (
    <IntlProvider value={{ lang: params.lang! }}>
      <Header />
      <main className="flex-1">{children}</main>
      <Footer />
    </IntlProvider>
  )
}
