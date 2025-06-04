import { Suspense, lazy } from 'react'
import { Fragment } from 'react'
import Alert from '@app/components/atoms/alert'
import Button from '@app/components/atoms/button'
import ButtonSave from '@app/components/molecules/button-save'
import CoverageRow from '@app/components/atoms/coverage-row'
import Divider from '@app/components/atoms/divider/divider'
import DownloadIcon from '@app/components/icons/DownloadIcon'
import Typography from '@app/components/atoms/typography'
import SuccessIcon from '@app/components/icons/SuccessIcon'
import Banner from '@app/components/atoms/banner'

import './success-page.scss'
import clsx from 'clsx'
import useSuccessPage from './use-success-page'
import useOsType from '@app/hooks/use-os-type/use-os-type'
import SmartContent from '@app/components/atoms/smart-text'

const FraudsIcon = lazy(() => import('@app/components/icons/FraudsIcon'))

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
            <FraudsIcon />
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


          <Typography variant="body" className="mb-24">
            <SmartContent>{content.moreInformation.title.value}</SmartContent>
          </Typography>
          mor ingo
          {/* <Typography
            className="mb-16" {content.actions.value} moreInformation.title.
            aria-label={content.moreInformation.description.aria}
          >
            {content.moreInformation.description.value}
            {isIos && ', llámanos al (02) 2999 999'}
          </Typography>
          {isAndroid && (
            <ButtonSave
              icon="call"
              onClick={handleClickCall}
              aria-label={content.moreInformation.action.aria}
            >
              {content.moreInformation.action.value}
            </ButtonSave>
          )} */}
        </section>
      )}
      <footer className="mt-auto">
        <Button color="secondary" onClick={handleBackHome}>
          {content.actions.cta.value}
        </Button>
      </footer>
    </div>
  )
}

export default SuccessPage
