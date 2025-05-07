import { AppState } from './app-slice.interface'
import { createSlice, type PayloadAction } from '@reduxjs/toolkit'

export const initialState: AppState<unknown> = {
  code: '',
  name: '',
  coverages: {},
  benefits: {},
  assistances: {},
  exclusions: {},
  insuranceName: '',
  plans: {},
  portal: {},
  accounts: [],
  sale: null,
  lopdp: {
    hasConsent: null,
    acceptedTermsConditions: false,
    url: '',
  },
  hasOffer: false,
}

const appSlice = createSlice({
  name: 'app',
  initialState,
  reducers: {
    loadValues(
      state: AppState<unknown>,
      action: PayloadAction<Partial<AppState<unknown>>>
    ) {
      Object.assign(state, action.payload)
    },
    setLopdp(
      state: AppState<unknown>,
      action: PayloadAction<AppState<unknown>['lopdp']>
    ) {
      state.lopdp = action.payload
    },
    reset: () => initialState,
  },
})

export const { setLopdp, loadValues, reset } = appSlice.actions

export default appSlice
