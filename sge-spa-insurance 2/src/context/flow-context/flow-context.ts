import React, { createContext } from 'react'

import { FlowActions, FlowState } from './flow-context.interface'
import { FlowStatus, RoutesFraudAlias } from '@app/utils/enums'

export const initialState: FlowState = {
  accountHashSelected: '',
  planSelected: '',
  periodicitySelected: '',
  transactionReference: undefined,
  key: undefined,
  contentLoaded: false,
  step: RoutesFraudAlias.PRODUCT_DETAIL,
  status: FlowStatus.WAIT_LOAD,
}

export const FlowContext = createContext<
  [FlowState, React.Dispatch<FlowActions> | null]
>([initialState, null])
