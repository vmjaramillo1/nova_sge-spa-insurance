import { Suspense, lazy } from 'react'
import Alert from '@app/components/atoms/alert'
import Button from '@app/components/atoms/button'
import CoverageItem from '@app/components/atoms/coverage-item'
import Banner from '@app/components/atoms/banner'
import CheckLegal from '@app/components/molecules/check-legal'
import Typography from '@app/components/atoms/typography'
import Divider from '@app/components/atoms/divider/divider'
import Faq from '@app/components/organisms/faq/faq'
import useProductDetailPage, {
  useContentProductDetailPage,
} from './use-product-detail-page'
import './product-detail-page.scss'

const FraudsIcon = lazy(() => import('@app/components/icons/FraudsIcon'))

const ProductDetailPage = () => {
  const {
    acceptTC,
    lopdp,
    handleAcceptTC,
    handleContinue,
    handleDownloadUseGuide,
    handleLopdp,
    checkboxRef,
    canContinue,
  } = useProductDetailPage()

  const { content, coverages } = useContentProductDetailPage()

  return (
    <div className="product-detail">
      <Banner
        classes={{
          root: 'product-detail__banner -mt-24 -mx-24 mb-24',
        }}
        variant="secondary"
      >
        <Suspense>
          <FraudsIcon />
        </Suspense>
      </Banner>
      <Typography
        variant="headline2"
        className="product-detail__title mb-16"
        aria-label={content.title.aria}
      >
        {content.title.value}
      </Typography>
      <Typography
        variant="subtitle"
        className="product-detail__description mb-24"
        aria-label={content.description.aria}
        as="p"
      >
        {content.description.value}
      </Typography>
      <section className="mb-24">
        <ul className="product-detail__coverages">
          {coverages.map(({ description, ...restProps }) => (
            <CoverageItem {...restProps}>
              <Typography aria-hidden="true">{description}</Typography>
            </CoverageItem>
          ))}
        </ul>
      </section>
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
        classes={{ root: 'mb-24' }}
      >
        <Typography variant="caption" className="text-dark-gray-400">
          {content.alert.description}
        </Typography>
        <Typography
          variant="caption"
          className="underline text-information-500 font-semibold cursor-pointer"
          onClick={handleDownloadUseGuide}
          as="a"
          aria-label={content.alert.action.aria}
        >
          {content.alert.action.value}
        </Typography>
      </Alert>
      <Divider className="h-16 mb-24" />
      <Faq
        title={content.faq.title.value}
        titleAria={content.faq.title.aria}
        items={content.faq.questions}
        classes={{ root: 'mb-48' }}
      />
      {!lopdp.acceptedTermsConditions && (
        <CheckLegal
          ref={checkboxRef}
          checked={acceptTC}
          onChange={handleAcceptTC}
          classes={{
            root: 'product-detail__disclaimer mb-24',
          }}
        >
          <span>{content.legal.description}</span>
          <Typography
            variant="legal"
            as="a"
            onClick={handleLopdp}
            className="underline font-semibold text-information-500 cursor-pointer"
            tabIndex={0}
          >
            {content.legal.action}
          </Typography>
        </CheckLegal>
      )}
      <Button
        className="mt-auto floating-button"
        onClick={handleContinue}
        disabled={!canContinue}
        aria-label="Continuar"
      >
        Continuar
      </Button>
    </div>
  )
}

export default ProductDetailPage
