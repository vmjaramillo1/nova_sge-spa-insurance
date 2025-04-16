import Button from '@app/components/atoms/button'
import Typography from '@app/components/atoms/typography'
import Feedback from '@app/components/organisms/feedback'

import './already-page.scss'
import useAlreadyPage from './use-already-page'

const AlreadyPage = () => {
  const { handleBack, handleCall } = useAlreadyPage()

  return (
    <div className="already-page">
      <Feedback title="¡Ya estás protegido!" type="info" classes={{ root: 'pt-40' }}>
        <Typography>
          Ya cuentas con un seguro similar, para más información comunícate con
          nosotros.
        </Typography>
      </Feedback>
      <Typography variant="legal" className="text-center font-medium mt-auto mb-24">
        Comunícate al{' '}
        <Typography
          variant="legal"
          className="already-page__link text-information-500 cursor-pointer"
          onClick={handleCall}
          as="span"
        >
          (02) 299 9999
        </Typography>
      </Typography>
      <Button onClick={handleBack}>Entendido</Button>
    </div>
  )
}

export default AlreadyPage
