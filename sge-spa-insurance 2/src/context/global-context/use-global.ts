import { useCallback, useContext } from 'react'
import { GlobalContext } from './global-context'
import {
  AppError,
  FullIdentityEvent,
  GlobalActionTypes,
} from './global-context.interface'

const useGlobal = () => {
  const [state, dispatch] = useContext(GlobalContext)

  if (!dispatch) {
    throw new Error('useGlobal must be used within a GlobalProvider')
  }

  const dispatchAuthenticate = useCallback(
    (authEvent: FullIdentityEvent) => {
      dispatch({
        type: GlobalActionTypes.AUTHENTICATE,
        payload: { authEvent },
      })
    },
    [dispatch]
  )

  const dispatchError = useCallback(
    (payload: AppError) => {
      dispatch({
        type: GlobalActionTypes.SET_ERROR,
        payload,
      })
    },
    [dispatch]
  )

  return {
    ...state,
    dispatchAuthenticate,
    dispatchError,
    dispatch,
  }
}

export default useGlobal
