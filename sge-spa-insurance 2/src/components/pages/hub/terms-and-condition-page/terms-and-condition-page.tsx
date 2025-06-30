import React from 'react'
import Typography from '@app/components/atoms/typography'
import CheckLegal from '@app/components/molecules/check-legal'
import Button from '@app/components/atoms/button'
import SmartContent from '@app/components/atoms/smart-text'
import useTermsAndConditionPage from './use-terms-and-condition-page'
import DocumentCheckIcon from '@app/components/icons/DocumentCheckIcon'
import { console } from 'inspector'

const TermsAndConditionPage = () => {
  const {
    content,
    acceptTC,
    checkboxRef,
    handleLopdp,
    handleAcceptTC,
    canContinue,
    handleContinue,
  } = useTermsAndConditionPage()

  console.log('TermsAndConditionPage content', content)

  return (
    <div className="terms-and-condition">
      <div className="terms-and-condition__icon mb-16">
        <pichincha-icon
          size="36px"
          type="--round"
          color="info"
          weight_color="400"
          aria-hidden="true"
        >
          info
        </pichincha-icon>
      </div>

      <Typography
        variant="title"
        className="terms-and-condition__title mb-16"
        aria-label={content.title.aria}
      >
        <SmartContent>{content.title.value}</SmartContent>
      </Typography>
      <Typography
        variant="body"
        className="terms-and-condition__description mb-16"
        aria-label={content.description.aria}
      >
        <SmartContent>{content.description.value}</SmartContent>
      </Typography>

      <CheckLegal
        ref={checkboxRef}
        checked={acceptTC}
        onChange={handleAcceptTC}
        classes={{
          root: 'terms-and-condition__disclaimer mb-24',
        }}
      >
        <Typography variant="caption">
          {content.checkbox.description.value}
        </Typography>
      </CheckLegal>

      <Typography
        variant="legal"
        as="a"
        onClick={handleLopdp}
        className="no-underline font-semibold text-information-500 cursor-pointer terms-and-condition__document-link"
        tabIndex={0}
      >
        <DocumentCheckIcon />
        <span className="ml-8">{content.previewDocument.value}</span>
      </Typography>

      <Button
        className="mt-auto floating-button"
        onClick={handleContinue}
        disabled={!canContinue}
        aria-label={content.action.aria}
      >
        {content.action.value}
      </Button>
    </div>
  )
}

export default TermsAndConditionPage
