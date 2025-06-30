import clsx from 'clsx'
import { FC, memo } from 'react'

import './button.scss'
import ButtonIconLoading from './button-icon-loading'

export type ButtonColor =
  | 'complementary'
  | 'destructive'
  | 'primary'
  | 'secondary'
  | 'tertiary'

export type ButtonSize = 'extra-large' | 'large' | 'medium' | 'small'

export interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  color?: ButtonColor
  loading?: boolean
  onClick?: () => void
  icon?: React.ReactNode
}

const Button: FC<ButtonProps> = ({
  onClick,
  className,
  color = 'primary',
  loading,
  icon,
  disabled,
  children,
  type = 'button',
  ...restProps
}: ButtonProps) => {
  return (
    <button
        onClick={!disabled && !loading ? onClick : undefined}
      className={clsx('button', `button--${color}`, 
          (disabled || loading) && 'button--is-disabled',
        className,


      )}
        aria-disabled={Boolean(disabled) || loading}
      // disabled={Boolean(disabled) || loading}
      type={type}
      {...restProps}
    >
      {loading ? (
        <ButtonIconLoading color={color} />
      ) : (
        <>
          {icon}
          {children}
        </>
      )}
    </button>
  )
}

export default memo(Button)
