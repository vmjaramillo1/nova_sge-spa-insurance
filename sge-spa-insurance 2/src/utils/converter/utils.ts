import { type DOMNode, type Element } from 'html-react-parser'
import { type ReplaceCallback } from '@app/utils/interfaces'

export function createReplace<T extends string = string>(args: {
  name: string
  replace: ReplaceCallback<T>
  attributes?: Array<T>
}) {
  const { name, replace, attributes = [] } = args

  return { name, replace, attributes }
}

type CreateReplaceResult = ReturnType<typeof createReplace>

export function mergeReplacers(options: Array<CreateReplaceResult>) {
  const attributes: string[] = []

  const values = options.reduce((acc, replacer) => {
    attributes.push(...replacer.attributes)
    return { ...acc, [replacer.name]: replacer.replace }
  }, {} as Record<string, CreateReplaceResult['replace']>)

  return {
    attributes: [...new Set(attributes)],
    values,
  }
}

export function isElement(node: DOMNode): node is Element {
  return node.type === 'tag'
}

export function byTagName(tagName: string) {
  return (node: DOMNode): node is Element => isElement(node) && node.name === tagName
}
