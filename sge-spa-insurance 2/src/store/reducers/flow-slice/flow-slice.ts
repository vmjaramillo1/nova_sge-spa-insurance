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
    contentLoaded: false,
    step: RoutesFraudAlias.PRODUCT_DETAIL,
    status: FlowStatus.WAIT_LOAD,
  },
  client: {
    cellPhone: '',
    email: '',
    firstLastName: '',
    firstName: '',
    gender: '',
    homePhone: '',
    identification: '',
    identificationType: '',
    ipClient: '',
    secondLastName: '',
    secondName: '',
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
        transactionReference: FlowState['shared']['transactionReference']
      }>
    ) {
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
    setClientData(state, action: PayloadAction<FlowState['client']>) {
      state.client = action.payload
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
  setClientData,
} = flowSlice.actions

export default flowSlice
