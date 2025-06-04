import { AttributeFormat } from '@app/utils/reduce/portal-reduce-utils'
import { TextWhitAria } from '@app/store/hooks/use-generic-portal-selector'
import { WithIsActive, WithKey, WithOrder } from '@app/utils/interfaces'
// tood pasa  similares a u shares

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

export interface PagePaymentFraud {
  title: TextWhitAria
  description: TextWhitAria
  alert: TextWhitAria
  paymentMethod: {
    input: TextWhitAria
  }
  disclaimer: TextWhitAria & {
    action: string
  }
  selectAccount: {
    multipleAccount: string
    singleAccount: string
  }
  actionNext: {
    cta: {
      value: string
      aria: {
        enabled: string
        disabled: string
      }
    }
  }
}

interface StepItem extends WithKey, WithOrder, WithIsActive {
  route: string
}

interface ConfigurationFlow {
  steps: Array<StepItem>
}

interface PageAcceptance {
  title: string
  descriptions: {
    aria: string
    toPay: string
    from: string
    toCompany: string
    companyName: string
    forProduct: string
    productName: string
    policy: string
  }
  actions: {
    btnCancel: TextWhitAria
    cta: TextWhitAria
  }
}

interface SubItems extends WithKey, WithOrder, WithIsActive {
  label: string
  value: string
}

interface ItemDetailSuccess extends WithKey, WithOrder, WithIsActive {
  aria: string
  subItems: Array<SubItems>
}

interface MoreInformation extends WithKey, WithOrder, WithIsActive {
  title: TextWhitAria
  actions: Array<{
    aria: string
    value: string
    codeAction: string
    link?: string
  }>
}

interface PageSuccess {
  title: TextWhitAria
  policy: TextWhitAria
  description: TextWhitAria
  alert: TextWhitAria
  details: Array<ItemDetailSuccess>
  moreInformation: MoreInformation
  additionalInfo: {
    title: TextWhitAria
    items: Array<{
      aria: string
      icon: string
      vaue: string
    }>
  }
  toolbar: {
    title: TextWhitAria
  }
  actions: {
    btnDownload: TextWhitAria
    cta: TextWhitAria
    btnInformation: TextWhitAria
  }
}

export interface PortalFraudReducedDefault {
  home: PageHomeFraud
  payment: PagePaymentFraud
  acceptance: PageAcceptance
  success: PageSuccess
  flow: ConfigurationFlow
}

export type PortalFraudParamsKeys = 'ChannelCode'

export type PortaFraudParams = {
  [key in Lowercase<PortalFraudParamsKeys>]: string
}
