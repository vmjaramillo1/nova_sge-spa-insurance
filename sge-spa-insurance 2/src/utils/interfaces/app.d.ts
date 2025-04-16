declare module 'app' {
  export interface Error {
    code: string
    message: string
    details?: string
  }
}
