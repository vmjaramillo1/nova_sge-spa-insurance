import { FC, memo, PropsWithChildren, ReactNode } from 'react'
import ArrowIcon from '@app/components/icons/ArrowIcon'

import './button-save.scss'
import Typography from '../../atoms/typography/typography'

interface ButtonSaveProps
  extends Omit<React.ComponentProps<'button'>, 'className' | 'type'> {
  icon?: ReactNode
}

const ButtonSave: FC<PropsWithChildren<ButtonSaveProps>> = (props) => {
  const { icon, children, onClick, ...restProps } = props

  return (
    <button onClick={onClick} className="button-save" type="button" {...restProps}>
      <div className="button-save__icon" aria-hidden="true">
        <pichincha-icon
          size="24px"
          type="--outlined"
          color="blue"
          weight_color="500"
          aria-hidden="true"
        >
          {icon}
        </pichincha-icon>
      </div>
      <Typography variant="button" className="button-save__text">
        {children}
      </Typography>
      <div className="button-save__icon button-save__icon--arrow" aria-hidden="true">
        <ArrowIcon fill="#B7B7B9" />
      </div>
    </button>
  )
}

export default memo(ButtonSave)
