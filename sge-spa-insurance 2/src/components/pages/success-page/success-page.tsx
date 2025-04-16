import { Fragment } from 'react'
import Alert from '@app/components/atoms/alert'
import Button from '@app/components/atoms/button'
import ButtonSave from '@app/components/molecules/button-save'
import CoverageRow from '@app/components/atoms/coverage-row'
import Divider from '@app/components/atoms/divider/divider'
import DownloadIcon from '@app/components/icons/DownloadIcon'
import Typography from '@app/components/atoms/typography'
import SuccessIcon from '@app/components/icons/SuccessIcon'

import './success-page.scss'
import clsx from 'clsx'
import useSuccessPage from './use-success-page'
import useOsType from '@app/hooks/use-os-type/use-os-type'

const SuccessPage = () => {
  const { content, handleClickCall, handleDownloadUserGuide, handleBackHome } =
    useSuccessPage()

  const { isAndroid, isIos } = useOsType()

  return (
    <div className="success-page -mt-24">
      <div className="success-page__content mb-16 px-16 py-24 bg-dark-grayish-blue-50">
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
          {content.description}
        </Typography>
        <Alert
          type="info"
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
          classes={{ root: 'success-page__alert mb-16' }}
        >
          <Typography
            variant="caption"
            className="text-dark-gray-400"
            aria-label={content.alert.aria}
          >
            {content.alert.value}
          </Typography>
        </Alert>
        <div className="mb-32">
          {content.details.map(({ subItems, key: itemKey, aria }, itemIndex) => (
            <Fragment key={itemKey}>
              <div className="success-page__block" aria-label={aria}>
                {subItems.map(({ key, label, value }, subItemIndex) => {
                  const isFirstSubItem = subItemIndex === 0

                  const variant = isFirstSubItem ? 'body' : 'caption'

                  return (
                    <CoverageRow
                      key={key}
                      label={<Typography variant={variant}>{label}</Typography>}
                      value={<Typography variant={variant}>{value}</Typography>}
                      classes={{
                        root: clsx(
                          'success__row',
                          !isFirstSubItem && 'mt-2',
                          isFirstSubItem && itemIndex === 0 && 'py-4'
                        ),
                      }}
                      bolder={isFirstSubItem}
                    />
                  )
                })}
              </div>
              <Divider />
            </Fragment>
          ))}
        </div>
        <Button
          onClick={handleDownloadUserGuide}
          aria-label="Descargar guía de uso del Seguro"
          className="download-use-guide"
        >
          <DownloadIcon />
          Cómo usar tu seguro
        </Button>
      </div>
      {content?.moreInformation?.isActive && (
        <section className="mb-16">
          <Typography
            className="mb-16"
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
              {content.moreInformation.action.label}
            </ButtonSave>
          )}
        </section>
      )}
      <footer className="mt-auto">
        <Button color="secondary" onClick={handleBackHome}>
          Finalizar
        </Button>
      </footer>
    </div>
  )
}

export default SuccessPage
