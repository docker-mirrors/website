'use client'
import { createContext, useCallback, useContext, useState } from 'react'
import { useDeepCompareEffect } from 'ahooks'
import { defaultLocales } from '../utils/middleware'
import { getLocale, type Locale } from '../utils/i18n'
import get from 'lodash.get'
export interface IIntlContext {
  lang: string
}

export const IntlContext = createContext<IIntlContext>({ lang: defaultLocales })

export const IntlProvider = IntlContext.Provider

export function useIntl() {
  const [locale, setLocale] = useState<Awaited<ReturnType<typeof getLocale>>>()
  const { lang } = useContext(IntlContext)

  const computedLocale = useCallback(async () => {
    const currentLocale = await getLocale(lang as Locale)
    setLocale(currentLocale)
  }, [lang])

  useDeepCompareEffect(() => {
    computedLocale()
  }, [lang, computedLocale])

  const formatMessage = useCallback(
    (key: string, defaultMessage: any) => {
      return get(locale, key, defaultMessage)
    },
    [locale]
  )

  return [lang, { formatMessage, locale }] as const
}
