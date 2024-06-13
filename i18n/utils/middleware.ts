import { NextMiddleware, NextResponse } from 'next/server'
import negotiator from 'negotiator'

export const locales = ['en', 'zh']
export const defaultLocales = 'zh'

// route like /zh/dashboard
export const redirectLocale: NextMiddleware = (request) => {
  const { pathname } = request.nextUrl
  // if path match. use path
  const matchPath = locales.some(
    (v) => `/${v}` === pathname || pathname.startsWith(`/${v}/`)
  )
  if (!matchPath) {
    const requestInfo = new negotiator({
      headers: {
        'accept-language':
          request.headers.get('accept-language') ?? defaultLocales,
        accept: request.headers.get('accept') ?? ''
      }
    })
    if (requestInfo.mediaTypes().includes('text/html')) {
      // otherwise use accept language
      const locale = requestInfo.languages().find((v) => locales.includes(v))
      request.nextUrl.pathname = `/${locale}${pathname}`

      return NextResponse.redirect(request.nextUrl)
    }
  }
}
