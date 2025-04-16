import { Full } from '@app/utils/interfaces'
import { IdentityEvent } from '@pichincha/events-microsite'

export type FullIdentityEvent = Full<IdentityEvent>

export interface GlobalState {
  isAuthenticated: boolean
  authEvent?: FullIdentityEvent
  error?: AppError
}

export const enum GlobalActionTypes {
  AUTHENTICATE = 'AUTHENTICATE',
  SET_ERROR = 'SET_ERROR',
}

export interface AuthenticateAction {
  type: GlobalActionTypes.AUTHENTICATE
  payload: {
    authEvent: FullIdentityEvent
  }
}

export interface SetErrorAction {
  type: GlobalActionTypes.SET_ERROR
  payload: AppError
}

export type GlobalActions = AuthenticateAction | SetErrorAction

export interface AppError {
  code: string
  title: string
  message: string
  onClose?: () => void
  details?: Record<string, string>
}

declare module '@pichincha/events-microsite' {
  interface IdentityEvent {
    os?: string
  }
}
