import { selectorProductCode } from '@app/store/selectors/selectors'
import useAppSelector from '@app/hooks/use-app-selector'
import useGenericPortalByCodeSelector, {
  type PortalType,
} from '@app/store/hooks/use-generic-portal-selector'

const useCurrentPortal = () => {
  const productCode = useAppSelector(selectorProductCode)

  const [isPending, currentPortal] = useGenericPortalByCodeSelector(
    productCode as PortalType
  )

  return { productCode, isPending, currentPortal }
}

export default useCurrentPortal
