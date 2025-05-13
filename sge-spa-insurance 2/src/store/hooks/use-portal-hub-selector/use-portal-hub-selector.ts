import useAppSelector from '@app/hooks/use-app-selector'

import { selectorPortalHub } from '@app/store/selectors/selectors'
import {
  type UsePortalSelectorResult,
  type TypedUsePortalSelectorHook,
  type PortalHubReducedDefault,
  type PortalHubParamsKeys,
} from './use-portal-hub-selector.interface'

function usePortalHubSelectorDefault<TPortal, TResult>(
  selector?: (portal: TPortal) => TResult
): UsePortalSelectorResult<TResult> {
  selector ??= (portal) => portal as unknown as TResult

  const portal = useAppSelector(selectorPortalHub) as TPortal

  try {
    const result = selector(portal)

    if (result === undefined) {
      throw new Error('Selector returned undefined')
    }

    return [false, result]
  } catch (err) {
    return [true, null as unknown as TResult]
  }
}

export const usePortalHubSelector: TypedUsePortalSelectorHook<
  PortalHubReducedDefault,
  PortalHubParamsKeys
> = usePortalHubSelectorDefault
