import { createSlice, type PayloadAction } from '@reduxjs/toolkit'

import { GlobalState, FullIdentityEvent, AppError } from './global-slice.inteface'

const initialState: GlobalState<unknown> = {
  security: {
    authEvent: undefined,
    isAuthenticated: false,
  },
  error: [],
  portalHub: {},
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
      state.error.push(action.payload)
    },
    setPortalHub(
      state: GlobalState<unknown>,
      action: PayloadAction<Partial<GlobalState<unknown>['portalHub']>>
    ) {
      state.portalHub = action.payload
    },
  },
})

export const { authenticate, setError, setPortalHub } = globalSlice.actions

export default globalSlice
