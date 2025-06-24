import { AttributeFormat } from '@app/utils/reduce/portal-reduce-utils'
import { TextWhitAria } from '@app/store/hooks/use-generic-portal-selector'

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

export interface TermsAndConditionPage {
  title: TextWhitAria
  description: TextWhitAria
  checkbox: {
    description: TextWhitAria
  }
  previewDocument: TextWhitAria
  action: TextWhitAria
}

interface ProductSaleCard {
  title: TextWhitAria
  account: TextWhitAria
  nextPayment: TextWhitAria & { text: string }
  amount: TextWhitAria & { text: string }
  action: TextWhitAria
}

interface PageSale {
  description: TextWhitAria
  defaultCard: {
    description: TextWhitAria
    action: TextWhitAria
  }
  products: Record<string, ProductSaleCard>
}

export interface PortalHubReducedDefault {
  home: PageHome
  sale: PageSale
}

export type PortalHubParamsKeys = 'ChannelCode'

export type PortalParams = {
  [key in Lowercase<PortalHubParamsKeys>]: string
}
