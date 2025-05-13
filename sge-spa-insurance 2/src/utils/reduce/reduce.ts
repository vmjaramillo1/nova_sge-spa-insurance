import {
  PaymentMethodOption,
  PaymentPeriodicityOption,
} from '../interfaces/offerable-product.interface'
import {
  MapperProductResult,
  RecordAssistances,
  RecordBenefits,
  RecordCoverage,
  RecordCoverageById,
  RecordExclusions,
  RecordPaymentMethod,
  RecordPeriodicityWithPrice,
  RecordPlan,
  RecordPlanCoverages,
  RecordPrices,
  RecordAccount,
} from '../interfaces/records.interface'
import {
  AssistanceRule,
  BenefitRule,
  CoverageLimitRule,
  CoverageRule,
  ExclusionRule,
  PlanRule,
  PriceRule,
  ProductRule,
  AccountRule,
} from '../interfaces/rule.interface'

import { type WithCode } from '../interfaces'
import { type OfferableWithType } from './get-app-info'
import { reducePortal } from './portal-reduce-utils'
import { isOffer } from '@app/hooks/use-load-data/utils'

export function reduceGeneric<
  Input extends object,
  Output extends Record<string, Omit<Input, Key>>,
  Key extends keyof Input
>(values: Array<Input>, key: Key) {
  return values.reduce<Output>((acc, value) => {
    const { [key]: keyValue, ...restValue } = value

    return {
      ...acc,
      [keyValue as unknown as string]: restValue,
    }
  }, {} as Output)
}

export function reducePrices(prices: Array<PriceRule>): RecordPrices {
  return prices.reduce<RecordPrices>((acc, price) => {
    const { periodicityPaymentCode, ...restPrice } = price

    return {
      ...acc,
      [periodicityPaymentCode]: restPrice,
    }
  }, {} as RecordPrices)
}

export function reducePaymentMethodsOptions(
  paymentMethodOptions: Array<PaymentMethodOption>
) {
  return paymentMethodOptions.reduce<RecordPaymentMethod>((acc, paymentMethod) => {
    const { code, description, name, order } = paymentMethod

    return {
      ...acc,
      [code]: { description, name, order },
    }
  }, {} as RecordPaymentMethod)
}

export function reducePaymentPeriodicityOptions(
  paymentPeriodicityOptions: Array<PaymentPeriodicityOption>,
  reducedPries: RecordPrices
) {
  return paymentPeriodicityOptions.reduce<RecordPeriodicityWithPrice>(
    (acc, paymentPeriodicity) => {
      const { code, description, factor, name, order } = paymentPeriodicity

      const currentPrice = reducedPries[code]

      return {
        ...acc,
        [code]: {
          description,
          factor,
          name,
          order,
          ...currentPrice,
        },
      }
    },
    {} as RecordPeriodicityWithPrice
  )
}

export function reducePlanCoverages(
  coverageLimits: Array<CoverageLimitRule>,
  coveragesById: RecordCoverageById
): RecordPlanCoverages {
  return coverageLimits.reduce<RecordPlanCoverages>((acc, coverageLimitRule) => {
    const { coverageId, ...restCoverageLimit } = coverageLimitRule
    const { code, ...restCoverage } = coveragesById[coverageId]

    return {
      ...acc,
      [code]: {
        ...restCoverage,
        coverageLimit: restCoverageLimit,
      },
    }
  }, {} as RecordPlanCoverages)
}

export function mapperPlan(
  plan: PlanRule,
  coveragesById: RecordCoverageById,
  paymentMethodOptions: RecordPaymentMethod,
  paymentPeriodicityOptions: Array<PaymentPeriodicityOption>
) {
  const { code, name, coverageLimits, prices } = plan

  const planCoverages = reducePlanCoverages(coverageLimits, coveragesById)

  const pricesResult = reducePrices(prices)

  const periodicityOptions = reducePaymentPeriodicityOptions(
    paymentPeriodicityOptions,
    pricesResult
  )

  return {
    code,
    name,
    coverages: planCoverages,
    periodicityOptions,
    paymentMethodOptions,
  }
}

export function mapperProduct(product: ProductRule): MapperProductResult {
  const { code, name } = product

  const coverages = reduceCoverages(product.coverages)
  const benefits = reduceBenefits(product.benefits)
  const assistances = reduceAssistances(product.assistances)
  const exclusions = reduceExclusions(product.exclusions)

  return {
    code,
    name,
    coverages,
    benefits,
    assistances,
    exclusions,
  }
}

function reduceCoverages(coverages: Array<CoverageRule>): RecordCoverage {
  return reduceGeneric(coverages, 'code')
}

function reduceBenefits(benefits: Array<BenefitRule>): RecordBenefits {
  return reduceGeneric(benefits, 'code')
}

function reduceAssistances(assistances: Array<AssistanceRule>): RecordAssistances {
  return reduceGeneric(assistances, 'code')
}

function reduceExclusions(exclusions: Array<ExclusionRule>): RecordExclusions {
  return reduceGeneric(exclusions, 'code')
}

export function reducePlans(
  plans: Array<PlanRule>,
  coveragesById: RecordCoverageById,
  paymentMethodOptions: RecordPaymentMethod,
  paymentPeriodicityOptions: Array<PaymentPeriodicityOption>
) {
  return plans.reduce<RecordPlan>((acc, plan) => {
    const { code, ...reducePlan } = mapperPlan(
      plan,
      coveragesById,
      paymentMethodOptions,
      paymentPeriodicityOptions
    )

    return {
      ...acc,
      [code]: reducePlan,
    }
  }, {} as RecordPlan)
}

export function reduceAccounts(accounts: Array<AccountRule>) {
  return accounts.reduce<RecordAccount>((acc, account) => {
    const { hash } = account

    return {
      ...acc,
      [hash]: account,
    }
  }, {} as RecordAccount)
}

export function reduceOffer<TContent = unknown, TParams = Record<string, unknown>>(
  offer: OfferableWithType
) {
  const { product, plans, paymentPeriodicityOptions, portal, insuranceName, sale } =
    offer

  const { code, name, coverages, benefits, assistances, exclusions } =
    mapperProduct(product)

  const coveragesById = reduceGeneric(product.coverages, 'id')

  const paymentMethodOptions = reducePaymentMethodsOptions(
    offer.paymentMethodOptions
  )

  const plansResult = reducePlans(
    plans,
    coveragesById,
    paymentMethodOptions,
    paymentPeriodicityOptions
  )

  const portalResult = reducePortal<TContent, TParams>(portal)

  const hasOffer = isOffer(offer)

  return {
    code,
    name,
    sale,
    coverages,
    benefits,
    assistances,
    exclusions,
    insuranceName,
    plans: plansResult,
    portal: portalResult,
    hasOffer: hasOffer,
  }
}

// todo poner prueba
export function reduceToRecord<
  Input extends object,
  Key extends keyof Input,
  OmitKeys extends keyof Input = never
>(values: Array<Input>, key: Key, omit: Array<OmitKeys> = []) {
  const result = values.reduce((acc, properties) => {
    const { [key]: keyProperty } = properties

    omit.forEach((property) => {
      delete properties[property as unknown as keyof typeof properties]
    })

    return {
      ...acc,
      [keyProperty as unknown as string]: properties
    }
  }, {})

  return result as Record<string, Omit<Input, OmitKeys>>
}

// todo poner prueba

export function reduceToRecordByCode<
  TInput extends WithCode,
  TOmit extends keyof TInput = never
>(values: Array<TInput>, omit: Array<TOmit> = []) {
  return reduceToRecord(values, 'code', omit)
}
