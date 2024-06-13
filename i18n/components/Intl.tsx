import { useIntl } from './IntlProvider'

export type IntlProps = {
  children?: React.ReactNode
  locale: string
}

export const Intl = ({ children, locale }: IntlProps) => {
  const [, { formatMessage }] = useIntl()

  return <>{formatMessage(locale, children)}</>
}
