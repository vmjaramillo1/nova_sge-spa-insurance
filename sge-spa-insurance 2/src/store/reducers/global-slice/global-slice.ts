import { createSlice, type PayloadAction } from '@reduxjs/toolkit'

import { GlobalState, FullIdentityEvent, AppError } from './global-slice.inteface'

const initialState: GlobalState = {
  // nuevo
  security: {
    authEvent: undefined,
    isAuthenticated: false,
    error: undefined,
  },
}

const globalSlice = createSlice({
  name: 'global',
  initialState,
  reducers: {
    authenticate: (state, action: PayloadAction<FullIdentityEvent>) => {
      state.security.authEvent = action.payload
      state.security.isAuthenticated = true
    },
    setError: (state, action: PayloadAction<AppError>) => {
      state.security.error = action.payload
    },
  },
})

export const { authenticate, setError } = globalSlice.actions

export default globalSlice
