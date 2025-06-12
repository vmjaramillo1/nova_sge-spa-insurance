import React from 'react'
import Typography from '@app/components/atoms/typography/'
import SmartContent from '@app/components/atoms/smart-text'
import Divider from '@app/components/atoms/divider'
import clsx from 'clsx'
import ArrowIcon from '@app/components/icons/ArrowIcon'
import { TextWhitAria } from '@app/store/hooks/use-generic-portal-selector'
import Badge from '@app/components/atoms/badge'

interface RecordItem extends TextWhitAria {
  text: string
}

interface PreviousProductCard {
  title: TextWhitAria
  status?: StatusType
  account: TextWhitAria
  nextPayment: RecordItem
  amount: RecordItem
  action: TextWhitAria
  handleClick: () => void
}

const MAP_STATUS = {
  success: 'Estás al día',
  error: 'Cancelado',
  warning: 'Pendiente',
  info: 'Pendiente',
} as const

export type StatusType = keyof typeof MAP_STATUS

const PreviousProductCard = (props: PreviousProductCard) => {
  const { title, status, account, nextPayment, amount, action, handleClick } = props

  return (
    <div className="previous-product-card ">
      <div className="previous-product-card__record">
        <Typography
          variant="subtitle"
          className="text-dark-gray-500"
          aria-label={title.aria}
        >
          <SmartContent>{title.value}</SmartContent>
        </Typography>
        {status && <Badge type={status}>{MAP_STATUS[status]}</Badge>}
      </div>

      <Typography
        variant="body"
        className="text-dark-gray-500 mt-16 mb-8"
        aria-label={account.aria}
      >
        <SmartContent>{account.value}</SmartContent>
      </Typography>

      <Divider className="px-16 my-8" />

      <div className="previous-product-card__record mt-4">
        <Typography
          variant="caption"
          className="text-dark-gray-400"
          aria-label={nextPayment.aria}
        >
          <SmartContent>{nextPayment.text}</SmartContent>
        </Typography>
        <Typography variant="caption" className="text-dark-gray-400 font-semibold">
          <SmartContent>{nextPayment.value}</SmartContent>
        </Typography>
      </div>

      <div className="previous-product-card__record mt-4">
        <Typography
          variant="caption"
          className="text-dark-gray-400"
          aria-label={amount.aria}
        >
          <SmartContent>{amount.text}</SmartContent>
        </Typography>
        <Typography variant="headline2" className="text-dark-gray-500 font-semibold">
          <SmartContent>{amount.value}</SmartContent>
        </Typography>
      </div>

      <Divider className="px-16 my-8" />
      <button
        onClick={handleClick}
        className={clsx('previous-product-card__action px-0')}
        type="button"
        aria-label={action.aria}
      >
        {action.value}
        <ArrowIcon fill="#2F7ABF" />
      </button>
    </div>
  )
}

export default PreviousProductCard
