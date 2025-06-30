import {
  type PageHomeShared,
  type PagePaymentShared,
  type PageAcceptanceShared,
  type PageSuccessShared,
  type PageMultiOffer,
  type ConfigurationFlowShared,
  type SalePageShared,
  type PortalSharedParamsKeys,
  type TermsAndConditionsShared,
} from './use-portal-shared-selector.interface'

export type PageHomeLife = PageHomeShared
export type PagePaymentLife = PagePaymentShared
export type PageAcceptanceLife = PageAcceptanceShared
export type PageSuccessLife = PageSuccessShared
export type PageMultiOfferLife = PageMultiOffer
export type ConfigurationFlowLife = ConfigurationFlowShared
export type TermsAndConditionsLifePage = TermsAndConditionsShared
export type SalePageFlowLife = SalePageShared

export interface PortalLifeReducedDefault {
  home: PageHomeLife
  payment: PagePaymentLife
  acceptance: PageAcceptanceLife
  success: PageSuccessLife
  multiOffer: PageMultiOfferLife
  flow: ConfigurationFlowLife
  sale: SalePageFlowLife
  termsAndConditions: TermsAndConditionsLifePage
}

export type PortalLifeParamsKeys = PortalSharedParamsKeys

export type PortaLifeParams = {
  [key in Lowercase<PortalLifeParamsKeys>]: string
}
