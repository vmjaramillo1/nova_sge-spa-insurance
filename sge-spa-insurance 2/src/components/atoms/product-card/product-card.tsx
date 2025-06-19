import React from 'react'
import SmartContent from '@app/components/atoms/smart-text'
import Typography from '@app/components/atoms/typography'
import clsx from 'clsx'
import './product-card.scss'
import ArrowIcon from '@app/components/icons/ArrowIcon'
import CheckIcon from '@app/components/icons/CheckIcon'
import { ProductCardProps } from './product-card.interface'
import useProductCard, { ProductCode } from './use-product-card'

const ProductCard = (props: ProductCardProps) => {
  const { title, description, paymentType, price, coverages, action, code } = props

  const { handleClick, MAPPER_ICONS } = useProductCard(action.urlTarget, code)

  return (
    <div className="product-card" onClick={handleClick}>
      {/* Header */}
      <div className="product-card__header">
        {MAPPER_ICONS[code as ProductCode]}
        <Typography
          variant="body"
          className="product-card__title"
          aria-label={title.aria}
        >
          <SmartContent>{title.value}</SmartContent>
        </Typography>
      </div>

      <Typography variant="caption" className="my-16" aria-label={description.aria}>
        <SmartContent>{description.value}</SmartContent>
      </Typography>

      <div className="product-card__header">
        <Typography
          variant="body"
          className="product-card__price"
          aria-label={paymentType.aria}
        >
          <SmartContent>{paymentType.value}</SmartContent>
        </Typography>
        <Typography
          variant="headline2"
          className="product-card__price"
          aria-label={price.aria}
        >
          <SmartContent>{price.value}</SmartContent>
        </Typography>
      </div>

      <div className="product-card__divider"></div>

      {/* Body */}
      <div>
        <SmartContent>{coverages.title.value}</SmartContent>

        <ul className="product-card__coverage-list">
          {coverages.items.map((item) => (
            <li
              data-testid={`${code}-${item.coverageCode}`}
              key={item.coverageCode}
              className={clsx('product-card__header my-16')}
            >
              <div className="product-card__coverage-icon">
                <CheckIcon />
              </div>
              <div>
                <Typography variant="caption" aria-label={item.description.aria}>
                  <SmartContent>{item.description.value}</SmartContent>
                </Typography>
              </div>
            </li>
          ))}
        </ul>
      </div>
      <div className="product-card__divider"></div>
      {/* footer */}
      <div>
        <button
          className={clsx('product-card__action')}
          type="button"
          aria-label={action.aria}
        >
          {action.value}
          <ArrowIcon fill="#2F7ABF" />
        </button>
      </div>
    </div>
  )
}

export default ProductCard
