export interface Plan {
  id: string
  code: string
  externalCode: string
  productId: string
  name: string
  description: string
  isActive: boolean
  isDeleted: boolean
  beneficiariesMinNumber: number
  beneficiariesMaxNumber: number
  insuredMinNumber: number
  insuredMaxNumber: number
  dependentsMinNumber: number
  dependentsMaxNumber: number
  coverageLimits: CoverageLimit[]
  assistanceLimits: AssistanceLimit[]
  categories: Category[]
  prices: Price[]
  useGuides: UseGuide[]
  extraProperties: Record<string, string>
}

export interface AssistanceLimit {
  assistanceId: string
  planId: string
  minEvents: number
  maxEvents: number
  isActive: boolean
}

export interface Category {
  planId: string
  categoryId: string
  isActive: boolean
}

export interface CoverageLimit {
  coverageId: string
  planId: string
  minAmount: number
  maxAmount: number
  minEvents: number
  maxEvents: number
  isActive: boolean
}

export interface Price {
  planId: string
  channelId: string
  periodicityPaymentId: string
  price: number
  totalPrice: number
  taxes: number
  isActive: boolean
}

export interface UseGuide {
  planId: string
  channelId: string
  location: string
  isActive: boolean
}
