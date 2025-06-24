import { OfferableProduct, Response } from '@app/utils/interfaces'
import { PortalRule, AccountRule, ClientRule } from '@app/utils/interfaces'
import { ResponseWithResult } from '@app/utils/interfaces'

//#region Session
export interface KeyAndTransactionReference {
  key?: string
  transactionReference: string
}
export interface PersonSession {
  device: string
  guid: string
  session: string
  ip: string
}

export interface PersonInformation {
  cif: string
  dni: string
  dniType: string
  transactionReference?: string
}

export type IdentityValues = PersonSession & PersonInformation

type ParamsToBody<T> = Omit<T, 'identity'> & PersonInformation
//#endregion

//#region ValidateOffer
export interface ValidateOfferParams {
  identity: PersonInformation
}

export type ValidateOfferBody = ParamsToBody<ValidateOfferParams>

interface OfferableProducts {
  productCode: string
  portalCode: string
}

interface PreviousProducts {
  source: string
  contract: string
  relatedProductCode: string
  portalCode: string
  productCode: string
}

// todo validar eso con servicio posterior
interface ValidateValue {
  transactionReference: string
  lopdpAcceptation: boolean
  offerableProducts: Array<OfferableProducts>
  previousProducts: Array<PreviousProducts>
  availablePaymentOptions: {
    accounts: {
      savings: Array<AccountRule>
      checking: Array<AccountRule>
    }
    cards: Array<AccountRule>
  }
  portal: PortalRule
  client: ClientRule
}

interface ValidateOfferResult {
  value: ValidateValue
}

export type ValidateOfferResponse = Response<ValidateOfferResult>

//#endregion

//#region FindOffer
// todo eliminar el key en caso de ser necessario
export interface FindOfferParams {
  identity: PersonInformation
  offerableProducts?: Array<{
    productCode: string
    portalCode: string
  }>
  transactionReference: string
}

export type FindOfferBody = ParamsToBody<FindOfferParams>

export interface LopdpResult {
  acceptedTermsConditions: boolean
  url: string
}

export interface MergeOfferPrevious {
  data: Array<OfferableProduct> | null
}

export type MergeOfferPreviousList = Array<OfferableProduct>

export interface FindOfferResult {
  value: OfferableProduct | null
}

export type FindOfferResponse = Response<FindOfferResult>

export interface PortalHubOffer extends ResponseWithResult<FindOfferResult> {
  validateResult: ValidateValue
  offerResult: OfferableProduct[]
}

//#endregion

//#region FindDocuments
export interface DocumentsReference {
  reference: string
  flowCode: string
}

export interface FindDocumentsParams {
  documents: Array<DocumentsReference>
}

export type FindDocumentsBody = ParamsToBody<FindDocumentsParams>

export interface DocumentInfo {
  name: string
  contentType: string
  content: string
}

interface DocumentItem extends DocumentInfo {
  reference?: string
  status?: string
}

export interface DocumentsValue {
  transactionReference: string
  documents: Array<DocumentItem>
}

export interface DocumentsDownloadResult {
  value: DocumentsValue
}

export type DocumentsDownloadResponse = Response<DocumentsDownloadResult>

//#endregion

//#region ConsentLopdp
export interface ConsentParams {
  url: string
  hasConsent: boolean
  acceptedTermsConditions: boolean
  action: string
  identity: PersonInformation
}

export type ConsentBody = ParamsToBody<ConsentParams>

export type ConsentResponse = Response<{ [key: string]: unknown }>
//#endregion

//#region ProcessTransaction
export interface ProcessTransactionParams extends KeyAndTransactionReference {
  paymentPeriodicityCode: string
  paymentMethodCode: string
  acceptanceReference: string
  productCode: string
  planCode: string
  accountValue: string
  accountType: string

  identity: PersonInformation
}

export type ProcessTransactionBody = ParamsToBody<ProcessTransactionParams>

export interface ProcessTransactionResult {
  value: string
}

export type ProcessTransactionResponse = Response<ProcessTransactionResult>

//#endregion

//#region FindContracts
export interface FindContractsParams {
  reference: string
}

export type FindContractsBody = ParamsToBody<FindContractsParams>

export interface ContractDocumentsDownloadResult {
  value: Array<DocumentInfo>
}

export type ContractDocumentsDownloadResponse =
  Response<ContractDocumentsDownloadResult>

//#endregion
