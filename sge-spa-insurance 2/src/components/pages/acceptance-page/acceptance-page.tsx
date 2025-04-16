import Button from '@app/components/atoms/button'
import Typography from '@app/components/atoms/typography'

import useAcceptancePage from './use-acceptance-page'
import './acceptance-page.scss'

const AcceptancePage = () => {
  const {
    SoftTokenView,
    CountDownView,
    content,
    softToken,
    disabled,
    handleCancel,
    handleConfirm,
  } = useAcceptancePage()

  return (
    <div className="acceptance-page">
      <Typography
        variant="title"
        className="font-semibold text-blue-500 text-center mb-24"
      >
        {content.title}
      </Typography>
      <div className="acceptance-page__logo mb-24">
        <div className="acceptance-page__icon mb-24" aria-hidden="true">
          <div className="token-timer__lottie -my-24" aria-hidden="true">
            <div className="token-timer__lottie-bg1" aria-hidden="true">
              <div className="token-timer__lottie-bg2" aria-hidden="true" />
            </div>
            <div className="token-timer__animation" aria-hidden="true">
              {SoftTokenView}
            </div>
          </div>
        </div>
        <div className="acceptance-page__number">
          <div aria-hidden="true">{CountDownView}</div>
          <Typography
            variant="caption"
            as="span"
            className="-mb-4 text-dark-gray-400"
            aria-label={softToken.ariaLabel}
          >
            {softToken.value}
          </Typography>
        </div>
      </div>
      <div className="text-center mb-24" aria-label={content.descriptions.aria}>
        <Typography variant="body" className="font-medium mb-4" aria-hidden="true">
          {content.descriptions.toPay}
        </Typography>
        <Typography className="text-dark-gray-400 mb-16" aria-hidden="true">
          {content.descriptions.from}
        </Typography>
        <Typography className="font-medium mb-16" aria-hidden="true">
          {content.descriptions.toCompany} <br />
          {content.descriptions.companyName}
        </Typography>
        <Typography className="font-medium mb-4" aria-hidden="true">
          {content.descriptions.forProduct} <br />
          {content.descriptions.productName}
        </Typography>
        <Typography className="text-dark-gray-400" aria-hidden="true">
          {content.descriptions.policy}
        </Typography>
      </div>
      <div className="mt-auto">
        <Button
          className="mb-16"
          onClick={handleConfirm}
          disabled={disabled}
          aria-label="Confirmar contratación"
        >
          Confirmar
        </Button>
        <Button
          color="secondary"
          onClick={handleCancel}
          aria-label="Cancelar y vuelve al inicio"
        >
          Cancelar
        </Button>
      </div>
    </div>
  )
}

export default AcceptancePage
