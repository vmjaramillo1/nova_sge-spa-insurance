import { FC, memo, PropsWithChildren, ReactNode } from 'react'

import './coverage-item.scss'
import Typography from '../typography'
import clsx from 'clsx'

export interface CoverageItemProps {
  title?: string
  subTitle?: string
  icon: ReactNode
  aria?: string
  classes?: Partial<Classes>
  role?: string
}

interface Classes {
  root: string
  icon: string
  content: string
}

const CoverageItem: FC<PropsWithChildren<CoverageItemProps>> = (props) => {
  const { icon, title, subTitle, classes, children, aria, role } = props

  return (
    <li
      className={clsx('coverage-item py-8', classes?.root)}
      aria-label={aria}
      {...(role ? { role } : {})}
    >
      {/* icon */}
      <div className={clsx('coverage-item__icon', classes?.icon)} aria-hidden="true">
        {icon}
      </div>
      {/* content */}
      <div
        className={clsx('coverage-item__content', classes?.content)}
        aria-hidden="true"
      >
        {(title || subTitle) && (
          <header className="coverage-item__header" aria-hidden="true">
            {title && (
              <Typography
                variant="body"
                className="font-semibold"
                aria-hidden="true"
              >
                {title}
              </Typography>
            )}

            {subTitle && (
              <Typography variant="body" className="mb-4" aria-hidden="true">
                {subTitle}
              </Typography>
            )}
          </header>
        )}

        <div className="coverage-item__description" aria-hidden="true">
          {children}
        </div>
      </div>
    </li>
  )
}

export default memo(CoverageItem)
