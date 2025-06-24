import {
  type PageHomeShared,
  type PagePaymentShared,
  type PageAcceptanceShared,
  type PageSuccessShared,
  type ConfigurationFlowShared,
  type PortalSharedParamsKeys,
  type SalePageShared
} from './use-portal-shared-selector.interface'

export type PageHomeFraud = PageHomeShared
export type PagePaymentFraud = PagePaymentShared
export type PageAcceptanceFraud = PageAcceptanceShared
export type PageSuccessFraud = PageSuccessShared
export type ConfigurationFlowFraud = ConfigurationFlowShared
export type SalePageFraud = SalePageShared

export interface PortalFraudReducedDefault {
  home: PageHomeFraud
  payment: PagePaymentFraud
  acceptance: PageAcceptanceFraud
  success: PageSuccessFraud
  flow: ConfigurationFlowFraud
  sale: SalePageFraud
}

export type PortalFraudParamsKeys = PortalSharedParamsKeys

export type PortaFraudParams = {
  [key in Lowercase<PortalFraudParamsKeys>]: string
}
