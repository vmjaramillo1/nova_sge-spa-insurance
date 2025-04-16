import { FC, PropsWithChildren, useReducer, useMemo } from 'react'
import { GlobalContext } from './global-context'
import { GlobalActions, GlobalState } from './global-context.interface'
import globalReducer from './global-reducer'

export const initialState: GlobalState = {
  isAuthenticated: false,
  authEvent: undefined,
  error: undefined,
}

interface GlobalProviderProps {
  initialValues?: Partial<GlobalState>
}

const GlobalProvider: FC<PropsWithChildren<GlobalProviderProps>> = (props) => {
  const { children, initialValues } = props
  const [globalState, dispatch] = useReducer(globalReducer, {
    ...initialState,
    ...initialValues,
  })

  const value = useMemo<[GlobalState, React.Dispatch<GlobalActions>]>(
    () => [globalState, dispatch],
    [globalState]
  )

  return <GlobalContext.Provider value={value}>{children}</GlobalContext.Provider>
}

export default GlobalProvider
