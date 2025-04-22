import { MergeOfferablePreviousType } from '@app/utils/enums'
import { OfferableProduct, Response } from '@app/utils/interfaces'
import { PortalRule } from '@app/utils/interfaces'
import { ResponseWithResult } from '@app/utils/interfaces'

export interface KeyAndTransactionReference {
  key: string
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
}

export type IdentityValues = PersonSession & PersonInformation

type ParamsToBody<T> = Omit<T, 'identity'> & PersonInformation

//#region ValidateOffer
export interface ValidateOfferParams {
  identity: PersonInformation
}

export type ValidateOfferBody = ParamsToBody<ValidateOfferParams>

// todo validar esoc on servicio posterior
interface ValidateOfferResult {
  value: {
    key: string
    transactionReference: string
  }
  odds: {
    code: string
    message: string
    value: PortalRule
  }
}

export type ValidateOfferResponse = Response<ValidateOfferResult>

//#endregion

//#region FindOffer
export interface FindOfferParams extends KeyAndTransactionReference {
  identity: PersonInformation
}

export type FindOfferBody = ParamsToBody<FindOfferParams>

export interface AccountInfo {
  hash: string
  mask: string
  type: string
  balance: number
  alias: string | null
  favorite: boolean
  value: string
}

export interface LopdpResult {
  hasConsent: boolean | null
  acceptedTermsConditions: boolean
  url: string
}

export interface MergeOfferPrevious {
  type: MergeOfferablePreviousType
  data: Array<OfferableProduct> | null
}

export type MergeOfferPreviousList = Array<MergeOfferPrevious>

export interface FindOfferResult {
  lopdp: LopdpResult
  accounts: Array<AccountInfo>
  odds: MergeOfferPreviousList
}

export type FindOfferResponse = Response<FindOfferResult>

export interface PortalHubOffer extends ResponseWithResult<FindOfferResult> {
  portalHub: PortalRule
}

//#endregion

//#region FindDocuments
export interface FindDocumentsParams extends KeyAndTransactionReference {
  documentsReference?: Array<string>
  identity: PersonInformation
}

export type FindDocumentsBody = ParamsToBody<FindDocumentsParams>

export interface DocumentInfo {
  name: string
  contentType: string
  content: string
}

interface DocumentItem {
  channelCode: string
  channelProductCode: string
  documents: Array<DocumentInfo>
  planCode: string
  productCode: string
}

export interface DocumentsDownloadResult {
  value: Array<DocumentItem>
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
export interface FindContractsParams extends KeyAndTransactionReference {
  reference: string
  identity: PersonInformation
}

export type FindContractsBody = ParamsToBody<FindContractsParams>

export interface ContractDocumentsDownloadResult {
  value: Array<DocumentInfo>
}

export type ContractDocumentsDownloadResponse =
  Response<ContractDocumentsDownloadResult>

//#endregion
