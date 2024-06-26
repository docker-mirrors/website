const locales = {
  en: () => import('@/i18n/locales/en.json').then((module) => module.default),
  zh: () => import('@/i18n/locales/zh.json').then((module) => module.default)
}

export type Locale = keyof typeof locales

export const getLocale = async (locale: Locale) => locales[locale]()
