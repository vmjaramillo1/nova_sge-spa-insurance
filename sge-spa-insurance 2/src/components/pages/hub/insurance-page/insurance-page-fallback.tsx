import { memo } from 'react'
import Skeleton from '@app/components/atoms/skeleton'
import clsx from 'clsx'
import './insurance-page.scss'
import ProductCardFallback from '@app/components/atoms/product-card/product-card-fallback'

const InsurancePageFallback = ({ className }: { className?: string }) => {
  return (
    <div className={clsx('insurance-page-fallback', className)}>
      <div className="-mt-24 -mx-24 -mb-24 insurance-page-fallback__hero">
        <div>
          <Skeleton className="mb-8" width="130px" height="8px" />
          <Skeleton className="mb-8" width="130px" height="8px" />
          <Skeleton className="mb-8" width="130px" height="8px" />
          <Skeleton className="mb-8" width="75px" height="8px" />
        </div>
        <Skeleton className="mb-32" width="120px" height="120px" />
      </div>
      <ProductCardFallback />
    </div>
  )
}

export default memo(InsurancePageFallback)
