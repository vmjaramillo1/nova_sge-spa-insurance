export interface BasicResponse {
  code: string
  message: string
}

export type ResponseWithError = {
  [Key in keyof BasicResponse]: BasicResponse[Key]
}
export type ResponseWithResult<TResult> = BasicResponse & TResult

export type Response<TResult> = ResponseWithResult<TResult> | ResponseWithError
