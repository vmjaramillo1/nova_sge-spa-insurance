import { FC, memo } from 'react'

import { IconProps } from './Icon.interface'

export type ArrowDirection = 'left' | 'right' | 'up' | 'down'

interface Props extends IconProps {
  fill?: string
  direction?: ArrowDirection
}

const ArrowIcon: FC<Props> = (props) => {
  const {
    height = 24,
    width = 24,
    direction = 'right',
    fill = '#6E6E73',
    dataTestId,
  } = props

  const pathByDirection: Record<ArrowDirection, string> = {
    left: 'M10.0001 6L8.59009 7.41L13.1701 12L8.59009 16.59L10.0001 18L16.0001 12L10.0001 6Z',
    right:
      'M9.99997 6L8.58997 7.41L13.17 12L8.58997 16.59L9.99997 18L16 12L9.99997 6Z',
    up: 'M16.59 15.41L12 10.83L7.41 15.41L6 14L12 8.00003L18 14L16.59 15.41Z',
    down: 'M7.41 8.59009L12 13.1701L16.59 8.59009L18 10.0001L12 16.0001L6 10.0001L7.41 8.59009Z',
  }

  return (
    <svg
      width={width}
      height={height}
      viewBox="0 0 24 24"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      aria-hidden="true"
      data-testid={dataTestId}
    >
      <path d={pathByDirection[direction]} fill={fill} />
    </svg>
  )
}

export default memo(ArrowIcon)
