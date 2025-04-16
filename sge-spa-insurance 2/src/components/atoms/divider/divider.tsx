import { FC, memo } from 'react'
import clsx from 'clsx'

import './divider.scss'

interface DividerProps {
  className?: string
  dataTestId?: string
  vertical?: boolean
}

const Divider: FC<DividerProps> = (props) => {
  const { className, dataTestId, vertical } = props
  return (
    <span
      className={clsx('divider', vertical && 'divider--vertical', className)}
      data-testid={dataTestId}
      aria-hidden="true"
    />
  )
}

export default memo(Divider)
