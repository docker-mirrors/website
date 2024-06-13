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
    (key: string, defaultMessage: any) => {
      return get(getLocale(lang as Locale), key, defaultMessage)
    },
    [lang]
  )

  return [lang, { formatMessage }] as const
}
