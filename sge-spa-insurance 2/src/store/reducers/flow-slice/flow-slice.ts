import { createSlice, type PayloadAction } from '@reduxjs/toolkit'

import { FlowState } from './flow-slice.inteface'
import { FlowStatus, RoutesFraudAlias } from '@app/utils/enums'

const initialState: FlowState = {
  accountHashSelected: '',
  planSelected: '',
  periodicitySelected: '',
  transactionReference: undefined,
  key: undefined,
  contentLoaded: false,
  step: RoutesFraudAlias.PRODUCT_DETAIL,
  status: FlowStatus.WAIT_LOAD,
}

const flowSlice = createSlice({
  name: 'flow',
  initialState,
  reducers: {
    setAccountHashSelected(state, action: PayloadAction<string>) {
      state.accountHashSelected = action.payload
    },
    setStep(state, action: PayloadAction<FlowState['step']>) {
      state.step = action.payload
    },
    setTransaction(
      state,
      action: PayloadAction<{
        key: FlowState['key']
        transactionReference: FlowState['transactionReference']
      }>
    ) {
      state.key = action.payload.key
      state.transactionReference = action.payload.transactionReference
    },
    setContentLoaded(state, action: PayloadAction<boolean>) {
      state.contentLoaded = action.payload
    },
    setFlowStatus(state, action: PayloadAction<FlowState['status']>) {
      state.status = action.payload
    },
    setPlanSelected(state, action: PayloadAction<string>) {
      state.planSelected = action.payload
    },
    setPeriodicitySelected(state, action: PayloadAction<string>) {
      state.periodicitySelected = action.payload
    },
  },
})

export const {
  setAccountHashSelected,
  setStep,
  setTransaction,
  setContentLoaded,
  setFlowStatus,
  setPlanSelected,
  setPeriodicitySelected,
} = flowSlice.actions

export default flowSlice
