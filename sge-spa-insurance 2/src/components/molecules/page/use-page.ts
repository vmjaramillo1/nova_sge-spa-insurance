import { useEffect } from 'react'
import { useOutletContext } from 'react-router-dom'

import useRouterEvent from '@app/hooks/use-router-event'
import { FlowStatus } from '@app/utils/enums'
import { useSmartText } from '@app/components/atoms/smart-text'

import { OutletContextValue } from '../layout'
import useAppSelector from '@app/hooks/use-app-selector'
import { selectorStatus, selectorStep } from '@app/store/selectors/selectors'
import useCurrentPortal from '@app/hooks/use-current-portal/use-current-portal'

const usePage = (title: string) => {
  const { isLoading, changeTitle } = useOutletContext<OutletContextValue>()
  console.log("titulo", title)

  const status = useAppSelector(selectorStatus)


  const step = useAppSelector(selectorStep)

  const { currentPortal: productData } = useCurrentPortal()

  const flowConfigStep = productData?.content?.flow?.steps

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
