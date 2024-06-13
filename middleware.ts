import { NextMiddleware, MiddlewareConfig, NextResponse } from 'next/server'
import { redirectLocale } from '@/i18n'

export const middleware: NextMiddleware = (request, event) => {
  // locale
  return redirectLocale(request, event)
}

export const config: MiddlewareConfig = {
  matcher: [
    // Skip all internal paths (_next)
    '/((?!_next).*)'
    // Optional: only run on root (/) URL
    // '/'
  ]
}
