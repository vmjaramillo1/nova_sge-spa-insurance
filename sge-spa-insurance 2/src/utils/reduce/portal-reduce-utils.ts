import {
  Attribute,
  PortalRule,
  SectionRule,
  Param,
  RecordLowercase,
} from '@app/utils/interfaces'

export type BaseAttributeFormat = Pick<Attribute, 'isActive' | 'key' | 'order'>

export type AttributeFormat<T = unknown> = (BaseAttributeFormat & T) | T

export type ReducedPortal<TContent = unknown, TParams = Record<string, unknown>> = {
  code: string
  isActive: boolean
  content: TContent
  params: RecordLowercase<TParams>
}

/**
 * Function to format Attributes from ODD,
 *  - An "String" if the attribute.type equals "string" the attribute contains no more inner attributes
 *  - An "Number" if the attribute.type equals "number"
 *  - An "Boolean" if the attribute.type equals "boolean"
 *  - An "Array" of AttributeFormat if the attribute.type equals "array".
 *  - An "Object" with the custom attributes and the base attributes "key", "order" and "isActive".
 * @param attribute Attribute to format
 */
export function formatAttribute(
  attribute: Attribute
): string | boolean | number | AttributeFormat | Array<AttributeFormat> {
  switch (attribute?.type) {
    case 'array': {
      return attribute.attributes.map(convertAttribute)
    }
    case 'boolean': {
      return attribute.value === 'true'
    }
    case 'number': {
      return parseInt(attribute.value, 10)
    }
    default: {
      return !attribute.attributes.length
        ? attribute.value
        : convertAttribute(attribute)
    }
  }
}

/**
 * Converts the original attribute to AttributeFormat and positions custom attributes at the level of the "key", "order" and "isActive"
 * @param attribute Attribute to reduce
 */
export function convertAttribute(attribute: Attribute) {
  const { isActive, key, order, attributes, value, type } = attribute

  const attrs = attributes.length
    ? reduceAttributes<Record<string, unknown>>(attributes)
    : { value }

  if (type === 'record') return attrs

  return {
    isActive,
    key,
    order,
    ...attrs,
  }
}

/**
 * Iterates through the inner attributes and formats each one recursively.
 * @param attributes to reduce
 */
export function reduceAttributes<TReduce>(attributes: Array<Attribute>) {
  return attributes.reduce(
    (accumulated, current) => ({
      ...accumulated,
      [current.key]: formatAttribute(current),
    }),
    {}
  ) as TReduce
}

export function reduceSections<TReduce>(sections: Array<SectionRule>) {
  return sections.reduce(
    (accumulated, current) => ({
      ...accumulated,
      [current.code]: reduceAttributes(current.attributes),
    }),
    {}
  ) as TReduce
}

export function reduceParams<TReduce>(params: Array<Param>) {
  return params.reduce((acc, param) => {
    return {
      ...acc,
      [param.key.toLowerCase()]: param.value,
    }
  }, {} as RecordLowercase<TReduce>)
}

export function reducePortal<TContent, TParams = Record<string, unknown>>(
  portal: PortalRule
) {
  const { code, sections, params } = portal

  const content = reduceSections<TContent>(sections)
  const paramsReduced = reduceParams<TParams>(params)

  return {
    code,
    content,
    params: paramsReduced,
  }
}
