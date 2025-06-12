import { useState, useEffect, useMemo, Dispatch, SetStateAction } from 'react'

import useSetData from '@app/hooks/use-set-data'
import useLoadData from '@app/hooks/use-load-data'
import { APP_ROUTES, getRoutKeyByPath } from '@app/routes/config'
import { useLocation } from 'react-router-dom'
import { DELAY_SMOOTH_SCROLL, INSURANCE_PORTAL_NAME } from '@app/utils/constants'
import { FlowStatus } from '@app/utils/enums'
import useModal from '@app/hooks/use-modal/use-modal'
import useAppSelector from '@app/hooks/use-app-selector'

import { selectorError } from '@app/store/selectors/selectors'

import {
  selectorStatus,
  selectorContentLoaded,
} from '@app/store/selectors/selectors'
import { setStep } from '@app/store/reducers/flow-slice/index'
import useAppDispatch from '@app/hooks/use-app-dispatch'

import { APP_ROUTES_CONFIG } from '@app/routes/hub/config'

import InsurancePageFallback from '@app/components/pages/hub/insurance-page/insurance-page-fallback'

import { PreviousProductPageFallback } from '@app/components/pages/previous-product-page'

type DispatchState<T> = Dispatch<SetStateAction<T>>

export type OutletContextValue = {
  isLoading: boolean
  changeTitle: DispatchState<string>
  changeLoading: DispatchState<boolean>
}

const useLayout = () => {
  useSetData()
  useLoadData()
  const dispatch = useAppDispatch()
  const { isOpen: showModal } = useModal()

  const location = useLocation()

  const fallBackElement: JSX.Element =
    location.pathname === APP_ROUTES_CONFIG.PREVIOUS_PRODUCT.path ? (
      <PreviousProductPageFallback />
    ) : (
      <InsurancePageFallback className="mt-64" />
    )

  const status = useAppSelector(selectorStatus)
  const contentLoaded = useAppSelector(selectorContentLoaded)

  const error = useAppSelector(selectorError)

  const [isLoading, setIsLoading] = useState<boolean>(false)
  const [title, setTitle] = useState<string>(INSURANCE_PORTAL_NAME)

  const contextValue = useMemo<OutletContextValue>(
    () => ({
      isLoading: isLoading || !contentLoaded,
      changeTitle: setTitle,
      changeLoading: setIsLoading,
    }),
    [contentLoaded, isLoading]
  )

  const showHeader = useMemo(() => {
    const excludedRoutes: Array<string> = [APP_ROUTES.RETRY_ACCEPTANCE]

    return !excludedRoutes.includes(location.pathname)
  }, [location])

  useEffect(() => {
    setTimeout(() => {
      window.scrollTo({
        top: 0,
        behavior: 'smooth',
      })
    }, DELAY_SMOOTH_SCROLL)
  }, [location.pathname])

  useEffect(() => {
    dispatch(setStep(getRoutKeyByPath(location.pathname)!))
  }, [dispatch, location])

  return {
    isLoading: !contentLoaded,
    fallBackElement,
    showHeader,
    showModal,
    title,
    error,
    contentLoaded,
    isFlowEndSuccess: status === FlowStatus.END_SUCCESS,
    contextValue,
  }
}

export default useLayout
