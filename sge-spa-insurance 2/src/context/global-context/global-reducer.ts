import {
  GlobalActionTypes,
  GlobalActions,
  GlobalState,
} from './global-context.interface'

const globalReducer = (state: GlobalState, action: GlobalActions): GlobalState => {
  switch (action.type) {
    case GlobalActionTypes.AUTHENTICATE: {
      return {
        ...state,
        isAuthenticated: true,
        authEvent: action.payload.authEvent,
      }
    }
    case GlobalActionTypes.SET_ERROR: {
      return {
        ...state,
        error: action.payload,
      }
    }
    default: {
      return state
    }
  }
}

export default globalReducer
