import {
  SmartFormatCallback,
  FunctionNameAndArgs,
} from '@app/utils/format/smart-format'
import { type UnknownRecord } from '@app/utils/interfaces'
import { get } from '@app/utils/format'

function getDeepVars(content: string) {
  let deepLevel = -1
  let lastChar = ''
  let startIndex = 0

  const result: string[] = []

  content.split('').forEach((char, index) => {
    if (char === '{' && lastChar === '{') {
      if (deepLevel === -1) {
        startIndex = index - 1
      }

      deepLevel += 1
    }

    if (char === '}' && lastChar === '}') {
      deepLevel -= 1

      if (deepLevel === -1) {
        const value = content.slice(startIndex, index + 1)
        result.push(value)
      }
    }

    lastChar = char
  })

  return result
}

function clearInterpolation(str: string, size: number): string {
  return str.slice(size, str.length - size)
}

function getFunctionNameAndArgs(value: string): FunctionNameAndArgs {
  const [functionName, args] = value.split(/\((.*)/, 2)
  const functionArgs: Array<string> =
    args === ')' ? [] : args.slice(0, -1).split(',')

  return { functionName, functionArgs }
}

/**
 * Allows to interpolate variables dynamically in a string and apply format functions
 * @param content Initial string to be interpolated
 * @param context Object with values to be interpolated
 * @param formats Record of format functions to be applied
 * @returns reduced string
 * @example
 * const content = "Hello {{name::upper()}} {{surname::lower()}}";
 * const context = { name: "John", surname: "Doe" };
 * const formats = {
 *  upper: (value: string) => value.toUpperCase(),
 *  lower: (value: string) => value.toLowerCase(),
 * };
 *
 * smartFormat(content, context, formats); // "Hello JOHN doe"
 *
 */
export function smartFormat(
  content: string,
  context: UnknownRecord,
  formats: Record<string, SmartFormatCallback> = {}
): string {
  const vars = getDeepVars(content)

  const smartFormatValue = (value: string) => {
    return smartFormat(value, context, formats)
  }

  if (!vars) return content

  const resultFormat = vars?.reduce((prevContent, currentVar) => {
    // Remove "{{" and "}}"
    const cleanValue = clearInterpolation(currentVar, 2)

    // Apply smartFormat by vars
    const reviewCleanValue = smartFormatValue(cleanValue)

    // Split value by format callbacks
    const [propertyPath, ...formatCallbacks] = reviewCleanValue.split('::')

    // Get value from context
    const value = get<string>(context, propertyPath, '')

    // Apply format callbacks
    const valueResult = formatCallbacks.reduce((prevValue, format) => {
      const { functionName, functionArgs } = getFunctionNameAndArgs(format)

      if (!formats[functionName]) return prevValue

      // Map function args to apply smartFormat recursively
      const mappedFunctionArgs = functionArgs.map(smartFormatValue)

      // Apply format function
      const formatFunction = formats[functionName]
      return formatFunction(prevValue, ...mappedFunctionArgs)
    }, value)

    return prevContent.replace(currentVar, valueResult)
  }, content)

  return resultFormat
}

export default smartFormat
