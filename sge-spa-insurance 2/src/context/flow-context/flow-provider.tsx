import React, { ReactNode, useMemo, useReducer } from 'react'

import { FlowContext, initialState } from './flow-context'
import { FlowActions, FlowState } from './flow-context.interface'
import flowReducer from './flow-reducer'

interface FlowProviderProps {
  initialValues?: Partial<FlowState>
  children: ReactNode
}

const FlowProvider = (props: FlowProviderProps) => {
  const { initialValues, children } = props

  const [state, dispatch] = useReducer(flowReducer, {
    ...initialState,
    ...initialValues,
  })

  const value = useMemo<[FlowState, React.Dispatch<FlowActions>]>(
    () => [state, dispatch],
    [state, dispatch]
  )

  return <FlowContext.Provider value={value}>{children}</FlowContext.Provider>
}

export default FlowProvider
