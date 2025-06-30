import { memo } from 'react'
import clsx from 'clsx'
import { PreviousProductCardFallback } from '@app/components/atoms/previous-product-card'

const PreviousProductDetailPageFallback = ({
  className,
}: {
  className?: string
}) => {
  return (
    <div className={clsx('previous-product-fallback -mx-24', className)}>
      <div className="mx-24 mt-64">
        <PreviousProductCardFallback />
        <PreviousProductCardFallback />
        <PreviousProductCardFallback />
      </div>
    </div>
  )
}

export default memo(PreviousProductDetailPageFallback)
