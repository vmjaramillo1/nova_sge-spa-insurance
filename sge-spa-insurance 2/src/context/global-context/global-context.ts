import { createContext } from 'react'
import { GlobalActions, GlobalState } from './global-context.interface'

export const initialState: GlobalState = {
  authEvent: undefined,
  isAuthenticated: false,
  error: undefined,
}

export const GlobalContext = createContext<
  [GlobalState, React.Dispatch<GlobalActions> | null]
>([initialState, null])
