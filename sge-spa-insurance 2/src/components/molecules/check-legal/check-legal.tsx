import { forwardRef, memo, PropsWithChildren, useId } from 'react'
import clsx from 'clsx'

import CheckBox, { CheckBoxProps } from '@app/components/atoms/checkbox'
import Typography from '@app/components/atoms/typography'

import './check-legal.scss'

type CheckBoxChange = CheckBoxProps['onChange']

interface CheckLegalProps {
  onChange?: CheckBoxChange
  checked?: boolean
  classes?: Partial<Classes>
}

interface Classes {
  root: string
  checkbox: string
  content: string
}

const CheckLegal = forwardRef<HTMLInputElement, PropsWithChildren<CheckLegalProps>>(
  (props, ref) => {
    const { onChange, checked, children, classes } = props

    const currentId = useId()

    return (
      <div className={clsx('check-legal', classes?.root)}>
        <div className="check-legal__checkbox">
          <CheckBox
            ref={ref}
            checked={checked}
            onChange={onChange}
            ariaLabelledby={currentId}
          />
          <Typography
            id={currentId}
            variant="legal"
            className="check-legal__content"
            as="label"
            aria-hidden="true"
          >
            {children}
          </Typography>
        </div>
      </div>
    )
  }
)

export default memo(CheckLegal)
