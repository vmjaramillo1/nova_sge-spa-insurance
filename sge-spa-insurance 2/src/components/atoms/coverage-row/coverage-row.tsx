import { FC, ReactNode, memo } from 'react'
import clsx from 'clsx'
import SmartContent from '@app/components/atoms/smart-text'

import './coverage-row.scss'

export interface CoverageRowProps {
  label: ReactNode
  value: ReactNode
  bolder?: boolean
  aria?: string
  classes?: Partial<Classes>
}

interface Classes {
  root: string
  shared: string
  label: string
  value: string
}

const CoverageRow: FC<CoverageRowProps> = (props) => {
  const { label, value, bolder = false, classes, aria } = props

  return (
    <div
      className={clsx('coverage-row', bolder && 'font-semibold', classes?.root)}
      aria-label={aria}
      aria-hidden={!aria}
    >
      <div
        className={clsx(
          'coverage-row__label',
          bolder && 'font-semibold',
          classes?.label,
          classes?.shared
        )}
        aria-hidden="true"
      >
        {label}
      </div>
      <div
        className={clsx(
          'coverage-row__value',
          bolder && 'font-semibold',
          classes?.shared,
          classes?.value
        )}
        aria-hidden="true"
      >
        {value}
      </div>
    </div>
  )
}

export default memo(CoverageRow)
