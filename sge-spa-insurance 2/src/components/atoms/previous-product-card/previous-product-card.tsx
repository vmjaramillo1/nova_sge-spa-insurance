import React from 'react'
import Typography from '@app/components/atoms/typography/'
import SmartContent from '@app/components/atoms/smart-text'
import Divider from '@app/components/atoms/divider'
import clsx from 'clsx'
import ArrowIcon from '@app/components/icons/ArrowIcon'
import { TextWhitAria } from '@app/store/hooks/use-generic-portal-selector'
import Badge from '@app/components/atoms/badge'
import CoverageRow from '@app/components/atoms/coverage-row'
import { MAP_INSURANCE_STATUS } from '@app/utils/constants'

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

export type StatusType = keyof typeof MAP_INSURANCE_STATUS

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
        {status && <Badge type={status}>{MAP_INSURANCE_STATUS[status]}</Badge>}
      </div>

      <Typography
        variant="body"
        className="text-dark-gray-500 mt-16 mb-8"
        aria-label={account.aria}
      >
        <SmartContent>{account.value}</SmartContent>
      </Typography>

      <Divider className="px-16 my-8" />

      <CoverageRow
        label={<SmartContent>{nextPayment.text}</SmartContent>}
        value={<SmartContent>{nextPayment.value}</SmartContent>}
        aria={nextPayment.aria}
        classes={{
          root: 'mt-4',
          shared: 'text-dark-gray-400 text-caption',
          value: 'font-semibold',
        }}
      />
      <CoverageRow
        label={<SmartContent>{amount.text}</SmartContent>}
        value={<SmartContent>{amount.value}</SmartContent>}
        aria={amount.aria}
        classes={{
          root: 'mt-4',
          label: 'text-dark-gray-400 text-caption middle-content',
          value: 'text-dark-gray-500 font-semibold text-headline2',
        }}
      />

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
