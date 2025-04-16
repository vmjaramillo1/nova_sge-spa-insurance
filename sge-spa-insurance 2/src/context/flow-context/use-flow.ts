import { useCallback, useContext } from 'react'
import {
  FlowActionTypes,
  FlowContext,
  SetTransactionAction,
} from '@app/context/flow-context'
import { FlowStatus, RoutesAlias } from '@app/utils/enums'

export const useFlow = () => {
  const [value, dispatch] = useContext(FlowContext)

  if (!dispatch) {
    throw new Error('useFlow must be used within a FlowProvider')
  }

  const dispatchSelectedAccount = useCallback(
    (payload: string) => {
      dispatch({ type: FlowActionTypes.SET_ACCOUNT_HASH_SELECTED, payload })
    },
    [dispatch]
  )

  const dispatchStep = useCallback(
    (payload: RoutesAlias) => {
      dispatch({ type: FlowActionTypes.SET_STEP, payload })
    },
    [dispatch]
  )

  const dispatchTransaction = useCallback(
    (payload: SetTransactionAction['payload']) => {
      dispatch({ type: FlowActionTypes.SET_TRANSACTION, payload })
    },
    [dispatch]
  )

  const dispatchContentLoaded = useCallback(
    (payload: boolean) => {
      dispatch({ type: FlowActionTypes.SET_CONTENT_LOADED, payload })
    },
    [dispatch]
  )

  const dispatchFlowStatus = useCallback(
    (payload: FlowStatus) => {
      dispatch({ type: FlowActionTypes.SET_FLOW_STATUS, payload })
    },
    [dispatch]
  )

  const dispatchPlanSelected = useCallback(
    (payload: string) => {
      dispatch({ type: FlowActionTypes.SET_PLAN_SELECTED, payload })
    },
    [dispatch]
  )

  const dispatchPeriodicitySelected = useCallback(
    (payload: string) => {
      dispatch({ type: FlowActionTypes.SET_PERIODICITY_SELECTED, payload })
    },
    [dispatch]
  )

  return {
    ...value,
    dispatchTransaction,
    dispatchSelectedAccount,
    dispatchStep,
    dispatchContentLoaded,
    dispatchFlowStatus,
    dispatchPlanSelected,
    dispatchPeriodicitySelected,
    dispatch,
  }
}

export default useFlow
