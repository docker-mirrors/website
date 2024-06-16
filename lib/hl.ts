import MarkdownIt from 'markdown-it'
import Shiki from '@shikijs/markdown-it'

export async function hl(code: string) {
  const md = MarkdownIt()

  md.use(
    await Shiki({
      themes: {
        light: 'vitesse-light',
        dark: 'vitesse-dark'
      }
    })
  )

  return md.render(code)
}
