import { AppActions, AppActionTypes, AppState } from './app-context.interface'

const appReducer = (
  state: AppState<unknown>,
  action: AppActions
): AppState<unknown> => {
  if (action.type === AppActionTypes.LOAD_VALUES) {
    return {
      ...state,
      ...action.payload,
    }
  }

  if (action.type === AppActionTypes.SET_LOPDP) {
    return {
      ...state,
      lopdp: action.payload,
    }
  }

  return state
}

export default appReducer
