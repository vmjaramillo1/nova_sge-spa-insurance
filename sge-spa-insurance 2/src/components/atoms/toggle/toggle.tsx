import clsx from 'clsx'
import { ComponentProps, PropsWithChildren } from 'react'
import './toggle.scss'

type ButtonOnCLick = ComponentProps<'button'>['onClick']

interface ToggleProps {
  selected?: boolean
  value: string
  onClick?: (
    event: React.MouseEvent<HTMLButtonElement, MouseEvent>,
    value: string
  ) => void
  className?: string
  'aria-label'?: string
}

export default function Toggle(props: PropsWithChildren<ToggleProps>) {
  const {
    'aria-label': ariaLabel,
    onClick,
    selected = false,
    children,
    className,
    value,
  } = props

  const handleClick: ButtonOnCLick = (event) => {
    onClick?.(event, value)
  }

  return (
    <button
      className={clsx('toggle p-16', selected && 'toggle--selected', className)}
      onClick={handleClick}
      aria-label={ariaLabel}
    >
      {children}
    </button>
  )
}
