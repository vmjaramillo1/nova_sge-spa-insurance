import { LopdpResult } from '@app/services/insurance/insurance.service.interface'

import { RecordAccountWithType } from '@app/utils/interfaces'

import {
  Sale,
  RecordAssistances,
  RecordBenefits,
  RecordCoverage,
  RecordExclusions,
  RecordPlan,
} from '@app/utils/interfaces'

export interface Products<TPortal> {
  code: string
  name: string
  coverages: RecordCoverage
  benefits: RecordBenefits
  assistances: RecordAssistances
  exclusions: RecordExclusions
  insuranceName: string
  plans: RecordPlan
  portal: TPortal
  sale: Sale | null
}

export type OfferableProduct = {
  productCode: string
  portalCode: string
}
interface PreviousProducts {
  source: string
  contract: string
  portalCode: string
  productCode: string
}

interface OfferProducts {
  offerableProducts: Array<OfferableProduct>
  previousProducts: Array<PreviousProducts>
}

export type AppProducts<TPortal> = Record<string, Products<TPortal>>
export type AppAccounts = {
  accounts: Record<string, RecordAccountWithType>
  cards: Record<string, RecordAccountWithType>
}

export interface AppState<TPortal> {
  offer: OfferProducts
  products: AppProducts<TPortal>
  paymentOptions: AppAccounts
  lopdp: LopdpResult
}
