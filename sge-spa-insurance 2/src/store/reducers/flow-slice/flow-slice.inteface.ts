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
    contract: string
  }
  client: {
    // address: string,
    cellPhone: string
    // city: string,
    // province: string,
    // civilStatus: string,
    // dateBirth: string,
    email: string
    firstLastName: string
    firstName: string
    gender: string
    homePhone: string
    identification: string
    identificationType: string
    // identificationByChannel: string,
    // income: string,
    ipClient: string
    // patrimony: string,
    secondLastName: string
    secondName: string
    // economicActivity: string,
    // economicSubActivity: string,
    // segment: string,
    // subSegment: string,
    // workPhone: string,
    // legalName: string,
    // businessName: string,
    // companyPurpose: string,
    // nationality: string,
    // birthPlace: string,
    //employmentSituation: string
  }

  // payment: PaymentStep;
  //   acceptance: AcceptanceStep;
}
