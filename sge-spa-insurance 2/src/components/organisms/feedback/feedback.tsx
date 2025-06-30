import React, { FC, PropsWithChildren, ReactNode, memo } from 'react'
import Typography from '@app/components/atoms/typography/typography'
import clsx from 'clsx'
import './feedback.scss'

type FeedBackType = 'error' | 'info'

export interface FeedBackProps {
  type?: FeedBackType
  icon?: ReactNode
  title: ReactNode
  classes?: Partial<Classes>
}

interface Classes {
  root?: string
}

interface Icon {
  background: string
  path: ReactNode
}

const FEEDBACK_ICON_BY_TYPE: Record<FeedBackType, Icon> = {
  error: {
    background: '#FBE6E6',
    path: (
      <path
        d="M32.4999 50C42.3293 50 50.5 41.847 50.5 32C50.5 22.1706 42.3117 14 32.4823 14C22.6352 14 14.5 22.1706 14.5 32C14.5 41.847 22.6529 50 32.4999 50ZM26.1646 39.8353C25.3353 39.8353 24.6646 39.1647 24.6646 38.3353C24.6646 37.9294 24.8411 37.5765 25.1235 37.3118L30.3823 32.0176L25.1235 26.7236C24.8411 26.4765 24.6646 26.1059 24.6646 25.7C24.6646 24.8883 25.3353 24.2353 26.1646 24.2353C26.5705 24.2353 26.9234 24.3941 27.1882 24.6765L32.4823 29.9529L37.8117 24.6588C38.1117 24.3412 38.4293 24.2 38.8175 24.2C39.647 24.2 40.3175 24.8706 40.3175 25.6824C40.3175 26.0882 40.1764 26.4235 39.8764 26.7059L34.5823 32.0176L39.8587 37.2765C40.1234 37.5588 40.2999 37.9118 40.2999 38.3353C40.2999 39.1647 39.6294 39.8353 38.7999 39.8353C38.3764 39.8353 38.0234 39.6588 37.7588 39.3941L32.4823 34.0999L27.2235 39.3941C26.9587 39.6764 26.5705 39.8353 26.1646 39.8353Z"
        fill="#D50707"
      />
    ),
  },
  info: {
    background: '#EAF1F8',
    path: (
      <path
        d="M32.5001 14C22.6707 14 14.5 22.153 14.5 32C14.5 41.8294 22.6883 50 32.5177 50C42.3648 50 50.5 41.8294 50.5 32C50.5 22.153 42.3471 14 32.5001 14ZM32.5177 29.353C33.453 29.353 33.9648 29.9 34.0001 30.8353L34.2471 39.5529C34.2824 40.5235 33.5412 41.2118 32.5354 41.2118C31.5472 41.2118 30.7883 40.5059 30.8236 39.5353L31.0707 30.8353C31.106 29.8824 31.6354 29.353 32.5177 29.353ZM32.5177 22.8589C33.5412 22.8589 34.4942 23.6706 34.4942 24.7647C34.4942 25.8588 33.5589 26.6706 32.5177 26.6706C31.4942 26.6706 30.5413 25.8765 30.5413 24.7647C30.5413 23.653 31.5118 22.8589 32.5177 22.8589Z"
        fill="#2F7ABF"
      />
    ),
  },
}

const FeedBack: FC<PropsWithChildren<FeedBackProps>> = ({
  icon,
  title,
  type = 'info',
  children,
  classes,
}) => {
  const { background, path } = FEEDBACK_ICON_BY_TYPE[type]

  return (
    <div className={clsx('feedback', classes?.root)}>
      <div className="feedback__icon mb-24">
        {icon ?? (
          <svg
            width="65"
            height="64"
            viewBox="0 0 65 64"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
            role="img"
          >
            <circle cx="32.5" cy="32" r="32" fill={background} />
            {path}
          </svg>
        )}
      </div>
      {typeof title === 'string' ? (
        <Typography variant="title" className="feedback__title mb-8">
          {title}
        </Typography>
      ) : (
        title
      )}
      <div className="feedback__content">{children}</div>
    </div>
  )
}

export default memo(FeedBack)
