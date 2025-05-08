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

export interface AppState<TPortal> {
  products: Record<string, Products<TPortal>>
  accounts: Record<string, AccountInfo>
  lopdp: LopdpResult
}
