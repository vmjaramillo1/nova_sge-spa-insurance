import axios from 'axios'
import {
  ConsentParams,
  ConsentResponse,
  ContractDocumentsDownloadResponse,
  DocumentsDownloadResponse,
  FindContractsParams,
  FindDocumentsParams,
  FindOfferParams,
  FindOfferResponse,
  ProcessTransactionParams,
  ProcessTransactionResponse,
  ValidateOfferParams,
  ValidateOfferResponse,
} from './insurance.service.interface'
import { MessageService, WebviewMessages } from '@pichincha/events-microsite'

import { HttpStatusCode } from '@app/utils/enums'
import { resolveError, validateResult, encryptBody } from '@app/utils/service'

const defaultTimeout = '10000'

axios.defaults.timeout = parseInt(
  process.env?.REACT_APP_INSURANCE_SERVICE_TIMEOUT ?? defaultTimeout,
  10
)

// Call App logout when receive UNAUTHORIZED response
axios.interceptors.response.use(
  (config) => config,
  (error) => {
    const codesException: Array<HttpStatusCode> = [HttpStatusCode.UNAUTHORIZED]

    if (codesException.includes(error?.response?.status)) {
      MessageService.sendMessage({ type: WebviewMessages.LOGOUT })
    }
  }
)

export default class InsuranceService {
  // todo ajuste para variable de entorno en test
  private static baseUrl = 'http://localhost:4200/insurance'
  private static formatEndpoint = (path: string) => `${this.baseUrl}/${path}`

  static async consentLopdp(params: ConsentParams): Promise<ConsentResponse> {
    try {
      const {
        acceptedTermsConditions,
        action,
        hasConsent,
        url,
        identity: { cif, dni, dniType },
      } = params

      const endpoint = this.formatEndpoint('consent')

      const body = encryptBody({
        acceptedTermsConditions,
        action,
        hasConsent,
        url,

        cif,
        dni,
        dniType,
      })

      const result = await axios.post<ConsentResponse>(endpoint, body)

      return validateResult(result)
    } catch (error) {
      return resolveError(error)
    }
  }

  static async findDocuments(
    params: FindDocumentsParams
  ): Promise<DocumentsDownloadResponse> {
    try {
      const {
        key,
        transactionReference,
        documentsReference,
        identity: { cif, dni, dniType },
      } = params

      const endpoint = this.formatEndpoint('documents-download')

      const body = encryptBody({
        transactionReference,
        key,
        documentsReference,

        cif,
        dni,
        dniType,
      })

      const result = await axios.post<DocumentsDownloadResponse>(endpoint, body)

      return validateResult(result)
    } catch (error) {
      return resolveError(error)
    }
  }

  static async processTransaction(
    params: ProcessTransactionParams
  ): Promise<ProcessTransactionResponse> {
    try {
      const {
        key,
        transactionReference,
        acceptanceReference,
        accountType,
        accountValue,
        paymentMethodCode,
        paymentPeriodicityCode,
        planCode,
        productCode,

        identity: { cif, dni, dniType },
      } = params

      const endpoint = this.formatEndpoint('process-transaction')

      const body = encryptBody({
        transactionReference,
        key,
        paymentPeriodicityCode,
        paymentMethodCode,
        acceptanceReference,
        productCode,
        planCode,
        accountType,
        accountValue,

        cif,
        dni,
        dniType,
      })

      const result = await axios.post<ProcessTransactionResponse>(endpoint, body)

      return validateResult(result)
    } catch (error) {
      return resolveError(error)
    }
  }

  static async findContracts(
    params: FindContractsParams
  ): Promise<ContractDocumentsDownloadResponse> {
    try {
      const {
        key,
        transactionReference,
        reference,
        identity: { cif, dni, dniType },
      } = params

      const endpoint = this.formatEndpoint('contract-download')

      const body = encryptBody({
        transactionReference,
        key,
        reference,

        cif,
        dni,
        dniType,
      })

      const result = await axios.post<ContractDocumentsDownloadResponse>(
        endpoint,
        body
      )

      return validateResult(result)
    } catch (error) {
      return resolveError(error)
    }
  }

  // ============== TODO AJUSTE PARA SERVICIO TEMPORAL==========================

  // todo ajustar
  private static tempHeaders = {
    headers: {
      'x-guid': 'f99e3fe2-1ca6-42d5-898b-ffeffebc8b03',
      'x-app': '003',
      'x-channel': 'ddd',
      'x-medium': 'ddd',
      'x-session': 'f99e3fe2-1ca6-42d5-898b-ffeffebc8b03',
      'x-device-ip': '192.168.0.12',
      'x-device': 'macos',
      'Content-Type': 'application/json',
    },
  }

  static async validateOffer(
    params: ValidateOfferParams
  ): Promise<ValidateOfferResponse> {
    const tempBaseUrl =
      'https://desarrollo-segurosembebidos.pichincha.com/sge-msa-hub/domain/seguros-embebidos/v1/hub'

    const tempFormatEndpoint = (path: string) => `${tempBaseUrl}/${path}`

    try {
      const {
        identity: { cif, dni, dniType },
      } = params

      const request = {
        profile: 'A1',
        mode: 'NORMAL',
        dni: dni,
        dniType: dniType,
        cif: cif,
        channelProductCode: 'BP_BM_REQUESTS',
        transactionReference: 'd536b1b6-2057-eb23-a3df-3a1716ec58f6',
        portalCode: 'POR_BP_EMB_PROD',
      }

      const endpoint = tempFormatEndpoint('validate')

      const result = await axios.post<ValidateOfferResponse>(endpoint, request, {
        ...this.tempHeaders,
      })

      return validateResult(result)
    } catch (error) {
      return resolveError(error)
    }
  }

  static async findOffer(params: FindOfferParams): Promise<FindOfferResponse> {
    const tempBaseUrl =
      'https://desarrollo-segurosembebidos.pichincha.com/sge-msa-hub/domain/seguros-embebidos/v1/hub'

    const tempFormatEndpoint = (path: string) => `${tempBaseUrl}/${path}`

    try {
      const request = {
        productCode: 'TU_BAN_PRO',
        portalCode: 'POR_BP_BANCAMOVIL_TU_BAN_PRO',
      }

      const endpoint = tempFormatEndpoint('offer')

      const result = await axios.post<FindOfferResponse>(endpoint, request, {
        ...this.tempHeaders,
      })
      return validateResult(result)
    } catch (error) {
      return resolveError(error)
    }
  }
}
