import AccountCard from '@app/components/molecules/account-card'
import Alert from '@app/components/atoms/alert'
import Button from '@app/components/atoms/button'
import CheckLegal from '@app/components/molecules/check-legal'
import Typography from '@app/components/atoms/typography'
import Divider from '@app/components/atoms/divider/divider'
import PeriodicityCard from '@app/components/molecules/periodicity-card'
import useProductPage from './use-product-page'
import useModal from '@app/hooks/use-modal/use-modal'
import ModalAccount from '@app/components/atoms/modal-account'
import SmartContent from '@app/components/atoms/smart-text'

import './product-page.scss'

// pagina de pago
const ProductPage = () => {
  const { isOpen: showModalAccount, toggle: handleModalCoverage } = useModal()
  const {
    accepted,
    content,
    periodicityOptionsContent,
    isMultiAccount,
    currentAccount,
    periodicitySelected,
    handleClickContinue,
    handleCheckLegal,
    handleDownload,
    handleClickPeriodicity,
  } = useProductPage()

  return (
    <>
      <div className="product-page">
        <Typography variant="subtitle" className="font-semibold">
          <SmartContent>{content.title.value}</SmartContent>
        </Typography>
        <Typography aria-label={content.description.aria} className="mb-16">
          {content.description.value}
        </Typography>
        <Typography variant="caption" className="font-semibold mb-8">
          {content.paymentMethod.input.value}
        </Typography>
        <div className="product-page__periodicity">
          {periodicityOptionsContent.map((periodicity) => (
            <PeriodicityCard
              key={periodicity.code}
              value={periodicity.code}
              name={periodicity.name}
              price={periodicity.price}
              badge={periodicity.badge}
              additional={periodicity.additional}
              selected={periodicity.code === periodicitySelected}
              onClick={handleClickPeriodicity}
            />
          ))}
        </div>
        <Alert
          icon={
            <pichincha-icon
              class="-mb-4 hydrated"
              size="20px"
              type="--round"
              color="info"
              weight_color="400"
              aria-hidden="true"
            >
              info
            </pichincha-icon>
          }
          ariaLabel={content.alert?.aria ?? ''}
          classes={{ root: 'mb-16' }}
        >
          <Typography variant="caption" className="text-dark-gray-400">
            {content.alert.value}
          </Typography>
        </Alert>
        <Divider className="mb-16" />
        <div className="mb-16">
          <Typography className="font-semibold mb-16">
            {
              content.selectAccount[
                isMultiAccount ? 'multipleAccount' : 'singleAccount'
              ]
            }
          </Typography>
          <AccountCard
            value={currentAccount.description}
            label={currentAccount.label}
            description={currentAccount.description}
            amount={currentAccount.value}
            onClick={handleModalCoverage}
            actionable={isMultiAccount}
            ariaLabel={currentAccount.ariaLabelAccount}
          />
        </div>
        <CheckLegal
          checked={accepted}
          onChange={handleCheckLegal}
          classes={{ root: 'mt-auto mb-24' }}
        >
          {content.disclaimer.value}
          {content.disclaimer?.action && content.disclaimer?.action === '' && (
            <Typography
              onClick={handleDownload}
              variant="legal"
              className="check-legal__insurance underline font-semibold"
              as="a"
              aria-label={content.disclaimer.aria}
            >
              {content.disclaimer.action}
            </Typography>
          )}
        </CheckLegal>
        <Button onClick={handleClickContinue} disabled={!accepted}>
          {content.actionNext.cta.value}
        </Button>
      </div>

      {showModalAccount && <ModalAccount handleClose={handleModalCoverage} />}
    </>
  )
}

export default ProductPage
