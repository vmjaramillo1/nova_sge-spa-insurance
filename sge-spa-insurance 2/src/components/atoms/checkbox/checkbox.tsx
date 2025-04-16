import { forwardRef, memo, useCallback, useRef } from 'react'

import './checkbox.scss'
import clsx from 'clsx'

export interface CheckBoxProps {
  className?: string
  checked?: boolean
  onChange?: (value: boolean) => void
  ariaLabelledby?: React.AriaAttributes['aria-labelledby']
}

const CheckBox = forwardRef<HTMLInputElement, CheckBoxProps>((props, ref) => {
  const { checked, onChange, className, ariaLabelledby } = props

  const checkboxValueRef = useRef<boolean>(checked ?? false)

  const handleChange = useCallback(() => {
    const newValue = !checkboxValueRef.current

    checkboxValueRef.current = newValue

    if (!onChange) return

    onChange(newValue)
  }, [onChange])

  return (
    <span className="inline-block">
      <input
        ref={ref}
        className={clsx('checkbox', className)}
        type="checkbox"
        aria-labelledby={ariaLabelledby}
        onChange={handleChange}
        checked={checked}
        value={String(checked ?? false)}
      />
    </span>
  )
})

export default memo(CheckBox)
