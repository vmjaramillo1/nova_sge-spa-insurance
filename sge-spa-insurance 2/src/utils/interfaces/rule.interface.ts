import { CoverageLimit, Plan, Price } from './plan.interface'
import { Portal, Section, Param } from './portal.interface'
import {
  Assistance,
  Benefit,
  Coverage,
  Exclusion,
  Product,
} from './product.interface'
import { ReMapProperties } from './utility'

/**
 * ACCOUNT RULE
 */
export type AccountRule = {
  hash: string
  mask: string
  type: string
  balance: number
  alias: string | null
  favorite: boolean
  value: string
}


/**
 * COVERAGE LIMITS RULE
 */
type ReMapCoverageLimitRule = ReMapProperties<
  CoverageLimit,
  { minAmount: string; maxAmount: string }
>

export type CoverageLimitRule = Pick<
  ReMapCoverageLimitRule,
  'coverageId' | 'maxAmount' | 'minAmount' | 'maxEvents' | 'minEvents'
>

/**
 * PRICE RULE
 */
type ReMapPriceRule = ReMapProperties<
  Pick<Price, 'price' | 'totalPrice' | 'taxes'>,
  { price: string; totalPrice: string; taxes: string }
>

export interface PriceRule extends ReMapPriceRule {
  periodicityPaymentCode: string
}

/**
 * PLAN RULE
 */
export type PlanRule = ReMapProperties<
  Pick<Plan, 'code' | 'coverageLimits' | 'name' | 'prices'>,
  { coverageLimits: CoverageLimitRule[]; prices: PriceRule[] }
>

/**
 * COVERAGE RULE
 */
export type CoverageRule = Pick<
  Coverage,
  | 'id'
  | 'code'
  | 'isActive'
  | 'limitEventMax'
  | 'limitEventMin'
  | 'limitValueMax'
  | 'limitValueMin'
  | 'name'
>

/**
 * BENEFIT RULE
 */
export type BenefitRule = Pick<
  Benefit,
  'code' | 'description' | 'isActive' | 'priority' | 'name'
>

/**
 * EXCLUSION RULE
 */
export type ExclusionRule = Pick<
  Exclusion,
  'code' | 'name' | 'isActive' | 'description' | 'priority'
>

/**
 * ASSISTANCE RULE
 */
export type AssistanceRule = Pick<
  Assistance,
  | 'code'
  | 'name'
  | 'description'
  | 'isActive'
  | 'minEvents'
  | 'maxEvents'
  | 'priority'
>

/**
 * PRODUCT RULE
 */
type ReMapProductRule = ReMapProperties<
  Product,
  {
    coverages: Array<CoverageRule>
    benefits: Array<BenefitRule>
    exclusions: Array<ExclusionRule>
    assistances: Array<AssistanceRule>
  }
>

export type ProductRule = Pick<
  ReMapProductRule,
  | 'assistances'
  | 'benefits'
  | 'code'
  | 'coverages'
  | 'deductibles'
  | 'exclusions'
  | 'requirements'
  | 'isActive'
  | 'name'
>

/**
 * PORTAL RULE
 */
export type PortalRule = Pick<
  ReMapPortalRule,
  'code' | 'isActive' | 'sections' | 'params'
>

export type SectionRule = Pick<Section, 'code' | 'isActive' | 'attributes'>

type ReMapPortalRule = ReMapProperties<
  Portal,
  {
    sections: Array<SectionRule>
    params: Array<Param>
  }
>
