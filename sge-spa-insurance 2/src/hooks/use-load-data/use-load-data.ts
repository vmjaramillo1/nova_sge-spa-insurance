import { useQuery } from '@tanstack/react-query'
import { useNavigate } from 'react-router-dom'

import { APP_ROUTES } from '@app/routes/config'
import { getAppInfo } from '@app/utils/reduce/get-app-info'

import { TIME } from '@app/utils/constants'
import { isSuccessResponse } from '@app/utils/guards'
import { ErrorCode } from '@app/utils/enums'

import { reducePortal } from '@app/utils/reduce/portal-reduce-utils'

import InsuranceService, { PortalHubOffer } from '@app/services/insurance'
import { InvalidBodyError, ResponseError } from '@app/utils/classes'

import useIdentity from '../use-identity'
import { getFavoriteAccountHash } from './utils'
import useAppDispatch from '@app/hooks/use-app-dispatch'
import { setError, AppError } from '@app/store/reducers/global-slice'
import {
  loadValues,
  setLopdp,
  setAccounts,
  setOffer,
} from '@app/store/reducers/app-slice'
import {
  setSelectedAccount,
  setContentLoaded,
  setTransaction,
  setClientData,
} from '@app/store/reducers/flow-slice'
import { useLocation } from 'react-router-dom'

import { setPortalHub } from '@app/store/reducers/global-slice'
import useVerifyData from '@app/hooks/use-load-data/use-verify-data'
import { APP_ROUTES_CONFIG } from '@app/routes/hub/config'

const useLoadData = () => {
  const navigate = useNavigate()
  const dispatch = useAppDispatch()
  const { verifyValidateOffer, verifyFindOffer } = useVerifyData()

  const identity = useIdentity()
  const location = useLocation()

  const handleSuccess = ({ offerResult, validateResult }: PortalHubOffer) => {
    const {
      lopdpAcceptation,
      offerableProducts,
      previousProducts,
      availablePaymentOptions,
      portal,
      client,
    } = validateResult

    const tempLopdp = {
      acceptedTermsConditions: lopdpAcceptation,
      url: '', // todo poner el url
    }

    const { products, paymentOptions } = getAppInfo({
      offers: offerResult,
      paymentOptions: availablePaymentOptions,
    })

    const portalHubInfo = reducePortal(portal)
    const favoriteAccountHash = getFavoriteAccountHash(paymentOptions)

    dispatch(setPortalHub(portalHubInfo))
    dispatch(setClientData(client))

    dispatch(setLopdp(tempLopdp))
    dispatch(setAccounts(paymentOptions))
    dispatch(
      setOffer({
        offerableProducts: offerableProducts,
        previousProducts: previousProducts,
      })
    )
    dispatch(setSelectedAccount(favoriteAccountHash))
    dispatch(loadValues({ products }))
    dispatch(setContentLoaded(true))

    const targetRoute = handleUrlTarget(validateResult, lopdpAcceptation)

    navigate(targetRoute, {
      replace: true,
    })
  }

  const handleUrlTarget = (
    validateResult: PortalHubOffer['validateResult'],
    lopdpAcceptation: boolean
  ): string => {
    if (!lopdpAcceptation) {
      return APP_ROUTES.TERMS_AND_CONDITIONS
    }

    const isPreviousProduct =
      location.pathname === APP_ROUTES_CONFIG.PREVIOUS_PRODUCT.path
    const hasOfferableProducts = validateResult.offerableProducts.length > 0

    if (isPreviousProduct) {
      return APP_ROUTES.PREVIOUS_PRODUCT
    }

    return hasOfferableProducts
      ? APP_ROUTES.INSURANCE_PORTAL
      : APP_ROUTES.PREVIOUS_PRODUCT
  }

  const handleError = (error: unknown) => {
    let targetRoute: string = APP_ROUTES.GENERAL_ERROR

    const serverError: AppError = {
      code: '500',
      title: 'Ocurrió un error',
      message:
        'Este servicio no está disponible por el momento. Por favor, intenta más tarde.',
      details: {},
    }
    if (error instanceof ResponseError) {
      switch (error._code) {
        case ErrorCode.NOT_ACCOUNTS:
        case ErrorCode.NOT_TRANSACTIONAL_ACCOUNTS: {
          targetRoute = APP_ROUTES.NOT_ACCOUNT
          break
        }
        case ErrorCode.NOT_OFFERABLE_NOT_PREVIOUS: {
          targetRoute = APP_ROUTES.ALREADY_PRODUCT
          break
        }
        case ErrorCode.NOT_CLIENT_INFORMATION: {
          targetRoute = APP_ROUTES.NOT_CLIENT_INFORMATION
          break
        }
        case ErrorCode.FAILED_OFFERABLE_DATA: {
          targetRoute = APP_ROUTES.FAILED_OFFERABLE_DATA
          break
        }
        case ErrorCode.TRANSACTION_IN_PROGRESS: {
          targetRoute = APP_ROUTES.IN_PROGRESS
          break
        }
        default: {
          dispatch(setError(serverError))
          targetRoute = APP_ROUTES.GENERAL_ERROR
        }
      }
    } else {
      dispatch(setError(serverError))
    }
    dispatch(setContentLoaded(true))

    navigate(targetRoute, {
      replace: true,
    })
  }

  useQuery(
    ['GET_OFFER'],
    async () => {
      if (!identity) throw new InvalidBodyError('Missing identity')

      const validateResult = await InsuranceService.validateOffer({
        identity: {
          cif: identity.cif,
          dni: identity.dni,
          dniType: identity.dniType,
        },
      })

      if (!isSuccessResponse(validateResult)) {
        throw new ResponseError(validateResult)
      }

      verifyValidateOffer(validateResult)

      const { transactionReference, offerableProducts } = validateResult.value

      const result = await InsuranceService.findOffer({
        offerableProducts,
        transactionReference,
        identity: {
          cif: identity.cif,
          dni: identity.dni,
          dniType: identity.dniType,
        },
      })

      if (!isSuccessResponse(result)) {
        throw new ResponseError(result)
      }

      verifyFindOffer(result)

      dispatch(setTransaction({ transactionReference }))
      return {
        offerResult: [result.value], // todo ajustar en caso de pruebas con []
        validateResult: validateResult.value,
      }
    },
    {
      onSuccess: handleSuccess,
      onError: handleError,
      enabled: !!identity,
      refetchOnWindowFocus: false,
      retry: false,
      cacheTime: TIME.MINUTE * 10,
      networkMode: 'always',
    }
  )
}

export default useLoadData
