import { createElement, Fragment } from 'react'
import { domToReact } from 'html-react-parser'

import { smartFormatParseOptions } from '../converter'
import { createReplace } from '../utils'

export default createReplace({
  name: 'sf-fragment',
  replace: (node) => {
    return createElement(
      Fragment,
      {},
      domToReact(node.children, smartFormatParseOptions)
    )
  },
})
