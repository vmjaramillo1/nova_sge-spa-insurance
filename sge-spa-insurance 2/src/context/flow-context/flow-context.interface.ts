import { RoutesAlias, FlowStatus } from '@app/utils/enums'

export interface FlowState {
  accountHashSelected: string
  planSelected: string
  periodicitySelected: string
  transactionReference?: string
  key?: string
  step: RoutesAlias
  contentLoaded: boolean
  status: FlowStatus
}

export const enum FlowActionTypes {
  SET_ACCOUNT_HASH_SELECTED = 'SET_ACCOUNT_HASH_SELECTED',
  SET_STEP = 'SET_STEP',
  SET_TRANSACTION = 'SET_TRANSACTION',
  SET_CONTENT_LOADED = 'SET_CONTENT_LOADED',
  SET_FLOW_STATUS = 'SET_FLOW_STATUS',
  SET_PLAN_SELECTED = 'SET_PLAN_SELECTED',
  SET_PERIODICITY_SELECTED = 'SET_PERIODICITY_SELECTED',
}

export interface SetAccountHashSelectedAction {
  type: FlowActionTypes.SET_ACCOUNT_HASH_SELECTED
  payload: string
}

export interface SetStepAction {
  type: FlowActionTypes.SET_STEP
  payload: RoutesAlias
}

export interface SetTransactionAction {
  type: FlowActionTypes.SET_TRANSACTION
  payload: {
    transactionReference: string
    key: string
  }
}

export interface SetContentLoadedAction {
  type: FlowActionTypes.SET_CONTENT_LOADED
  payload: boolean
}

export interface SetFlowStatusAction {
  type: FlowActionTypes.SET_FLOW_STATUS
  payload: FlowStatus
}

export interface SetPLanSelected {
  type: FlowActionTypes.SET_PLAN_SELECTED
  payload: string
}

export interface SetPeriodicitySelected {
  type: FlowActionTypes.SET_PERIODICITY_SELECTED
  payload: string
}

export type FlowActions =
  | SetAccountHashSelectedAction
  | SetStepAction
  | SetTransactionAction
  | SetContentLoadedAction
  | SetFlowStatusAction
  | SetPLanSelected
  | SetPeriodicitySelected
