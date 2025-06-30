import { FC, PropsWithChildren, memo } from 'react'
import BPIcon from '@app/components/icons/BPIcon'
import Typography from '../typography'

interface AppTitleProps {
  isSuccess?: boolean
}

const AppTitle: FC<PropsWithChildren<AppTitleProps>> = ({
  isSuccess = false,
  children,
}) => {
  if (isSuccess) {
    return <BPIcon />
  }

  return (
    <Typography as="span" className="layout__title">
      {children}
    </Typography>
  )
}

export default memo(AppTitle)
