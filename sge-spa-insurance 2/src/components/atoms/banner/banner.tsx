import { FC, memo, PropsWithChildren } from 'react'
import clsx from 'clsx'

import './banner.scss'

export interface BannerProps {
  classes?: Partial<Classes>
  variant?: 'primary' | 'secondary'
  ariaHidden?: boolean
}

interface Classes {
  root: string
}

const Banner: FC<PropsWithChildren<BannerProps>> = ({
  children,
  classes,
  variant = 'primary',
  ariaHidden = true,
}) => {
  return (
    <div
      className={clsx('banner', variant && `banner--${variant}`, classes?.root)}
      role="banner"
      aria-hidden={ariaHidden}
    >
      {children}
    </div>
  )
}

export default memo(Banner)
