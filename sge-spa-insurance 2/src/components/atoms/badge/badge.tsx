import React from 'react'
import Typography from '@app/components/atoms/typography/'
import clsx from 'clsx'
import './badge.scss'

export interface BadgeProps {
  type: 'success' | 'error' | 'warning' | 'info'
  children: string | React.ReactNode
}

const MAP_ICONS = {
  success: 'check_circle',
  error: 'error',
  warning: 'info',
  info: 'info',
}

const Badge = ({ type, children }: BadgeProps) => {
  return (
    <div className={clsx('badge', `badge--${type}`)}>
      <pichincha-icon size="15px" type="--sharp" color={type} weight-color="500" >
        {MAP_ICONS[type]}
      </pichincha-icon>
      <Typography variant="caption" className="ml-4">
        {children}
      </Typography>
    </div>
  )
}

export default Badge
