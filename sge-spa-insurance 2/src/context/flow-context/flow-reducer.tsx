import { FlowActions, FlowActionTypes, FlowState } from './flow-context.interface'

const flowReducer = (state: FlowState, action: FlowActions): FlowState => {
  switch (action.type) {
    case FlowActionTypes.SET_ACCOUNT_HASH_SELECTED: {
      return {
        ...state,
        accountHashSelected: action.payload,
      }
    }

    case FlowActionTypes.SET_STEP: {
      return {
        ...state,
        step: action.payload,
      }
    }

    case FlowActionTypes.SET_TRANSACTION: {
      const { key, transactionReference } = action.payload

      return {
        ...state,
        key,
        transactionReference,
      }
    }

    case FlowActionTypes.SET_CONTENT_LOADED: {
      return {
        ...state,
        contentLoaded: action.payload,
      }
    }

    case FlowActionTypes.SET_FLOW_STATUS: {
      return {
        ...state,
        status: action.payload,
      }
    }

    case FlowActionTypes.SET_PLAN_SELECTED: {
      return {
        ...state,
        planSelected: action.payload,
      }
    }

    case FlowActionTypes.SET_PERIODICITY_SELECTED: {
      return {
        ...state,
        periodicitySelected: action.payload,
      }
    }

    default: {
      return state
    }
  }
}

export default flowReducer
