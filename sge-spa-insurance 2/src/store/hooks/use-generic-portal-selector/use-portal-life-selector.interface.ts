import {
  type PageHomeShared,
  type PagePaymentShared,
  type PageAcceptanceShared,
  type PageSuccessShared,
  type ConfigurationFlowShared,
  type PortalSharedParamsKeys,
} from './use-portal-shared-selector.interface'

export type PageHomeLife = PageHomeShared
export type PagePaymentLife = PagePaymentShared
export type PageAcceptanceLife = PageAcceptanceShared
export type PageSuccessLife = PageSuccessShared
export type ConfigurationFlowLife = ConfigurationFlowShared

export interface PortalLifeReducedDefault {
  home: PageHomeLife
  payment: PagePaymentLife
  acceptance: PageAcceptanceLife
  success: PageSuccessLife
  flow: ConfigurationFlowLife
}

export type PortalLifeParamsKeys = PortalSharedParamsKeys

export type PortaLifeParams = {
  [key in Lowercase<PortalLifeParamsKeys>]: string
}
