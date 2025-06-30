import { FC, memo } from 'react'

import { IconProps } from './Icon.interface'

const DocumentCheckIcon: FC<IconProps> = ({ width = 14, height = 17 }) => {

  return (
    <svg
      width={width}
      height={height}
      viewBox="0 0 14 17"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      role="img"
      aria-hidden="true"
    >
      <path
        d="M6.12492 14L10.8333 9.29163L9.62492 8.08329L6.10408 11.6041L4.35408 9.85413L3.16659 11.0416L6.12492 14ZM1.99992 17.3333C1.54159 17.3333 1.14922 17.1701 0.822835 16.8437C0.496446 16.5173 0.333252 16.125 0.333252 15.6666V2.33329C0.333252 1.87496 0.496446 1.4826 0.822835 1.15621C1.14922 0.82982 1.54159 0.666626 1.99992 0.666626H8.66658L13.6666 5.66663V15.6666C13.6666 16.125 13.5034 16.5173 13.177 16.8437C12.8506 17.1701 12.4583 17.3333 11.9999 17.3333H1.99992ZM7.83325 6.49996V2.33329H1.99992V15.6666H11.9999V6.49996H7.83325Z"
        fill="#2F7ABF"
      />
    </svg>
  )
}

export default memo(DocumentCheckIcon)
