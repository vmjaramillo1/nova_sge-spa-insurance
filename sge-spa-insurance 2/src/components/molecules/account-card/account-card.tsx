import React, { FC, ReactNode, memo } from 'react'
import ArrowIcon from '@app/components/icons/ArrowIcon'
import clsx from 'clsx'

import './account-card.scss'
import Typography from '@app/components/atoms/typography'

type ButtonMouseEvent = React.MouseEvent<HTMLButtonElement, MouseEvent>

interface AccountCardProps {
  label: string
  description: ReactNode
  amount: string

  value: string
  actionable?: boolean
  onClick?: (event: ButtonMouseEvent, value: string) => void
  selected?: boolean
  ariaLabel?: string
}

export type AccountCardContentProps = Pick<
  AccountCardProps,
  'label' | 'description' | 'amount'
>

const AccountCard: FC<AccountCardProps> = (props) => {
  const {
    label,
    description,
    amount,
    value,
    actionable,
    selected,
    onClick,
    ariaLabel,
  } = props

  const handleClick = (event: ButtonMouseEvent) => {
    if (!onClick) return

    onClick?.(event, value)
  }

  return (
    <button
      className={clsx('account-card p-16', selected && 'account-card--selected')}
      onClick={handleClick}
      aria-label={ariaLabel}
    >
      <div className="account-card__content--selected" aria-hidden="true">
        <div className="account-card__details account-card__details--left">
          <Typography variant="caption" className="font-semibold">
            {label}
          </Typography>
          <Typography variant="legal" className="text-dark-gray-400">
            {description}
          </Typography>
        </div>
        <div className="account-card__details account-card__details--right">
          <Typography variant="caption" className="font-semibold">
            {amount}
          </Typography>
          <Typography variant="legal" className="font-medium">
            Saldo disponible
          </Typography>
        </div>
      </div>
      {actionable && (
        <div className="account-card__actionable" aria-hidden="true">
          <ArrowIcon dataTestId="account-arrow" />
        </div>
      )}
    </button>
  )
}

AccountCard.defaultProps = {
  actionable: false,
}

export default memo(AccountCard)
