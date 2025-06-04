import { createContext, useContext } from 'react'

export const SmartContext = createContext<Record<string, unknown>>({})

export const useSmartContext = () => useContext(SmartContext)

export const SmartContextProvider = SmartContext.Provider
