import { combineReducers } from '@reduxjs/toolkit'

import appSlice from '@app/store/reducers/app-slice'
import globalSlice from '@app/store/reducers/global-slice'
import flowSlice from '@app/store/reducers/flow-slice'

const reducer = combineReducers({
  [globalSlice.name]: globalSlice.reducer,
  [flowSlice.name]: flowSlice.reducer,
  [appSlice.name]: appSlice.reducer,
})

export default reducer
