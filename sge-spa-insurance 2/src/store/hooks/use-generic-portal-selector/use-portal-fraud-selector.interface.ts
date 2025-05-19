import { AttributeFormat } from '@app/utils/reduce/portal-reduce-utils'
import { TextWhitAria } from '@app/store/hooks/use-generic-portal-selector'
import { WithIsActive, WithKey, WithOrder } from '@app/utils/interfaces'

interface SectionHero {
  title: TextWhitAria
  description: TextWhitAria
}

interface AccordionItem extends WithKey, WithOrder, WithIsActive {
  question: TextWhitAria
  answer: TextWhitAria
  track: string
  icon: string
}

interface SectionFaq {
  description: TextWhitAria
  questions: Array<AccordionItem>

  alert: TextWhitAria
}

export interface CoverageItem extends WithKey, WithOrder, WithIsActive {
  description: TextWhitAria
  icon: {
    value: string
    color: string
  }
}

interface itemsList {
  title: TextWhitAria
  items: Array<CoverageItem>
}

interface SectionCoverages {
  actionShowCoverages: TextWhitAria
  actionNext: TextWhitAria
  actionDownloadCertificate: TextWhitAria
  title: TextWhitAria
  description: TextWhitAria
  exclusions: itemsList
  coverages: itemsList
}

export interface PageHomeFraud {
  sectionHero: AttributeFormat<SectionHero>
  sectionFaq: AttributeFormat<SectionFaq>
  sectionCoverages: AttributeFormat<SectionCoverages>
}

export interface PortalFraudReducedDefault {
  home: PageHomeFraud
}

export type PortalFraudParamsKeys = 'ChannelCode'

export type PortaFraudParams = {
  [key in Lowercase<PortalFraudParamsKeys>]: string
}
