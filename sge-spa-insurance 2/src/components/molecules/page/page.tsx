import { FC, memo, PropsWithChildren, ReactNode } from 'react'
import { Navigate } from 'react-router-dom'

import { APP_ROUTES } from '@app/routes/config'
import { RoutesAlias } from '@app/utils/enums'

import usePage from './use-page'

interface PageProps {
  title: string
  fallback?: ReactNode
}

const Page: FC<PropsWithChildren<PageProps>> = (props) => {
  const { title, children, fallback } = props

  const { isEndSuccess, isEndRetryError, isLoading, step } = usePage(title)

  if (isLoading) {
    return <>{fallback}</>
  }

  if (isEndRetryError && step !== RoutesAlias.RETRY_ACCEPTANCE) {
    return <Navigate to={APP_ROUTES.RETRY_ACCEPTANCE} replace />
  }

  // Prevent user to go back to previous step
  if (isEndSuccess && step !== RoutesAlias.SUCCESS) {
    return <Navigate to={APP_ROUTES.SUCCESS} replace />
  }

  return <>{children}</>
}

export default memo(Page)
