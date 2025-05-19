import { createSlice, type PayloadAction } from '@reduxjs/toolkit'

import { FlowState } from './flow-slice.inteface'
import { FlowStatus, RoutesFraudAlias } from '@app/utils/enums'

const initialState: FlowState = {
  shared: {
    productCode: '',
    accountHashSelected: '',
    planSelected: '',
    periodicitySelected: '',
    transactionReference: undefined,
    key: undefined,
    contentLoaded: false,
    step: RoutesFraudAlias.PRODUCT_DETAIL,
    status: FlowStatus.WAIT_LOAD,
  },
}

const flowSlice = createSlice({
  name: 'flow',
  initialState,
  reducers: {
    setSelectedAccount(state, action: PayloadAction<string>) {
      state.shared.accountHashSelected = action.payload
    },
    setStep(state, action: PayloadAction<FlowState['shared']['step']>) {
      state.shared.step = action.payload
    },
    setTransaction(
      state,
      action: PayloadAction<{
        key: FlowState['shared']['key']
        transactionReference: FlowState['shared']['transactionReference']
      }>
    ) {
      state.shared.key = action.payload.key
      state.shared.transactionReference = action.payload.transactionReference
    },
    setContentLoaded(state, action: PayloadAction<boolean>) {
      state.shared.contentLoaded = action.payload
    },
    setFlowStatus(state, action: PayloadAction<FlowState['shared']['status']>) {
      state.shared.status = action.payload
    },
    setPlanSelected(state, action: PayloadAction<string>) {
      state.shared.planSelected = action.payload
    },
    setPeriodicitySelected(state, action: PayloadAction<string>) {
      state.shared.periodicitySelected = action.payload
    },
    setProductCodeSelected(state, action: PayloadAction<string>) {
      state.shared.productCode = action.payload
    },
  },
})

export const {
  setProductCodeSelected,
  setSelectedAccount,
  setStep,
  setTransaction,
  setContentLoaded,
  setFlowStatus,
  setPlanSelected,
  setPeriodicitySelected,
} = flowSlice.actions

export default flowSlice
