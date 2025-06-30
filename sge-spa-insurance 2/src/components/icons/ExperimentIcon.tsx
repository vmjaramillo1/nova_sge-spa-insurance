import { FC, memo } from 'react'

import { IconProps } from './Icon.interface'

const ExperimentIcon: FC<IconProps> = ({ width = 30, height = 30 }) => {
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
      <path d="M17 18C17.85 18 18.4542 17.6208 18.8125 16.8625C19.1708 16.1042 19.0833 15.4 18.55 14.75L13 8V2H14C14.2833 2 14.5208 1.90417 14.7125 1.7125C14.9042 1.52083 15 1.28333 15 1C15 0.716667 14.9042 0.479167 14.7125 0.2875C14.5208 0.0958333 14.2833 0 14 0H6C5.71666 0 5.47917 0.0958333 5.2875 0.2875C5.09583 0.479167 5 0.716667 5 1C5 1.28333 5.09583 1.52083 5.2875 1.7125C5.47917 1.90417 5.71666 2 6 2H7V8L1.45 14.75C0.916666 15.4 0.829165 16.1042 1.1875 16.8625C1.54583 17.6208 2.15 18 3 18H17ZM15 15H5L8.4 11H11.6L15 15ZM17 16H3L9 8.7V2H11V8.7L17 16Z" fill="#0F265C"/>
    </svg>
  )
}

export default memo(ExperimentIcon)
