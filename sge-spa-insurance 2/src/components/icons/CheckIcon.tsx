import { FC, memo } from 'react'

import { IconProps } from './Icon.interface'

const CheckIcon: FC<IconProps> = (props) => {
  const { width, height } = props

  return (
    <svg
      width={width}
      height={height}
      viewBox="0 0 18 18"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      role="img"
      aria-hidden="true"
    >
      <path
        d="M5.99991 11.1701L1.82991 7.00009L0.409912 8.41009L5.99991 14.0001L17.9999 2.00009L16.5899 0.590088L5.99991 11.1701Z"
        fill="#31A451"
      />
    </svg>
  )
}

CheckIcon.defaultProps = {
  width: 18,
  height: 18,
}

export default memo(CheckIcon)
