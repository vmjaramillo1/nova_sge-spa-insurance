import React from 'react'
import Typography from '@app/components/atoms/typography/'
import SmartContent from '@app/components/atoms/smart-text'
import InsuranceIconTuBanPro from '@app/components/icons/InsuranceIconTuBanPro'
import './previous-product-page.scss'
import { useNavigate } from 'react-router-dom'

import { APP_ROUTES } from '@app/routes/config'

// todo ajustar
interface BackHomeCardProps {
  description: any
  action: any
}

const BackHomeCard = ({ description, action }: BackHomeCardProps) => {
  const navigate = useNavigate()
  const handleClick = () => {
    navigate(APP_ROUTES.INSURANCE_PORTAL)
  }

  return (
    <div className="back-home-card">
      <InsuranceIconTuBanPro width={48} height={48} />
      <Typography
        variant="body"
        className="previous-product-page__title"
        aria-label={description.aria}
      >
        <SmartContent>{description.value}</SmartContent>
      </Typography>
      <button
        onClick={handleClick}
        className={'back-home-card__action font-semibold'}
        type="button"
        aria-label={action.aria}
      >
        {action.value}
      </button>
    </div>
  )
}

export default BackHomeCard
