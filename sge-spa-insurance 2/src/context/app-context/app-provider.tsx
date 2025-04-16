import React, { ReactNode, useMemo, useReducer } from 'react'

import { AppContext, initialState } from './app-context'
import { AppActions, AppState } from './app-context.interface'
import appReducer from './app-reducer'

interface AppProviderProps {
  children: ReactNode
  initialValues?: Partial<AppState<unknown>>
}

const AppProvider = (props: AppProviderProps) => {
  const { children, initialValues } = props

  const [state, dispatch] = useReducer(appReducer, {
    ...initialState,
    ...initialValues,
  })

  const value = useMemo<[AppState<unknown>, React.Dispatch<AppActions>]>(
    () => [state, dispatch],
    [state, dispatch]
  )

  return <AppContext.Provider value={value}>{children}</AppContext.Provider>
}

export default AppProvider
