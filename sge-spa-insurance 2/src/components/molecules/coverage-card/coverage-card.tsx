import { FC, memo, PropsWithChildren, ReactNode } from 'react'
import clsx from 'clsx'

import './coverage-card.scss'
import Typography from '../../atoms/typography/typography'

interface CoverageCardProps {
  icon: ReactNode
  title: string
  classes?: Partial<Classes>
}

interface Classes {
  root: string
  title: string
  description: string
}

const CoverageCard: FC<PropsWithChildren<CoverageCardProps>> = (props) => {
  const { icon, title, children, classes } = props

  return (
    <div className={clsx('coverage-card p-24', classes?.root)} role="presentation">
      <div className={clsx('coverage-card__icon mb-8')} aria-hidden="true">
        {icon}
      </div>
      <Typography
        className={clsx('coverage-card__title mb-8 font-semibold', classes?.title)}
      >
        {title}
      </Typography>
      <Typography
        className={clsx('coverage-card__description', classes?.description)}
      >
        {children}
      </Typography>
    </div>
  )
}

export default memo(CoverageCard)
