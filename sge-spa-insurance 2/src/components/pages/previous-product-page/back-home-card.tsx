import React from 'react'
import Typography from '@app/components/atoms/typography/'
import SmartContent from '@app/components/atoms/smart-text'
import InsuranceIcon from '@app/components/icons/InsuranceIcon'
import './previous-product-page.scss'

interface BackHomeCardProps {
  description: any
  action: any
}

const BackHomeCard = ({ description, action }: BackHomeCardProps) => {
  const handleClick = () => console.log(description)
  return (
    <div className="back-home-card">
      <InsuranceIcon width={48} height={48} />
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
