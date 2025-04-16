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

export interface AppState<TPortal> {
  code: string
  name: string
  coverages: RecordCoverage
  benefits: RecordBenefits
  assistances: RecordAssistances
  exclusions: RecordExclusions
  insuranceName: string
  plans: RecordPlan
  portal: TPortal
  accounts: Array<AccountInfo>
  sale: Sale | null
  lopdp: LopdpResult
}

export const enum AppActionTypes {
  LOAD_VALUES = 'LOAD_VALUES',
  SET_LOPDP = 'SET_LOPDP',
}

export interface SetLopdpAction {
  type: AppActionTypes.SET_LOPDP
  payload: LopdpResult
}

interface LoadValuesAction<TPortal = unknown> {
  type: AppActionTypes.LOAD_VALUES
  payload: AppState<TPortal>
}

export type AppActions = LoadValuesAction | SetLopdpAction
