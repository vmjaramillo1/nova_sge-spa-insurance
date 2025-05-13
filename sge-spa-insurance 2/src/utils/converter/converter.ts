import { createReplacer } from '@app/utils/create-replace'
import { createParser } from '@app/utils/create-parser'
import { type HTMLReactParserOptions } from 'html-react-parser'

import replaceElement from './replace/element'
import replaceFragment from './replace/sf-fragment'
import { mergeReplacers } from './utils'

const replacers = mergeReplacers([replaceFragment])

export const smartFormatParseOptions: HTMLReactParserOptions = {
  replace: createReplacer({
    ...replacers.values,
    ul: replaceElement,
    li: replaceElement,
    p: replaceElement,
    div: replaceElement,
  }),
}

export const parseHtmlToJsx = createParser({
  allowedAttributeKeys: ['style', 'src', 'width', ...replacers.attributes],
  allowedTags: [
    'br',
    'div',
    'h1',
    'h2',
    'h3',
    'h4',
    'h5',
    'span',
    'strong',
    'p',
    'ul',
    'ol',
    'li',
    'style',
    'img',
  ],
})
