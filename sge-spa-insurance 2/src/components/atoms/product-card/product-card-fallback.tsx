import { memo } from 'react'
import Divider from '@app/components/atoms/divider'
import Skeleton from '@app/components/atoms/skeleton'
import './product-card'

const FallbackCoverageItem = () => (
  <div className="flex mt-20 mb-20">
    <Skeleton className="mr-8" width="30px" height="30px" />
    <div className="product-card-fallback__coverage-content">
      <Skeleton className="mb-8" width="100%" height="10px" />
      <Skeleton className="" width="70%" height="10px" />
    </div>
  </div>
)

const InsurancePageFallback = () => {
  return (
    <div className="product-card ">
      <div className="product-card__header">
        <Skeleton className="" width="40px" height="40px" borderRadius="20px" />
        <div>
          <Skeleton className="mb-8" width="200px" height="20px" />
          <Skeleton className="mb-8" width="120px" height="20px" />
        </div>
      </div>
      <Skeleton className="mt-20 mb-8" width="auto" height="10px" />
      <Skeleton className="mb-8" width="auto" height="10px" />
      <Skeleton className="mb-20" width="auto" height="10px" />
      <Divider />

      <Skeleton className="mt-20" width="60%" height="20px" />
      <FallbackCoverageItem />
      <FallbackCoverageItem />
      <FallbackCoverageItem />

      <Divider />
      <div className="product-card-fallback__action mt-20">
        <Skeleton className="mt-2" width="55%" height="20px" />
        <Skeleton className="ml-8" width="24px" height="24px" />
      </div>
    </div>
  )
}

export default memo(InsurancePageFallback)
