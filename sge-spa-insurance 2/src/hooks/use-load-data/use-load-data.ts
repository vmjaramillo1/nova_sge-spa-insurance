import { useQuery } from '@tanstack/react-query'
import { useNavigate } from 'react-router-dom'

import { APP_ROUTES } from '@app/routes/config'
import { getAppInfo } from '@app/utils/reduce/get-app-info'

import { TIME, ZERO } from '@app/utils/constants'
import { isSuccessResponse } from '@app/utils/guards'
import { ErrorCode, MergeOfferablePreviousType } from '@app/utils/enums'

import { reducePortal } from '@app/utils/reduce/portal-reduce-utils'

import InsuranceService, { PortalHubOffer } from '@app/services/insurance'
import { InvalidBodyError, ResponseError } from '@app/utils/classes'

import useIdentity from '../use-identity'
import { getFavoriteAccountHash, mergeOfferAndPrevious } from './utils'
import { sortByOrder } from '@app/utils'
import useAppDispatch from '@app/hooks/use-app-dispatch'
import { setError, AppError } from '@app/store/reducers/global-slice'
import { loadValues } from '@app/store/reducers/app-slice'
import {
  setSelectedAccount,
  setContentLoaded,
  setTransaction,
  setPeriodicitySelected,
  setPlanSelected,
} from '@app/store/reducers/flow-slice'
import { hasOfferableProduct } from '@app/hooks/use-load-data/utils'

import { setPortalHub } from '@app/store/reducers/global-slice'

const useLoadData = () => {
  const navigate = useNavigate()
  const dispatch = useAppDispatch()

  const identity = useIdentity()

  const handleSuccess = ({ odds, accounts, lopdp, portalHub }: PortalHubOffer) => {
    const offers = mergeOfferAndPrevious(odds)

    // debugger

    const portalHubInfo = reducePortal(portalHub)
    const appInfo = getAppInfo({ offers, accounts })
    const favoriteAccountHash = getFavoriteAccountHash(accounts)

    dispatch(setPortalHub(portalHubInfo))
    dispatch(loadValues({ ...appInfo, lopdp }))
    dispatch(setSelectedAccount(favoriteAccountHash))
    dispatch(setContentLoaded(true))

    // todo esto es flow
    // const planKeys = Object.keys(appInfo.plans)

    // if (planKeys.length === 1) {
    //   const [firstPlan] = planKeys

    //   dispatch(setPlanSelected(firstPlan))

    //   const periodicityOptions = sortByOrder(
    //     Object.entries(appInfo.plans[firstPlan].periodicityOptions).map(
    //       ([code, periodicity]) => ({
    //         code,
    //         order: periodicity.order,
    //       })
    //     )
    //   )

    //   const [firstPeriodicity] = periodicityOptions
    //   dispatch(setPeriodicitySelected(firstPeriodicity.code))
    // }

    // todo control pagina de aceptacion
    const targetProductRoute = hasOfferableProduct(appInfo.products)
      ? APP_ROUTES.INSURANCE_PORTAL
      : APP_ROUTES.PREVIOUS_PRODUCT

    const targetRoute = lopdp.acceptedTermsConditions
      ? targetProductRoute
      : APP_ROUTES.TERMS_AND_CONDITIONS

    navigate(targetRoute, {
      replace: true,
    })
  }

  const handleError = (error: unknown) => {
    let targetRoute: string = APP_ROUTES.GENERAL_ERROR

    const serverError: AppError = {
      code: '500',
      title: 'Estamos realizando mejoras en nuestro servicio en este momento.',
      message: 'Por favor, vuelve a intentarlo más tarde.',
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
        case ErrorCode.PREVIOUS_FROM_OTHER_CHANNEL: {
          targetRoute = APP_ROUTES.PREVIOUS
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

      const { key, transactionReference } = validateResult.value
      const portalHub = validateResult.odds.value
      const result = await InsuranceService.findOffer({
        key,
        transactionReference,
        identity: {
          cif: identity.cif,
          dni: identity.dni,
          dniType: identity.dniType,
        },
      })

      //todo cambiar mapeo de errores a otro lado
      if (!isSuccessResponse(result)) {
        throw new ResponseError(result)
      }

      if (result.odds.every((odd) => !odd.data)) {
        throw new ResponseError({
          code: ErrorCode.NOT_OFFERABLE_NOT_PREVIOUS,
          message: 'No hay productos ofertables ni productos anteriores',
        })
      }

      if (result.code === ErrorCode.TRANSACTION_IN_PROGRESS) {
        throw new ResponseError({
          code: ErrorCode.TRANSACTION_IN_PROGRESS,
          message: 'Transaction in progress',
        })
      }

      const previousResult = result.odds.find(
        (odd) => odd.type === MergeOfferablePreviousType.PREVIOUS
      )

      if (previousResult?.data?.length === ZERO) {
        throw new ResponseError({
          code: ErrorCode.PREVIOUS_FROM_OTHER_CHANNEL,
          message: 'Producto previo por otro canal',
        })
      }

      // ===================================================
      dispatch(setTransaction({ key, transactionReference }))
      return {
        ...result,
        portalHub,
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
