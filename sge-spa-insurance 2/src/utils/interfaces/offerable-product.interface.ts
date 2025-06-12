import { PlanRule, PortalRule, ProductRule } from './rule.interface'

export interface OfferableProduct {
  channelCode: string
  channelProductCode: string
  code: string
  insuranceName: string
  paymentMethodOptions: PaymentMethodOption[]
  paymentPeriodicityOptions: PaymentPeriodicityOption[]
  plans: PlanRule[]
  planCode: string | null
  portal: PortalRule
  product: ProductRule
  productCode: string
  wayCode: string
  sale: Sale | null
}

export interface PaymentPeriodicityOption {
  code: string
  description: string
  embebedProductRuleId: string
  factor: number
  name: string
  order: number
}

export interface PaymentMethodOption {
  code: string
  description: string
  embebedProductRuleId: string
  name: string
  order: number
}

export interface Sale {
  startVigency: string
  endVigency: string
  idGpsSale: string
  state: string
}
