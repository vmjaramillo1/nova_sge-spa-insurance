import {
  DefaultAttribute,
  PartialAttribute,
  PartialSection,
  WithAria,
  WithDescription,
  WithLabel,
  WithValue,
} from '../utility'

// todo eliminar luego
export interface DefaultPortal {
  productDetail: PartialSection<ProductDetail>
  productInfo: PartialSection<Product>
  sale: PartialSection<Sale>
  selectAccount: PartialSection<SelectAccount>
  acceptance: PartialSection<Acceptance>
  success: PartialSection<Success>
}

// ProductDetail Section
interface ProductDetail {
  title: DefaultAttribute & WithAria
  description: DefaultAttribute & WithAria
  alert: AlertAttr
  coverages: Array<CoverageItemAttr>
  faq: FaqAttr
  legal: LegalAttr
}

interface AlertAttr extends PartialAttribute, WithDescription {
  action: DefaultAttribute & WithAria
}

interface CoverageItemAttr extends PartialAttribute, WithDescription, WithAria {
  title: string
  subTitle: string
  icon: string
}

interface FaqAttr extends PartialAttribute {
  title: DefaultAttribute & WithAria
  questions: Array<QuestionAttr>
}

interface QuestionAttr extends PartialAttribute {
  track: string
  answer: string
  title: string
}

interface LegalAttr extends PartialAttribute, WithDescription {
  action: string
}

// Product Section
interface Product {
  title: string
  value: DefaultAttribute & WithAria
  description: DefaultAttribute & WithAria
  information: string
  alert: AlertProductAttr
  select: SelectAttr
  disclaimer: DisclaimerAttr
}

interface AlertProductAttr extends PartialAttribute, WithDescription, WithAria {
  title: string
}

interface SelectAttr extends PartialAttribute {
  singleAccount: string
  multipleAccount: string
}

interface DisclaimerAttr extends PartialAttribute, WithDescription {
  action: string
}

// PreviousSale Section
interface Sale {
  title: string
  contract: DefaultAttribute & WithAria
  description: DefaultAttribute & WithAria
  insuranceCarrier: DefaultAttribute & WithAria & WithLabel
  faq: FaqAttr
  range: RangeAttr
  coverages: SaleCoverageAttr
  actions: Actions
}

interface RangeAttr extends PartialAttribute, WithAria {
  items: Array<DefaultAttribute & WithLabel>
}

interface SaleCoverageAttr extends PartialAttribute {
  headers: DefaultAttribute & WithLabel
  items: Array<DefaultAttribute & WithLabel & WithAria>
  description: DefaultAttribute & WithAria
}

interface Actions {
  call: DefaultAttribute & WithAria
  whatsapp: DefaultAttribute & WithAria
  userGuide: DefaultAttribute & WithAria
}

// SelectAccount
interface SelectAccount {
  title: DefaultAttribute & WithAria
}

// Acceptance
interface Acceptance {
  title: string
  descriptions: DescriptionsAttr
}

interface DescriptionsAttr extends PartialAttribute, WithAria {
  toPay: string
  from: string
  toCompany: string
  companyName: string
  forProduct: string
  productName: string
  policy: string
}

// Success

interface Success extends WithDescription {
  title: DefaultAttribute & WithAria
  alert: DefaultAttribute & WithAria
  details: Array<DetailSuccessItemAttr>
  moreInformation: MoreInformationAttr
}

interface DetailSuccessItemAttr extends PartialAttribute, WithAria {
  subItems: Array<PartialAttribute & WithLabel & WithValue>
}

interface MoreInformationAttr extends PartialAttribute {
  action: PartialAttribute & WithLabel & WithAria & { link: string }
  description: DefaultAttribute & WithAria
}
