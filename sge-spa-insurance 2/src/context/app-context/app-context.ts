import React, { createContext } from 'react'

import { AppActions, AppState } from './app-context.interface'

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

export const AppContext = createContext<
  [AppState<unknown>, React.Dispatch<AppActions> | null]
>([initialState, null])
