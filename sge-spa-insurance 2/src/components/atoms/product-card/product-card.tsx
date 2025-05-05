import React from 'react'

import Typography from '@app/components/atoms/typography'
import clsx from 'clsx'
import './product-card.scss'
import { useNavigate } from 'react-router-dom'
import ArrowIcon from '@app/components/icons/ArrowIcon'
import InsuranceIcon from '@app/components/icons/InsuranceIcon'
import CheckIcon from '@app/components/icons/CheckIcon'

interface AccessibleText {
  value: string | React.ReactNode
  aria: string
}

interface CoverageItem {
  key: string
  title: AccessibleText
  description: AccessibleText
}

interface ProductCardProps {
  title: AccessibleText
  description: AccessibleText
  paymentType: AccessibleText
  price: AccessibleText
  coverages: {
    title: string | React.ReactNode
    items: CoverageItem[]
  }
  action: {
    urlTarget: string
    value: string | React.ReactNode
    aria: string
  }
}

const ProductCard = (props: ProductCardProps) => {
  const { title, description, paymentType, price, coverages, action } = props
  const navigate = useNavigate()

  const handleClick = () => {
    navigate(action.urlTarget)
  }

  return (
    <div className="product-card">
      {/* Header */}
      <div className="product-card__header">
        <InsuranceIcon width={40} height={40} />
        <Typography
          variant="body"
          className="product-card__title"
          aria-label={title.aria}
        >
          {title.value}
        </Typography>
      </div>

      <Typography variant="caption" className="my-16" aria-label={description.aria}>
        {description.value}
        {/* Suma una <span className="font-semibold">capa extra</span> de protección para
        tus cuentas y tarjetas. */}
      </Typography>

      <div className="product-card__header">
        <Typography
          variant="body"
          className="product-card__price"
          aria-label={paymentType.aria}
        >
          {paymentType.value}
        </Typography>
        <Typography
          variant="headline2"
          className="product-card__price"
          aria-label={price.aria}
        >
          {price.value}
        </Typography>
      </div>

      <div className="product-card__divider"></div>

      {/* Body */}
      <div>
        {coverages.title}
        {/* <strong>Este seguro cubre:</strong> */}
        <ul className="product-card__coverage-list">
          {coverages.items.map((item) => (
            <li
              data-testid={item.key}
              key={item.key}
              className={clsx('product-card__header my-16')}
            >
              <div className="product-card__coverage-icon">
                <CheckIcon />
              </div>
              <div>
                <Typography
                  variant="body"
                  className="font-semibold"
                  aria-label={item.title.aria}
                >
                  {item.title.value}
                </Typography>
                <Typography variant="caption" aria-label={item.description.aria}>
                  {item.description.value}
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
          onClick={handleClick}
          className={clsx('product-card__action')}
          type="button"
          aria-label={action.aria}
        >
          {action.value}
          {/* {Descubre qué incluye tu seguro} */}
          <ArrowIcon fill="#2F7ABF" />
        </button>
      </div>
    </div>
  )
}

export default ProductCard
