import { FC, memo } from 'react'
import Divider from '@app/components/atoms/divider'
import Skeleton from '@app/components/atoms/skeleton'
import clsx from 'clsx'

interface WithClassName {
  className?: string
}

const CoverageItemFallback: FC<WithClassName> = (props) => {
  const { className } = props

  return (
    <div className={clsx('coverage-item-fallback my-24', className)}>
      <Skeleton width="32px" height="32px" borderRadius="100%" animate={false} />
      <div className="coverage-item-fallback__description">
        <Skeleton className="mb-12" width="231px" height="18px" />
        <Skeleton className="mb-12" width="148px" height="12px" />
        <Skeleton className="mb-12" width="262px" height="8px" />
        <Skeleton width="262px" height="8px" />
      </div>
    </div>
  )
}

const AccordionItemFallback: FC<WithClassName> = (props) => {
  const { className } = props
  return (
    <div className={clsx('accordion-item-fallback', className)}>
      <Skeleton width="171px" height="10px" />
      <Skeleton width="16px" height="10px" borderRadius="100%" animate={false} />
    </div>
  )
}

const ProductDetailFallback = ({ className }: { className?: string }) => {
  return (
    <div className={clsx('product-detail-fallback', className)}>
      <Skeleton
        className="-mt-24 -mx-24 mb-24"
        width="auto"
        height="188px"
        animate={false}
      />
      <Skeleton className="mb-16" width="247px" height="20px" />
      <Skeleton className="mb-32" width="230px" height="14px" />
      <Skeleton className="mb-12" height="8px" />
      <Skeleton className="mb-24" width="213px" height="8px" />
      <CoverageItemFallback />
      <CoverageItemFallback />
      <CoverageItemFallback />
      <Skeleton className="mb-24 h-16" height="97px" animate={false} />
      <Divider />
      <Skeleton className="mt-32 mb-12" width="273px" height="8px" />
      <div className="py-16 px-12">
        <AccordionItemFallback className="px-16 my-16" />
        <Divider />
        <AccordionItemFallback className="px-16 my-16" />
        <Divider />
        <AccordionItemFallback className="px-16 my-16" />
        <Divider />
      </div>
      <Skeleton className="mt-32 mb-12" height="8px" />
      <Skeleton className="mb-24" width="205px" height="8px" />
      <Skeleton className="" height="42px" />
    </div>
  )
}

export default memo(ProductDetailFallback)
