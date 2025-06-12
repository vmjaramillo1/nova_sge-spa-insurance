import { FC, PropsWithChildren, SyntheticEvent, memo } from 'react'
import clsx from 'clsx'

import ArrowBackIcon from '@app/components/icons/ArrowBackIcon'

import './header.scss'
import Skeleton from '@app/components/atoms/skeleton'
import { pressHeader } from '@app/utils/messages'

interface HeaderProps {
  hiddenActionable?: boolean
  isLoading?: boolean
  classes?: Partial<Classes>
}

interface Classes {
  root: string
}

const Header: FC<PropsWithChildren<HeaderProps>> = (props) => {
  const { children, hiddenActionable, classes, isLoading } = props

  const handleBack = (event: SyntheticEvent) => {
    event.preventDefault()
    pressHeader()
  }

  if (isLoading) {
    return (
      <div className="header">
        <div className="header__box" aria-hidden="true">
          <Skeleton width="24px" height="24px" className="header__back--loading" />
        </div>
        <Skeleton width="120px" height="16px" className="header__title--loading" />
        <div className="header__box" aria-hidden="true" />
        <div className="header__box" aria-hidden="true">
          <Skeleton width="24px" height="24px" className="header__back--loading" />
        </div>
      </div>
    )
  }

  return (
    <header className={clsx('header', classes?.root)}>
      {!hiddenActionable && (
        <button
          title="Regresar"
          onClick={handleBack}
          className="header__box header__box--action"
          type="button"
        >
          <ArrowBackIcon />
        </button>
      )}
      {children}
      {!hiddenActionable && <div className="header__box" aria-hidden="true" />}
    </header>
  )
}

export default memo(Header)
