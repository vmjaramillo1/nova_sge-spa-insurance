import { memo } from 'react'
import Skeleton from '@app/components/atoms/skeleton'
import './terms-and-condition-page.scss'

const TermsAndConditionPageFallback = () => {
  return (
    <div className={'product-detail-fallback'}>
      <Skeleton
        borderRadius="100%"
        width="64px"
        height="64px"
        className="terms-and-condition-fallback__icon"
      />
      <Skeleton
        className="terms-and-condition-fallback__title"
        width="100px"
        height="14px"
      />
      <Skeleton className="mb-12 mt-12" height="80px" />
      <Skeleton className="mb-24" width="100%" height="40px" />
      <Skeleton className="mb-24" width="213px" height="8px" />
    </div>
  )
}

export default memo(TermsAndConditionPageFallback)
