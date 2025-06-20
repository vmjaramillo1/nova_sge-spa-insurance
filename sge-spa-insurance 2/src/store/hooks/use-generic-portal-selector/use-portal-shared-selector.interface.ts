import { AttributeFormat } from '@app/utils/reduce/portal-reduce-utils'
import { TextWhitAria } from '@app/store/hooks/use-generic-portal-selector'
import { WithIsActive, WithKey, WithOrder } from '@app/utils/interfaces'

//#region home
interface SectionHero {
  title: TextWhitAria
  description: TextWhitAria
  bannerType: string
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
  actions: {
    showCoverages: TextWhitAria
    cta: TextWhitAria
  }
  description: TextWhitAria
}

interface ModalCoverages {
  title: TextWhitAria
  description: TextWhitAria
  exclusions: itemsList
  coverages: itemsList
  actions: {
    btnDownload: TextWhitAria
  }
}

export interface PageHomeShared {
  sectionHero: AttributeFormat<SectionHero>
  sectionFaq: AttributeFormat<SectionFaq>
  sectionCoverages: AttributeFormat<SectionCoverages>
  modalCoverages: ModalCoverages
}
//#endregion

//#region payment
export interface PagePaymentShared {
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
//#endregion

//#region acceptance
export interface PageAcceptanceShared {
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
//#endregion

//#region success
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
  actions: {
    CALL: {
      aria: string
      value: string
      icon: string
      link?: string
    }
    DOWNLOAD: {
      aria: string
      value: string
      icon: string
    }
  }
}
export interface PageSuccessShared {
  title: TextWhitAria
  policy: TextWhitAria
  description: TextWhitAria
  alert: TextWhitAria
  details: Array<ItemDetailSuccess>
  moreInformation: MoreInformation
  additionalInfo: {
    title: TextWhitAria
    items: Array<{
      code: string
      aria: string
      icon: string
      value: string
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
//#endregion

//#region flow
interface StepItem extends WithKey, WithOrder, WithIsActive {
  route: string
  title: TextWhitAria
  overlaidIcon?: string
}

export interface ConfigurationFlowShared {
  steps: Array<StepItem>
}
//#endregion

//#region MultiOffer
interface OfferPlan {
  header: string
  row: Record<string, string>
}

export interface PageMultiOffer {
  title: TextWhitAria
  table: Record<string, OfferPlan>
  benefits: Record<string, string>
  actions: {
    footer: string
    cta: TextWhitAria
  }
}

//#endregion

//#region Reduced
export interface PortalSharedReducedDefault {
  home: PageHomeShared
  payment: PagePaymentShared
  acceptance: PageAcceptanceShared
  success: PageSuccessShared
  multiOffer: PageMultiOffer
  flow: ConfigurationFlowShared
}
//#endregion
export type PortalSharedParamsKeys = 'ChannelCode'

export type PortaSharedParams = {
  [key in Lowercase<PortalSharedParamsKeys>]: string
}
