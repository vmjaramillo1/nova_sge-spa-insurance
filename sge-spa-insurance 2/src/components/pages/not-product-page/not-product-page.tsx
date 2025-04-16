import Button from '@app/components/atoms/button'
import Typography from '@app/components/atoms/typography'
import Feedback from '@app/components/organisms/feedback'
import { goBackHome, openBrowser } from '@app/utils/messages'
import { PORTAL_INSURANCE_URL } from '@app/utils'

const NotProductPage = () => {
  const handleBack = () => {
    goBackHome()
  }

  const handleGoOfferProducts = () => {
    openBrowser(PORTAL_INSURANCE_URL)
  }

  return (
    <div className="cannot-offered-page">
      <Feedback
        title={
          <>
            <Typography variant="title" className="feedback__title">
              Esto es incómodo.
            </Typography>
            <Typography variant="title" className="feedback__title mb-8">
              Por ahora no tenemos un producto para ti
            </Typography>
          </>
        }
        type="info"
        classes={{ root: 'pt-40 px-24' }}
      >
        <Typography>Te invitamos a conocer nuestra oferta de seguros.</Typography>
      </Feedback>
      <Button
        className="cannot-offered-page__button mt-auto mb-16"
        onClick={handleGoOfferProducts}
      >
        Oferta de seguros
      </Button>
      <Button
        color="secondary"
        className="cannot-offered-page__button"
        onClick={handleBack}
      >
        Regresar al inicio
      </Button>
    </div>
  )
}

export default NotProductPage
