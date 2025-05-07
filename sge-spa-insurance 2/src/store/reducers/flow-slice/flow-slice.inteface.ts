import { FlowStatus } from '@app/utils/enums'
import { AllRouteAliases } from '@app/routes/config'

export interface FlowState {
  accountHashSelected: string
  planSelected: string
  periodicitySelected: string
  transactionReference?: string
  key?: string
  step: AllRouteAliases
  contentLoaded: boolean
  status: FlowStatus
}



