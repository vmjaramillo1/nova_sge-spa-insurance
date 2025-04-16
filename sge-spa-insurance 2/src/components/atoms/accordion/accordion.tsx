import { FC, memo, PropsWithChildren, ReactNode, useCallback, useId } from 'react'
import clsx from 'clsx'
import ArrowIcon from '@app/components/icons/ArrowIcon'
import MuiCollapse from '@mui/material/Collapse'
import Typography from '../typography'

import './accordion.scss'

interface AccordionProps {
  title: ReactNode
  active?: boolean
  classes?: Partial<Classes>
  value?: string
  onChange?: (value: string) => void
  dataTestId?: string
}

interface Classes {
  root: string
  title: string
  content: string
}

const Accordion: FC<PropsWithChildren<AccordionProps>> = (props) => {
  const { title, children, active, onChange, value, classes, dataTestId } = props

  const currentId = useId()

  const handleClick = useCallback(() => {
    if (!onChange || !value) return
    onChange(value)
  }, [onChange, value])

  return (
    <li
      className={clsx('accordion', active && 'accordion--active', classes?.root)}
      data-testid={dataTestId}
    >
      <button
        onClick={handleClick}
        className={clsx('accordion__title', classes?.title)}
        type="button"
        aria-controls={currentId}
        aria-expanded={active}
      >
        {title}
        <div className="accordion__arrow" aria-hidden="true">
          <ArrowIcon direction={active ? 'up' : 'down'} fill="#0F265C" />
        </div>
      </button>
      <MuiCollapse in={active} unmountOnExit id={currentId} aria-hidden={!active}>
        <Typography className={clsx('accordion__content', classes?.content)}>
          {children}
        </Typography>
      </MuiCollapse>
    </li>
  )
}

Accordion.defaultProps = {
  active: false,
}

export default memo(Accordion)
