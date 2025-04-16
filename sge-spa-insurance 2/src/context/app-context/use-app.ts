import { useCallback, useContext, useMemo } from 'react'
import { AppActionTypes, AppContext, AppState } from '@app/context/app-context'
import { LopdpResult } from '@app/services/insurance'

const useApp = <TPortal = unknown>() => {
  const [value, dispatch] = useContext(AppContext)

  if (!dispatch) {
    throw new Error('useApp must be used within a AppProvider')
  }

  const dispatchLoadValues = useCallback(
    (payload: AppState<TPortal>) => {
      dispatch({ type: AppActionTypes.LOAD_VALUES, payload })
    },
    [dispatch]
  )

  const dispatchLopdp = useCallback(
    (payload: LopdpResult) => {
      dispatch({ type: AppActionTypes.SET_LOPDP, payload })
    },
    [dispatch]
  )

  const isMultiAccount = useMemo(() => {
    if (!value?.accounts?.length) return false

    return value.accounts.length > 1
  }, [value.accounts])

  return {
    ...(value as AppState<TPortal>),
    isMultiAccount,
    dispatchLoadValues,
    dispatchLopdp,
    dispatch,
  }
}

export default useApp
