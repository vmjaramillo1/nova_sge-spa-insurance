import React, { FC, ReactNode, memo } from 'react'
import clsx from 'clsx'

import './account-row.scss'
import Typography from '@app/components/atoms/typography'

type ButtonMouseEvent = React.MouseEvent<HTMLButtonElement, MouseEvent>

export interface AccountRowProps {
  label: string
  description: ReactNode
  amount: string
  value: string
  disabled?: boolean
  onClick?: (event: ButtonMouseEvent, value: string) => void
  selected?: boolean
  ariaLabel?: string
  groupSelected?: boolean
  icon?: ReactNode
}

export type AccountRowContentProps = Pick<
  AccountRowProps,
  'label' | 'description' | 'amount'
>

const AccountRow: FC<AccountRowProps> = (props) => {
  const {
    label,
    description,
    amount,
    value,
    disabled = false,
    groupSelected = false,
    selected,
    onClick,
    ariaLabel,
    icon,
  } = props

  const handleClick = (event: ButtonMouseEvent) => {
    if (!onClick) return

    onClick?.(event, value)
  }

  return (
    <button
      data-testid={`btn-account-row-${value}`}
      className={clsx(
        'account-row p-16',
        selected && !disabled && 'account-row--selected',
        disabled && 'account-row--disabled'
      )}
      onClick={handleClick}
      aria-label={ariaLabel}
      disabled={disabled}
    >
      {icon && (
        <div className="account-row__brand" aria-hidden="true">
          {icon}
        </div>
      )}

      <div className="account-row__content--selected" aria-hidden="true">
        <div className="account-row__details account-row__details--left">
          <Typography
            variant="caption"
            className={clsx('font-semibold', disabled && 'text-dark-gray-300')}
          >
            {label}
          </Typography>
          <Typography
            variant="caption"
            className={clsx(
              'font-medium',
              disabled ? 'text-dark-gray-300' : 'text-dark-gray-400'
            )}
          >
            {description}
          </Typography>
        </div>
        <div className="account-row__details account-row__details--right">
          <Typography
            variant="caption"
            className={clsx('font-semibold', disabled && 'text-dark-gray-300')}
          >
            {amount}
          </Typography>
          <Typography
            variant="caption"
            className={clsx(
              'font-medium',
              disabled ? 'text-dark-gray-300' : 'text-dark-gray-400'
            )}
          >
            Saldo disponible
          </Typography>
        </div>
      </div>
      {groupSelected && (
        <div
          className="account-row__actionable"
          data-testid="checked-icon"
          aria-hidden="true"
        >
          {selected && (
            <pichincha-icon size="24px" type="--outlined" color="success">
              check
            </pichincha-icon>
          )}
        </div>
      )}
    </button>
  )
}

export default memo(AccountRow)
