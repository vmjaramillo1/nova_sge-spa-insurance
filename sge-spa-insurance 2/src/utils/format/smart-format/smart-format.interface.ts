export type SmartFormatCallback = (value: string, ...args: Array<string>) => string

export interface FunctionNameAndArgs {
  functionName: string
  functionArgs: Array<string>
}

export interface SmartFormatValue {
  value: string
  format: Array<{ value: string }>
}

export interface DateFormats {
  short: string
  full: string
  aria: string
}
