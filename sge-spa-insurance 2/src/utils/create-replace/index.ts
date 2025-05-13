import {
  type DOMNode,
  type HTMLReactParserOptions,
  Element,
  domToReact,
} from 'html-react-parser'
import { Fragment, createElement } from 'react'

import {
  type ReplaceCallback,
  type ElementWithAttributes,
} from '@app/utils/interfaces'

const isNodeElement = (node: DOMNode): node is Element => node.type === 'tag'
const replaceDefault = (node: DOMNode) => {
  return createElement(Fragment, null, domToReact([node]))
}

export function createReplacer(
  options: Record<string, ReplaceCallback>
): HTMLReactParserOptions['replace'] {
  return (node) => {
    if (isNodeElement(node)) {
      const replace = options[node.name] ?? replaceDefault
      return replace(node as unknown as ElementWithAttributes<string>)
    }

    return replaceDefault(node)
  }
}
