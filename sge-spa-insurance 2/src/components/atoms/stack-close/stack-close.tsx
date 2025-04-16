import { FC, memo } from 'react'
import './stack-close.scss'

interface StackCloseProps {
  onClose: () => void
}

const StackClose: FC<StackCloseProps> = (props) => {
  const { onClose } = props

  return (
    <div className="stack-close">
      <button onClick={onClose}>
        <pichincha-icon
          size="32px"
          type="--outlined"
          color="darkGrey"
          weight-color="500"
        >
          close
        </pichincha-icon>
      </button>
    </div>
  )
}

export default memo(StackClose)
