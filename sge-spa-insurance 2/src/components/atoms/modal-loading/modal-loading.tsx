import { memo, FC, PropsWithChildren } from 'react'

import './modal-loading.scss'
import { useLottie } from 'lottie-react'

import loaderAnimation from '@app/assets/animations/Loader.json'
import Typography from '../typography/typography'

const ModalLoading: FC<PropsWithChildren> = (props) => {
  const { children } = props

  const { View: LoaderView } = useLottie({
    animationData: loaderAnimation,
    loop: true,
    style: {
      width: 64,
      height: 64,
    },
    className: 'mb-16',
  })

  return (
    <div className="modal-loading">
      {LoaderView}
      <Typography variant="caption" className="font-medium text-dark-gray-400">
        {children}
      </Typography>
    </div>
  )
}

export default memo(ModalLoading)
