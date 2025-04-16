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

const Button: FC<ButtonProps> = (props: ButtonProps) => {
  const {
    onClick,
    className,
    color,
    loading,
    icon,
    disabled,
    children,
    ...restProps
  } = props

  return (
    <button
      onClick={onClick}
      className={clsx('button', `button--${color}`, className)}
      disabled={Boolean(disabled) || loading}
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

Button.defaultProps = {
  color: 'primary',
  type: 'button',
}

export default memo(Button)
