import hljs from 'highlight.js';
import MarkdownIt from 'markdown-it';

export const md = MarkdownIt({
  html: true,
  linkify: true,
  typographer: true,
  highlight: function (str, lang) {
    if (lang && hljs.getLanguage(lang)) {
      try {
        return hljs.highlight(str, { language: lang }).value;
      } catch (__) {}
    }

    return ''; // use external default escaping
  },
});

export async function hl(code: string) {
  return md.render(code);
}
