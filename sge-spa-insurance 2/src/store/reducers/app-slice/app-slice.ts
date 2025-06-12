import { AppState } from './app-slice.interface'
import { createSlice, type PayloadAction } from '@reduxjs/toolkit'

export const initialState: AppState<unknown> = {
  offer: {
    offerableProducts: [],
    previousProducts: [],
  },
  products: {},
  paymentOptions: {
    accounts: {},
    cards: {},
  },
  lopdp: {
    acceptedTermsConditions: false,
    url: '',
  },
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
    setAccounts(
      state: AppState<unknown>,
      action: PayloadAction<AppState<unknown>['paymentOptions']>
    ) {
      state.paymentOptions = action.payload
    },
    setOffer(
      state: AppState<unknown>,
      action: PayloadAction<AppState<unknown>['offer']>
    ) {
      state.offer = action.payload
    },

    reset: () => initialState,
  },
})

export const { setLopdp, loadValues, setAccounts, setOffer, reset } =
  appSlice.actions

export default appSlice
