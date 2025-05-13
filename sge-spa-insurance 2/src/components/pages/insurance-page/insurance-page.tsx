import { Suspense, lazy } from 'react'
import Typography from '@app/components/atoms/typography'
import './insurance-page.scss'
import content from './insrance-page-data.json'
import Banner from '@app/components/atoms/banner'
import ProductCard from '@app/components/atoms/product-card'
import usePortalHubSelector from '@app/store/hooks/use-portal-hub-selector'
import useInsurancePage from './use-insurance-page'

import { APP_ROUTES } from '@app/routes/config'

const FamilyIcon = lazy(() => import('@app/components/icons/FamilyUnitIcon'))

const InsurancePage = () => {
  // const hasOffer = useAppSelector(selectorHasOffer)
  const { heroContent, productCards } = useInsurancePage()


  
  const descriptionValue = (
    <>
      Suma una <span className="font-semibold">capa extra</span> de protección para
      tus cuentas y tarjetas.
    </>
  )
  const coverageValue = <strong>Este seguro cubre:</strong>
  const urlTarget = true // hasOffer
    ? APP_ROUTES.PRODUCT_DETAIL
    : APP_ROUTES.PREVIOUS_PRODUCT

  const contentProduct = {
    title: {
      value: 'Seguro por Robos y Fraudes',
      aria: 'Seguro por Robos y Fraudes',
    },
    description: {
      value: descriptionValue,
      aria: 'Suma una capa extra de protección para tus cuentas y tarjetas.',
    },
    paymentType: {
      value: 'Precio mensual',
      aria: 'Precio mensual',
    },
    price: {
      value: '$4,09',
      aria: '$4,09',
    },
    coverages: {
      title: coverageValue,
      items: [
        {
          key: 'coverage-1',
          title: {
            value: 'Hasta $10.000 al año por ',
            aria: 'Hasta $10.000 al año por ',
          },
          description: {
            value: 'cargos fraudulentos en tus cuentas',
            aria: 'cargos fraudulentos en tus cuentas',
          },
          aria: 'Hasta $10.000 al año por cargos fraudulentos en tus cuentas',
        },
        {
          key: 'coverage-2',
          title: {
            value: 'Hasta $1.400 al año por ',
            aria: 'Hasta $1.400 al año por ',
          },
          description: {
            value: 'robos en cajeros o ventanillas',
            aria: 'robos en cajeros o ventanillas',
          },
          aria: 'Hasta $10.000 al año por robos en cajeros o ventanillas',
        },
        {
          key: 'coverage-3',
          title: {
            value: 'Protección desde el primer día, ',
            aria: 'Protección desde el primer día, ',
          },
          description: {
            value: 'garantizando el respaldo necesario',
            aria: 'garantizando el respaldo necesario',
          },
          aria: 'Protección desde el primer día, garantizando el respaldo necesario',
        },
      ],
    },
    action: {
      urlTarget: urlTarget,
      value: 'Descubre qué incluye tu seguro',
      aria: 'Descubre qué incluye tu seguro',
    },
  }

  return (
    <div className="insurance-page">
      <Banner
        classes={{
          root: 'insurance-page__banner -mx-24 -mt-24 pt-24',
        }}
        variant="secondary"
      >
        <Suspense>
          <Typography
            variant="headline3"
            className="insurance-page__title mr-4"
            aria-label={heroContent.title.aria}
          >
            {heroContent.title.value}
          </Typography>

          <FamilyIcon />
        </Suspense>
      </Banner>

      <div className="insurance-page__product-list">
        {productCards.map((card) => (
          <ProductCard key={card.code} {...card} />
        ))}
      </div>
    </div>
  )
}

export default InsurancePage
