'use client'
import { createContext, useCallback, useContext } from 'react'
import { defaultLocales } from '../utils/middleware'
import { getLocale, type Locale } from '../utils/i18n'
import get from 'lodash.get'
export interface IIntlContext {
  lang: string
}

export const IntlContext = createContext<IIntlContext>({ lang: defaultLocales })

export const IntlProvider = IntlContext.Provider

export function useIntl() {
  const { lang } = useContext(IntlContext)

  const formatMessage = useCallback(
    async (key: string, defaultMessage: any) => {
      const currentLocale = await getLocale(lang as Locale)
      return get(currentLocale, key, defaultMessage)
    },
    [lang]
  )

  return [lang, { formatMessage }] as const
}
