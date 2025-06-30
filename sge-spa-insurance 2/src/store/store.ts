import { ALLOW_DEVTOOLS } from '@app/utils/constants'
import type { Action, ThunkAction } from '@reduxjs/toolkit'
import { configureStore } from '@reduxjs/toolkit'

import { createLogger } from 'redux-logger'

import reducer from './reducers'

const logger = createLogger({
  collapsed: true,
  diff: true,
})

const store = configureStore({
  reducer,
  middleware: (getDefaultMiddleware) =>
    ALLOW_DEVTOOLS ? getDefaultMiddleware().concat(logger) : getDefaultMiddleware(),
  devTools: ALLOW_DEVTOOLS,
})

export default store

export type AppDispatch = typeof store.dispatch
export type RootState = ReturnType<typeof store.getState>
export type AppThunk<ReturnType = void> = ThunkAction<
  ReturnType,
  RootState,
  unknown,
  Action<string>
>
