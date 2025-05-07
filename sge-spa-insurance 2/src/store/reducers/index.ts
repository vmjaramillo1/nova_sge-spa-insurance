import { combineReducers } from '@reduxjs/toolkit'

import appSlice from './app-slice'
import globalSlice from './global-slice'
import flowSlice from './flow-slice'

const reducer = combineReducers({
  [globalSlice.name]: globalSlice.reducer,
  [flowSlice.name]: flowSlice.reducer,
  [appSlice.name]: appSlice.reducer,
})

export default reducer
