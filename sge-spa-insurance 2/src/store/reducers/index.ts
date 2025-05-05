import { combineReducers } from '@reduxjs/toolkit'

import appSlice from './app-slice'
// import errorSlice from './error-slice'
import flowSlice from './flow-slice'

const reducer = combineReducers({
  // [errorSlice.name]: errorSlice.reducer,
  [flowSlice.name]: flowSlice.reducer,
  [appSlice.name]: appSlice.reducer,
})

export default reducer
