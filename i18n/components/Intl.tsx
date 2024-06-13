import { useIntl } from './IntlProvider'

export type IntlProps = {
  children?: React.ReactNode
  key: string
}

export const Intl = ({ children, key }: IntlProps) => {
  const [, { formatMessage }] = useIntl()

  return <>{formatMessage(key, children)}</>
}
