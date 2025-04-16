import { FC, memo, PropsWithChildren, ReactNode } from 'react'
import clsx from 'clsx'

import './alert.scss'

export interface AlertProps {
  icon?: ReactNode
  type?: 'blank' | 'info' | 'success' | 'error' | 'warning'
  ariaLabel?: string
  classes?: Partial<Classes>
}

interface Classes {
  root: string
  content: string
}

type AriaHiddenValue = React.AriaAttributes['aria-hidden']

const Alert: FC<PropsWithChildren<AlertProps>> = (props) => {
  const { children, type, classes, icon, ariaLabel } = props

  const ariaHiddenChild: AriaHiddenValue = ariaLabel ? 'true' : 'false'

  return (
    <div
      className={clsx(
        'alert',
        type && `alert--${type}`,
        icon && 'alert--icon',
        classes?.root
      )}
      role="alert"
      aria-label={ariaLabel}
    >
      {icon && (
        <div className="alert__icon" aria-hidden="true">
          {icon}
        </div>
      )}
      <div
        className={clsx('alert__content', classes?.content)}
        aria-hidden={ariaHiddenChild}
      >
        {children}
      </div>
    </div>
  )
}

Alert.defaultProps = {
  type: 'info',
}

export default memo(Alert)
