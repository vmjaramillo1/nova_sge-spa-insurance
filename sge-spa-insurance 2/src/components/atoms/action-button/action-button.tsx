import React, { FC, PropsWithChildren, ReactNode, memo } from 'react'
import Typography from '../typography'

interface ActionButtonProps extends React.ComponentProps<'button'> {
  icon: ReactNode
}

const ActionButton: FC<PropsWithChildren<ActionButtonProps>> = (props) => {
  const { children, icon, onClick, ...restProps } = props

  return (
    <button onClick={onClick} {...restProps} className="circle-icon">
      <div className="circle-icon__icon mb-8" aria-hidden="true">
        {icon}
      </div>
      <Typography
        variant="legal"
        className="circle-icon__description"
        aria-hidden="true"
        as="span"
      >
        {children}
      </Typography>
    </button>
  )
}

export default memo(ActionButton)
