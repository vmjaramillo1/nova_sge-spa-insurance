export interface AccessibleText {
  value: string
  aria?: string
}

export interface CoverageItem {
  coverageCode: string
  description: AccessibleText
}

export interface ProductCardProps {
  code: string
  title: AccessibleText
  description: AccessibleText
  paymentType: AccessibleText
  price: AccessibleText
  coverages: {
    title: AccessibleText
    items: CoverageItem[]
  }
  action: {
    urlTarget: string
    value: string | React.ReactNode
    aria: string
  }
}
