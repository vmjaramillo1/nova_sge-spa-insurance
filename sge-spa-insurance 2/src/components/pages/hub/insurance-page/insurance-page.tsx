import { Suspense, lazy } from 'react'
import Typography from '@app/components/atoms/typography'
import './insurance-page.scss'
import Banner from '@app/components/atoms/banner'
import ProductCard from '@app/components/atoms/product-card'
import useInsurancePage from './use-insurance-page'

const FamilyIcon = lazy(() => import('@app/components/icons/FamilyUnitIcon'))

const InsurancePage = () => {
  const { heroContent, productCards } = useInsurancePage()

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
