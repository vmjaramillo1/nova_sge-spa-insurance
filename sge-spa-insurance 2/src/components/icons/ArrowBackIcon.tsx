import { FC, memo } from 'react'

import { IconProps } from './Icon.interface'

const ArrowBackIcon: FC<IconProps> = (props) => {
  const { width, height } = props

  return (
    <svg
      width={width}
      height={height}
      viewBox="0 0 24 24"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      role="img"
      aria-hidden="true"
    >
      <path
        d="M20 11H7.83L13.42 5.41L12 4L4 12L12 20L13.41 18.59L7.83 13H20V11Z"
        fill="#0F265C"
      />
    </svg>
  )
}

ArrowBackIcon.defaultProps = {
  width: 24,
  height: 24,
}

export default memo(ArrowBackIcon)
