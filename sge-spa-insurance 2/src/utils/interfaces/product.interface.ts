export interface Product {
  id: string
  code: string
  externalCode: string
  name: string
  description: string
  issuesPolicyMother: boolean
  insuranceTypeId: string
  insuranceCarrierId: string
  contractTypeId: string
  isActive: boolean
  isDeleted: boolean
  linkTC: string
  exclusions: Exclusion[]
  benefits: Benefit[]
  deductibles: Deductible[]
  coverages: Coverage[]
  requirements: Requirement[]
  periodicityPayments: PeriodicityPayment[]
  paymentModes: PaymentMode[]
  assistances: Assistance[]
  channels: Channel[]
  productDescriptions: ProductDescription[]
}

interface Item {
  id: string
  code: string
  channelId: string
  name: string
  description: string
  isActive: boolean
  productId: string
  priority: number
}

export interface Assistance {
  id: string
  code: string
  channelId: string
  name: string
  description: string
  isActive: boolean
  minEvents: number
  maxEvents: number
  priority: number
  isDeleted: boolean
}

export interface Exclusion extends Item {
  coverageId: string
}

export type Benefit = Item

export type Deductible = Item

export type Requirement = Item

export interface Channel {
  id: string
  code: string
  name: string
  description: string
  businessIdentification: string
  businessIdentificationType: string
  businessName: string
  isActive: boolean
  isDeleted: boolean
  countryId: string
  currencyId: string
  channelsWays: ChannelsWay[]
  channelContacts: ChannelContact[]
}

export interface ChannelContact {
  label: string
  value: string
  channelId: string
  isActive: boolean
}

export interface ChannelsWay {
  channelId: string
  wayId: string
  isActive: boolean
}

export interface Coverage {
  id: string
  code: string
  channelId: string
  name: string
  description: string
  limitValueMin: number
  limitValueMax: number
  limitEventMin: number
  limitEventMax: number
  priority: number
  isActive: boolean
  productId: string
}

export interface PaymentMode {
  paymentModeId: string
  productId: string
  priority: number
}

export interface PeriodicityPayment {
  periodicityPaymentId: string
  percentageDiscount: number
  productId: string
  priority: number
}

export interface ProductDescription {
  productId: string
  channelId: string
  code: string
  description: string
}
