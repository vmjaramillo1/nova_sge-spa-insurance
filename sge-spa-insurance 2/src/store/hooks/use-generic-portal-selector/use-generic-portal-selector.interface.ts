import { AttributeFormat } from '@app/utils/reduce/portal-reduce-utils'

export type UsePortalSelectorResult<TResult> = [boolean, TResult]

export type PortalDetails<TContent = unknown, TParams = unknown> = {
  code: string
  isActive: boolean
  content: TContent
  params: TParams
}

export interface TypedUsePortalSelectorHook<TContent, TParams> {
  <TSelect>(
    selector: (portal: PortalDetails<TContent, TParams>) => TSelect
  ): UsePortalSelectorResult<TSelect>
  (): UsePortalSelectorResult<PortalDetails<TContent, TParams>>
}

export type ListReducedAttribute<T> = Array<AttributeFormat<T>>

export interface TextWhitAria {
  value: string
  aria: string
}
