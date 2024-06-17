'use client'
import type { RootLayoutProps } from '@/app/layout'
import { IntlProvider } from '@/i18n'
import { Header } from '@/components/Header'
import { Footer } from '@/components/Footer'
import { ScrollArea } from '@/components/ui/scroll-area'

export default function RootLayout({ children, params }: RootLayoutProps) {
  return (
    <IntlProvider value={{ lang: params.lang! }}>
      <Header />
      <ScrollArea className="grow">
        <main className="p-8">{children}</main>
      </ScrollArea>
      <Footer />
    </IntlProvider>
  )
}
