import DOMPurify from 'dompurify'
import parse, { type HTMLReactParserOptions } from 'html-react-parser'

export interface ParserOptions {
  allowedTags?: string[]
  allowedAttributeKeys?: string[]
}

export function createParser(parserOptions: ParserOptions = {}) {
  const { allowedTags = [], allowedAttributeKeys = [] } = parserOptions

  return (html: string, options: HTMLReactParserOptions | undefined = undefined) => {
    const parsedHtml = DOMPurify.sanitize(html, {
      FORCE_BODY: true,
      ALLOWED_TAGS: [...allowedTags],
      ALLOWED_ATTR: [...allowedAttributeKeys],
      CUSTOM_ELEMENT_HANDLING: {
        tagNameCheck: /^sf-./,
        allowCustomizedBuiltInElements: true,
      },
    })

    return parse(parsedHtml, options)
  }
}
