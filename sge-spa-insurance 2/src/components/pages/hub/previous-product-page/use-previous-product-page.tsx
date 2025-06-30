import usePortalHubSelector from '@app/store/hooks/use-portal-hub-selector'
import useProducts from '@app/store/hooks/use-products'

import useBackButton from '@app/hooks/use-back-button/use-back-button'
import { TrackingEvents, backHomeWithTracking } from '@app/utils/messages'
import { useNavigate } from 'react-router-dom'
import useAppDispatch from '@app/hooks/use-app-dispatch'
import usePageTrackingEvent from '@app/hooks/use-page-tracking-event'
import {
  setProductCodeSelected,
  setContract,
  setPlanSelected,
} from '@app/store/reducers/flow-slice'
import { APP_ROUTES } from '@app/routes/config'

function usePreviousProductPage() {
  const navigate = useNavigate()
  const dispatch = useAppDispatch()

  const [, content] = usePortalHubSelector((portal) => portal.content.sale)
  const { previousProductCodes, previousProduct } = useProducts()

  //  todo validar traking
  useBackButton(backHomeWithTracking(TrackingEvents.PREVIOUS_CLICK_BUTTON_BACK))
  usePageTrackingEvent(TrackingEvents.PREVIOUS_VIEW_PAGE)

  const handleNavigateProduct = (productCode: string, contract: string) => {
    dispatch(setProductCodeSelected(productCode))
    dispatch(setContract(contract))
    dispatch(setPlanSelected('LIFE_HEALTH_1'))
    navigate(APP_ROUTES.PREVIOUS_PRODUCT_DETAIL)
  }

  const productSaleCards = previousProductCodes.reduce<Array<any>>((acc, code) => {
    const item = content.products[code]
    const previousProductItem = previousProduct[code]
    if (item) {
      acc.push({ ...item, ...previousProductItem, code })
    }
    return acc
  }, [])

  return {
    content,
    productSaleCards,
    handleNavigateProduct,
  }
}

export default usePreviousProductPage
