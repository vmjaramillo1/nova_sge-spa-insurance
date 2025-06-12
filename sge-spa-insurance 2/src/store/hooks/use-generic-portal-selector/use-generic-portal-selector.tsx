import useAppSelector from '@app/hooks/use-app-selector'
import {
  type PortalFraudReducedDefault,
  type PortalFraudParamsKeys,
} from './use-portal-fraud-selector.interface'

import {
  type PortalLifeReducedDefault,
  type PortalLifeParamsKeys,
} from './use-portal-life-selector.interface'

import {
  type PortalDetails,
  type UsePortalSelectorResult,
} from '@app/store/hooks/use-generic-portal-selector'
import { type AppProducts, type Products } from '@app/store/reducers/app-slice'
import { selectorProducts } from '@app/store/selectors/selectors'

export type PortalType = 'TU_BAN_PRO' | 'LIFE_HEALTH'

export type PortalTypeMap = {
  TU_BAN_PRO: { content: PortalFraudReducedDefault; params: PortalFraudParamsKeys }
  LIFE_HEALTH: { content: PortalLifeReducedDefault; params: PortalLifeParamsKeys }
}

export const portalProductCodes: Record<PortalType, string> = {
  TU_BAN_PRO: 'TU_BAN_PRO',
  LIFE_HEALTH: 'LIFE_HEALTH',
}

export function useGenericPortalByCodeSelector<
  P extends PortalType,
  TResult = PortalDetails<PortalTypeMap[P]['content'], PortalTypeMap[P]['params']>
>(
  portalType: P,
  selector?: (
    portal: PortalDetails<PortalTypeMap[P]['content'], PortalTypeMap[P]['params']>
  ) => TResult
): UsePortalSelectorResult<TResult> {
  const safeSelector = selector ?? ((portal) => portal as unknown as TResult)

  const products = useAppSelector(selectorProducts)

  const typedProducts = products as unknown as AppProducts<
    PortalDetails<PortalTypeMap[P]['content'], PortalTypeMap[P]['params']>
  >
  const productCode = portalProductCodes[portalType]
  const product = typedProducts[productCode]

  try {
    if (!product) {
      throw new Error(`Producto con código "${productCode}" no encontrado`)
    }

    const portal = product.portal
    const result = safeSelector(portal)

    if (result === undefined) {
      throw new Error('Selector devolvió undefined')
    }

    return [false, result]
  } catch {
    return [true, null as unknown as TResult]
  }
}

export function useGenericProductByCodeSelector<P extends PortalType>(
  portalType: P
): UsePortalSelectorResult<
  Products<PortalDetails<PortalTypeMap[P]['content'], PortalTypeMap[P]['params']>>
> {
  const products = useAppSelector(selectorProducts)

  const typedProducts = products as unknown as AppProducts<
    PortalDetails<PortalTypeMap[P]['content'], PortalTypeMap[P]['params']>
  >
  const productCode = portalProductCodes[portalType]
  const product = typedProducts[productCode]

  try {
    if (!product) {
      throw new Error(`Producto con código "${productCode}" no encontrado`)
    }

    return [false, product]
  } catch {
    return [
      true,
      null as unknown as Products<
        PortalDetails<PortalTypeMap[P]['content'], PortalTypeMap[P]['params']>
      >,
    ]
  }
}
