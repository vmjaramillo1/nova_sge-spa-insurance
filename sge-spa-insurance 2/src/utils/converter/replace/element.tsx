import { createElement } from 'react'
import { type ReplaceCallback } from '@app/utils/interfaces'
import { attributesToProps, domToReact } from 'html-react-parser'

import { smartFormatParseOptions } from '../converter'

const replaceElement: ReplaceCallback = (node) => {
  const attrs: Record<string, string> = Object.fromEntries(
    Object.entries(node.attribs).filter(
      (entry): entry is [string, string] => entry[1] !== undefined
    )
  )
  delete attrs.class

  if (node.attribs.class) {
    attrs.className = node.attribs.class
  }

  return createElement(
    node.tagName,
    attributesToProps(attrs),
    domToReact(node.children, smartFormatParseOptions)
  )
}

export default replaceElement
