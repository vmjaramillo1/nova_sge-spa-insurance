import {
  AccountInfo,
  LopdpResult,
} from '@app/services/insurance/insurance.service.interface'

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
  hasOffer: boolean
}

export type AppProducts<TPortal> = Record<string, Products<TPortal>>
export type AppAccounts = Record<string, AccountInfo>

export interface AppState<TPortal> {
  products: AppProducts<TPortal>
  accounts: AppAccounts
  lopdp: LopdpResult
}
