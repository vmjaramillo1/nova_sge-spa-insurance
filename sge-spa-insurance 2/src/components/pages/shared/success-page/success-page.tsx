import { Suspense, lazy } from 'react'
import { Fragment } from 'react'
import Alert from '@app/components/atoms/alert'
import Button from '@app/components/atoms/button'
import ButtonSave from '@app/components/molecules/button-save'
import CoverageRow from '@app/components/atoms/coverage-row'
import Divider from '@app/components/atoms/divider/divider'
import Typography from '@app/components/atoms/typography'
import SuccessIcon from '@app/components/icons/SuccessIcon'
import Banner from '@app/components/atoms/banner'

import './success-page.scss'
import clsx from 'clsx'
import useSuccessPage from './use-success-page'
import useOsType from '@app/hooks/use-os-type/use-os-type'
import SmartContent from '@app/components/atoms/smart-text'

const SuccessFraudIcon = lazy(() => import('@app/components/icons/SuccessFraudIcon'))

const SuccessPage = () => {
  const { content, handleClickCall, handleDownloadUserGuide, handleBackHome } =
    useSuccessPage()

  const { isAndroid, isIos } = useOsType()

  return (
    <div className="success-page -mt-24">
      <div className="success-page__content mb-24 px-16 pt-24 pb-16 bg-dark-grayish-blue-50">
        <div className="success-page__logo mb-8">
          <SuccessIcon />
        </div>
        <Typography
          variant="title"
          className="success-page__title mb-4 font-semibold"
          aria-label={content.title.aria}
        >
          {content.title.value}
        </Typography>
        <Typography variant="caption" className="mb-24 text-center">
          <SmartContent>{content.policy.value}</SmartContent>
        </Typography>

        <Banner
          classes={{
            root: 'product-detail__banner  mb-24',
          }}
          variant="secondary"
        >
          <Suspense>
            <SuccessFraudIcon />
          </Suspense>
        </Banner>

        <Typography variant="caption" className="mb-24 text-center">
          <SmartContent>{content.description.value}</SmartContent>
        </Typography>

        <Alert type="info" classes={{ root: 'success-page__alert mb-16' }}>
          <Typography
            variant="caption"
            className="text-dark-gray-400"
            aria-label={content.alert.aria}
          >
            {content.alert.value}
          </Typography>
        </Alert>

        <div>
          {content.details.map(({ subItems, key: itemKey, aria }) => (
            <Fragment key={itemKey}>
              <div className="success-page__block" aria-label={aria}>
                {subItems.map(({ key, label, value }) => {
                  return (
                    <CoverageRow
                      key={key}
                      label={
                        <Typography variant="caption">
                          <SmartContent>{label}</SmartContent>
                        </Typography>
                      }
                      value={
                        <Typography variant="caption">
                          <SmartContent>{value}</SmartContent>
                        </Typography>
                      }
                      classes={{
                        root: clsx('success__row', 'mt-2'),
                      }}
                    />
                  )
                })}
              </div>
            </Fragment>
          ))}
        </div>
      </div>
      <Button
        onClick={handleDownloadUserGuide}
        aria-label="Descargar guía de uso del Seguro"
        className="download-use-guide"
      >
        {content.actions.btnInformation.value}
      </Button>
      {content?.moreInformation?.isActive && (
        <section className="my-16">
          <Typography variant="body" className="mb-8">
            <SmartContent>{content.moreInformation.title.value}</SmartContent>
          </Typography>

          <div className="success-page__actions">
            <ButtonSave
              icon={content.moreInformation.actions.CALL.icon}
              onClick={handleClickCall}
              aria-label={content.moreInformation.actions.CALL.aria}
            >
              {content.moreInformation.actions.CALL.value}
            </ButtonSave>
            <Divider className="mx-4" />
            <ButtonSave
              icon={content.moreInformation.actions.DOWNLOAD.icon}
              onClick={handleDownloadUserGuide}
              aria-label={content.moreInformation.actions.DOWNLOAD.aria}
            >
              {content.moreInformation.actions.DOWNLOAD.value}
            </ButtonSave>
          </div>
        </section>
      )}

      <div className="success-page__content mb-24 px-16 pt-24 pb-16 bg-dark-grayish-blue-50">
        <Typography variant="body" className="mb-8">
          <SmartContent>{content.additionalInfo.title.value}</SmartContent>
        </Typography>

        {content.additionalInfo.items.map((item, index) => {
          return (
            <div className="more-info" key={index}>
              <div>
                <pichincha-icon
                  size="24px"
                  type="--outlined"
                  color="blue"
                  weight_color="500"
                  aria-hidden="true"
                >
                  {item.icon}
                </pichincha-icon>
              </div>

              <div className="more-info__content">
                <Typography variant="caption" className="mb-8">
                  <SmartContent>{item.value}</SmartContent>
                </Typography>
              </div>
            </div>
          )
        })}
      </div>

      <footer className="mt-auto">
        <Button color="secondary" onClick={handleBackHome}>
          {content.actions.cta.value}
        </Button>
      </footer>
    </div>
  )
}

export default SuccessPage
