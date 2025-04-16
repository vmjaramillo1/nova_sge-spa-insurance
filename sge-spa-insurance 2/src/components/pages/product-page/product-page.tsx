import AccountCard from '@app/components/molecules/account-card'
import Alert from '@app/components/atoms/alert'
import Button from '@app/components/atoms/button'
import CheckLegal from '@app/components/molecules/check-legal'
import Typography from '@app/components/atoms/typography'
import Divider from '@app/components/atoms/divider/divider'
import PeriodicityCard from '@app/components/molecules/periodicity-card'
import useProductPage from './use-product-page'

import './product-page.scss'

const ProductPage = () => {
  const {
    accepted,
    content,
    periodicityOptionsContent,
    isMultiAccount,
    currentAccount,
    periodicitySelected,
    handleClickAccount,
    handleClickContinue,
    handleCheckLegal,
    handleDownload,
    handleClickPeriodicity,
  } = useProductPage()

  return (
    <div className="product-page">
      <Typography variant="subtitle" className="font-semibold">
        {content.title}
      </Typography>
      <Typography aria-label={content.description.aria} className="mb-16">
        {content.description.value}
      </Typography>
      <Typography variant="caption" className="font-semibold mb-8">
        ¿Cómo quieres pagar tu seguro?
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
            size="24px"
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
          {content.alert.description}
        </Typography>
      </Alert>
      <Divider className="mb-16" />
      <div className="mb-16">
        <Typography className="font-semibold mb-16">
          {content.select[isMultiAccount ? 'multipleAccount' : 'singleAccount']}
        </Typography>
        <AccountCard
          value={currentAccount.description}
          label={currentAccount.label}
          description={currentAccount.description}
          amount={currentAccount.value}
          onClick={handleClickAccount}
          actionable={isMultiAccount}
          ariaLabel={currentAccount.ariaLabelAccount}
        />
      </div>
      <CheckLegal
        checked={accepted}
        onChange={handleCheckLegal}
        classes={{ root: 'mt-auto mb-24' }}
      >
        {content.disclaimer.description}
        <Typography
          onClick={handleDownload}
          variant="legal"
          className="check-legal__insurance underline font-semibold"
          as="a"
          aria-label="Descargar el documento de cobertura total"
        >
          {content.disclaimer.action}
        </Typography>
      </CheckLegal>
      <Button onClick={handleClickContinue} disabled={!accepted}>
        Aceptar
      </Button>
    </div>
  )
}

export default ProductPage
