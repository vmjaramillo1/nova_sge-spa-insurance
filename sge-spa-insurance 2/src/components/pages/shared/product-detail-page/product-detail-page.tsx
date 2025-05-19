import { Suspense, lazy } from 'react'
import Alert from '@app/components/atoms/alert'
import Button from '@app/components/atoms/button'
import Banner from '@app/components/atoms/banner'
import Typography from '@app/components/atoms/typography'
import Divider from '@app/components/atoms/divider/divider'
import Faq from '@app/components/organisms/faq/faq'
import useProductDetailPage, {
  useContentProductDetailPage,
} from './use-product-detail-page'
import './product-detail-page.scss'
import SmartContent from '@app/components/atoms/smart-text'
import clsx from 'clsx'
import ArrowIcon from '@app/components/icons/ArrowIcon'
import ModalCoverage from '@app/components/atoms/modal-coverage'

const FraudsIcon = lazy(() => import('@app/components/icons/FraudsIcon'))

const ProductDetailPage = () => {
  const { handleContinue, showModalCoverage, handleModalCoverage } =
    useProductDetailPage()

  const { content, questions, coverages } = useContentProductDetailPage()

  return (
    <>
      <div className="product-detail">
        <Banner
          classes={{
            root: 'product-detail__banner  mb-24',
          }}
          variant="secondary"
        >
          <Suspense>
            <FraudsIcon />
          </Suspense>
        </Banner>
        <Typography
          variant="headline3"
          className="product-detail__title mb-16"
          aria-label={content.sectionHero.title.aria}
        >
          {content.sectionHero.title.value}
        </Typography>
        <Typography
          variant="body"
          className="product-detail__description mb-24"
          aria-label={content.sectionHero.description.aria}
          as="p"
        >
          <SmartContent>{content.sectionHero.description.value}</SmartContent>
        </Typography>
        <Faq
          description={content.sectionFaq.description}
          items={questions}
          classes={{ root: 'mb-24' }}
        />

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
            <SmartContent>{content.sectionFaq.alert.value}</SmartContent>
          </Typography>
        </Alert>

        <div>
          <button
            onClick={handleModalCoverage}
            className={clsx('product-detail__action')}
            type="button"
            aria-label={content.sectionCoverages.actionShowCoverages.aria}
          >
            {content.sectionCoverages.actionShowCoverages.value}
            <ArrowIcon fill="#2F7ABF" />
          </button>
        </div>
        <Divider className="h-16 mb-16 mt-16 -mx-24" />
        <Button
          className="mt-auto floating-button"
          onClick={handleContinue}
          aria-label={content.sectionCoverages.actionNext.aria}
        >
          {content.sectionCoverages.actionNext.value}
        </Button>
      </div>
      {showModalCoverage && (
        <ModalCoverage handleClose={handleModalCoverage} {...coverages} />
      )}
    </>
  )
}

export default ProductDetailPage
