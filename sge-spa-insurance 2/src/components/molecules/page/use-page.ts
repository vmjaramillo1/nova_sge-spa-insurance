import { useEffect } from 'react'
import { useOutletContext } from 'react-router-dom'

import useRouterEvent from '@app/hooks/use-router-event'
import { FlowStatus } from '@app/utils/enums'

import { OutletContextValue } from '../layout'
import useAppSelector from '@app/hooks/use-app-selector'
import { selectorStatus, selectorStep } from '@app/store/selectors/selectors'
const usePage = (title: string) => {
  const { isLoading, changeTitle } = useOutletContext<OutletContextValue>()
  const status = useAppSelector(selectorStatus)
  const step = useAppSelector(selectorStep)

  useRouterEvent()

  useEffect(() => {
    changeTitle(title)
  }, [changeTitle, title])

  return {
    isLoading,
    isEndSuccess: status === FlowStatus.END_SUCCESS,
    isEndRetryError: status === FlowStatus.RETRY_ACCEPTANCE_ERROR,
    isEndError: status === FlowStatus.END_ERROR,
    step,
  }
}

export default usePage
