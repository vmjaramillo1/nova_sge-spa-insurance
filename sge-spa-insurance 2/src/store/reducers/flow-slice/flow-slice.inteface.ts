import { FlowStatus } from '@app/utils/enums'

export interface FlowState {
  shared: {
    step: string
    key?: string
    status: FlowStatus
    productCode: string
    contentLoaded: boolean
    planSelected: string
    accountHashSelected: string
    periodicitySelected: string
    transactionReference?: string
  }

  // payment: PaymentStep;
  //   acceptance: AcceptanceStep;
}
