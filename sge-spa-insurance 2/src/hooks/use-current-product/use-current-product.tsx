import { selectorProductCode } from '@app/store/selectors/selectors'
import useAppSelector from '@app/hooks/use-app-selector'
import {
  type PortalType,
  useGenericProductByCodeSelector,
} from '@app/store/hooks/use-generic-portal-selector'

const useCurrentProduct = () => {
  const productCode = useAppSelector(selectorProductCode)

  const [isPending, currentProduct] = useGenericProductByCodeSelector(
    productCode as PortalType
  )

  return { productCode, isPending, currentProduct }
}

export default useCurrentProduct
