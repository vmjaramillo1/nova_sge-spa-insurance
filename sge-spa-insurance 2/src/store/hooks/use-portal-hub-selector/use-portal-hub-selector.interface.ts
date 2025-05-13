import { AttributeFormat } from '@app/utils/reduce/portal-reduce-utils'
import { title } from 'process'

export type PortalDetails<TContent = unknown, TParams = unknown> = {
  code: string
  isActive: boolean
  content: TContent
  params: TParams
}

export type UsePortalSelectorResult<TResult> = [boolean, TResult]

export interface TypedUsePortalSelectorHook<TContent, TParams> {
  <TSelect>(
    selector: (portal: PortalDetails<TContent, TParams>) => TSelect
  ): UsePortalSelectorResult<TSelect>
  (): UsePortalSelectorResult<PortalDetails<TContent, TParams>>
}

export type ListReducedAttribute<T> = Array<AttributeFormat<T>>

interface TextWhitAria {
  value: string
  aria: string
}

interface SectionHero {
  title: TextWhitAria
}

interface CoverageItem {
  coverageCode: string
  description: TextWhitAria
}

interface ProductCard {
  title: TextWhitAria
  description: TextWhitAria
  paymentType: TextWhitAria
  price: TextWhitAria
  coverages: {
    title: TextWhitAria
    items: CoverageItem[]
  }
  action: {
    urlTarget: string
    value: string
    aria: string
  }
}

interface SectionProducts {
  cards: Record<string, ProductCard>
}

export interface PageHome {
  sectionHero: AttributeFormat<SectionHero>
  sectionProducts: AttributeFormat<SectionProducts>
}

export interface PortalHubReducedDefault {
  home: PageHome
  // termsConditions: PageTermsConditions;

  // CONFIG FLOW
  // flow: PageFlow;
}

export type PortalHubParamsKeys = 'ChannelCode'

export type PortalParams = {
  [key in Lowercase<PortalHubParamsKeys>]: string
}
