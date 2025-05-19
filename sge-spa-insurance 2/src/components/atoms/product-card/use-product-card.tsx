import useAppDispatch from '@app/hooks/use-app-dispatch'
import { useNavigate } from 'react-router-dom'
import {
  setProductCodeSelected,
  setPlanSelected,
  setPeriodicitySelected,
} from '@app/store/reducers/flow-slice'
import {
  type PortalType,
  useGenericProductByCodeSelector,
} from '@app/store/hooks/use-generic-portal-selector'
import { sortByOrder } from '@app/utils'

const useProductCard = (urlTarget: string, productCode: string) => {
  const navigate = useNavigate()
  const dispatch = useAppDispatch()
  const [, productData] = useGenericProductByCodeSelector(productCode as PortalType)

  const planData = productData.plans
  const plansCodes = Object.keys(planData)

  const handleClick = () => {
    if (plansCodes.length === 1) {
      const [firstPlan] = plansCodes

      dispatch(setPlanSelected(firstPlan))

      const periodicityOptions = sortByOrder(
        Object.entries(planData[firstPlan].periodicityOptions).map(
          ([code, periodicity]) => ({
            code,
            order: periodicity.order,
          })
        )
      )

      const [firstPeriodicity] = periodicityOptions
      dispatch(setPeriodicitySelected(firstPeriodicity.code))
    }

    dispatch(setProductCodeSelected(productCode))
    navigate(urlTarget)
  }

  return {
    handleClick,
  }
}

export default useProductCard
