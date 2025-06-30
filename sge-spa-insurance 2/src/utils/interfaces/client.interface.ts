/**
 * CLIENT DATA
 */
export type Client = {
  address: string
  cellPhone: string
  city: string
  province: string
  civilStatus: string
  dateBirth: string
  email: string
  firstLastName: string
  firstName: string
  gender: string
  homePhone: string
  identification: string
  identificationType: string
  identificationByChannel: string
  income: string
  ipClient: string
  patrimony: string
  secondLastName: string
  secondName: string
  economicActivity: string
  economicSubActivity: string
  segment: string
  subSegment: string
  workPhone: string
  legalName: string
  businessName: string
  companyPurpose: string
  nationality: string
  birthPlace: string
  employmentSituation: string
}

/**
 * CLIENT RULE
 */
export type ClientRule = Pick<
  Client,
  | 'cellPhone'
  | 'email'
  | 'firstLastName'
  | 'firstName'
  | 'gender'
  | 'homePhone'
  | 'identification'
  | 'identificationType'
  | 'ipClient'
  | 'secondLastName'
  | 'secondName'
>
