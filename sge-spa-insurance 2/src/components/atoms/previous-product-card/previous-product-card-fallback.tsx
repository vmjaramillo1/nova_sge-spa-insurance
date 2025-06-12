import { memo } from 'react'
import Divider from '@app/components/atoms/divider'
import Skeleton from '@app/components/atoms/skeleton'
import './previous-product-card.scss'

const PreviousProductCardFallback = () => {
  return (
    <div className="previous-product-card-fallback ">
      <div className="previous-product-card-fallback__title">
        <Skeleton className="mb-8" width="35%" height="20px" />
        <Skeleton className="mb-8" width="35%" height="20px" borderRadius="20px" />
      </div>
      <Skeleton className="mt-16 mb-12" width="50%" height="10px" />
      <Divider />
      <div className="previous-product-card-fallback__title mt-12">
        <Skeleton className="mb-8" width="35%" height="10px" />
        <Skeleton className="mb-8" width="35%" height="10px" />
      </div>
      <div className="previous-product-card-fallback__title mt-4">
        <Skeleton className="mb-8" width="35%" height="10px" />
        <Skeleton className="mb-8" width="25%" height="24px" />
      </div>
      <Divider />
      <div className="previous-product-card-fallback__action mt-20 mb-8">
        <Skeleton className="mt-2" width="60%" height="20px" />
        <Skeleton className="ml-8" width="24px" height="24px" />
      </div>
    </div>
  )
}

export default memo(PreviousProductCardFallback)
