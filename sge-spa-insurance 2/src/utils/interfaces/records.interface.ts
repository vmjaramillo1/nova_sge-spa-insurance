import {
  PaymentMethodOption,
  PaymentPeriodicityOption,
} from './offerable-product.interface'
import {
  AssistanceRule,
  BenefitRule,
  CoverageLimitRule,
  CoverageRule,
  ExclusionRule,
  PriceRule,
  AccountRule,
} from './rule.interface'
import { WithOutCode } from './utility'

export interface GetDefaultContextReturn<
  PortalType,
  ExtraProperties = Record<string, unknown>
> extends MapperProductResult {
  insuranceName: string
  plans: RecordPlan
  portal: PortalType
  extraProperties?: ExtraProperties
}

export interface MapperProductResult {
  code: string
  name: string
  coverages: RecordCoverage
  benefits: RecordBenefits
  assistances: RecordAssistances
  exclusions: RecordExclusions
}

export type ProductCoverage = WithOutCode<CoverageRule>

export type RecordCoverage = Record<string, ProductCoverage>

export type RecordCoverageById = Record<string, Omit<CoverageRule, 'id'>>

export type ProductPlanCoverage = Omit<ProductCoverage, 'id' | 'isActive'> & {
  coverageLimit: Omit<
    CoverageLimitRule,
    'coverageId' | 'code' | 'planId' | 'coverageCode'
  >
}

export type RecordPlanCoverages = Record<string, ProductPlanCoverage>

export type RecordBenefits = Record<string, WithOutCode<BenefitRule>>

export type RecordAssistances = Record<string, WithOutCode<AssistanceRule>>

export type RecordExclusions = Record<string, WithOutCode<ExclusionRule>>

type ItemPrice = Omit<PriceRule, 'periodicityPaymentCode'>

export type RecordPrices = Record<string, ItemPrice>

export type RecordPaymentMethod = Record<
  string,
  Omit<PaymentMethodOption, 'code' | 'embebedProductRuleId'>
>

type ItemPeriodicity = Omit<
  PaymentPeriodicityOption,
  'code' | 'embebedProductRuleId'
>

export type RecordPeriodicityWithPrice = Record<string, ItemPeriodicity & ItemPrice>

export interface ReducePlanReturn {
  code: string
  name: string
  coverages: RecordPlanCoverages
  periodicityOptions: RecordPeriodicityWithPrice
  paymentMethodOptions: RecordPaymentMethod
}

export type RecordPlan = Record<string, WithOutCode<ReducePlanReturn>>

export type RecordAccountWithType = {
  hash: string
  mask: string
  type: string
  balance: number
  alias: string | null
  favorite: boolean
  allowsTransact: boolean
  paymentType: string
}