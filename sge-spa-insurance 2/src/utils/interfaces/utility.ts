export type ReMapProperties<
  TSource,
  TProperties extends { [K in keyof TSource]?: TProperties[K] }
> = {
  [P in keyof TSource as P extends keyof TProperties ? never : P]: TSource[P]
} & TProperties

export type Full<TObject> = {
  [P in keyof TObject]-?: TObject[P]
}
export type RecordLowercase<T> = {
  [K in keyof T as Lowercase<K & string>]: T[K]
}

export interface WithIsActive {
  isActive: boolean
}

export interface WithOrder {
  order: number
}

export interface WithValue {
  value: string
}

export interface WithCode {
  code: string
}

export interface WithKey {
  key: string
}

export interface WithDescription {
  description: string
}

export type WithName = {
  name: string
}

export interface WithLabel {
  label: string
}

export interface WithAria {
  aria: string
}

export type WithOutCode<TObject extends WithCode> = Omit<TObject, 'code'>

export type PartialSection<TObject> = TObject & WithIsActive

export type PartialAttribute = WithKey & WithOrder & WithIsActive

export type DefaultAttribute = PartialAttribute & WithValue

export interface CallToAction extends PartialAttribute, WithLabel {
  icon: string
  action: string
}
