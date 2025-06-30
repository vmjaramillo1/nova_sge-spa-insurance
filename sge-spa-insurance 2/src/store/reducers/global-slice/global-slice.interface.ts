import { Full } from '@app/utils/interfaces'
import { IdentityEvent } from '@pichincha/events-microsite'

export type FullIdentityEvent = Full<IdentityEvent>

export interface AppError {
  code: string
  title: string
  message: string
  onClose?: () => void
  details?: Record<string, string>
}

export interface GlobalState<TPortal> {
  security: {
    isAuthenticated: boolean
    authEvent?: FullIdentityEvent
  }
  error: Array<AppError>
  portalHub: TPortal
}

export default {}
