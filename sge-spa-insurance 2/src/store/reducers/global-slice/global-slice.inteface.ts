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

export interface GlobalState {
  security: {
    isAuthenticated: boolean
    authEvent?: FullIdentityEvent
    error?: AppError
  }
}
