import 'server-only'

const locales = {
  en: () => import('@/i18n/locales/en.json').then((module) => module.default),
  zh: () => import('@/i18n/locales/zh.json').then((module) => module.default)
}

export const getLocale = async (locale: keyof typeof locales) =>
  locales[locale]()
