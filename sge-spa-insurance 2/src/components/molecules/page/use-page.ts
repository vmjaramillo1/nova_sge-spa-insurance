import { useEffect } from 'react'
import { useOutletContext } from 'react-router-dom'

import useRouterEvent from '@app/hooks/use-router-event'
import { FlowStatus } from '@app/utils/enums'
import { useSmartText } from '@app/components/atoms/smart-text'
import { selectorProductCode } from '@app/store/selectors/selectors'
import {
  useGenericProductByCodeSelector,
  type PortalType,
} from '@app/store/hooks/use-generic-portal-selector'
import { OutletContextValue } from '../layout'
import useAppSelector from '@app/hooks/use-app-selector'
import { selectorStatus, selectorStep } from '@app/store/selectors/selectors'

const usePage = (title: string) => {
  const { isLoading, changeTitle } = useOutletContext<OutletContextValue>()
  const status = useAppSelector(selectorStatus)
  const step = useAppSelector(selectorStep)

  const productCode = useAppSelector(selectorProductCode)
  const [, productData] = useGenericProductByCodeSelector(productCode as PortalType)
  const flowConfigStep = productData?.portal?.content?.flow?.steps

  const stepTitle =
    flowConfigStep?.find((s) => s.route === step)?.title.value ?? title
  const formatTitle = useSmartText(stepTitle)
  useRouterEvent()

  useEffect(() => {
    changeTitle(formatTitle)
  }, [changeTitle, title, formatTitle])

  return {
    isLoading,
    isEndSuccess: status === FlowStatus.END_SUCCESS,
    isEndRetryError: status === FlowStatus.RETRY_ACCEPTANCE_ERROR,
    isEndError: status === FlowStatus.END_ERROR,
    step,
  }
}

export default usePage
