import Button from '@app/components/atoms/button'
import Typography from '@app/components/atoms/typography'
import Feedback from '@app/components/organisms/feedback'

import './not-business-rule-page.scss'
import useAlreadyPage from './use-not-business-rule-page'

const NotBusinessRulePage = () => {
  const { handleBack } = useAlreadyPage()

  return (
    <div className="already-page">
      <Feedback title="Solicitud incompleta" type="info" classes={{ root: 'pt-40' }}>
        <Typography>
          No pudimos procesar tu solicitud por restricciones del sistema. Por favor,
          revisa la información ingresada o inténtalo más tarde.
        </Typography>
      </Feedback>
      <Button onClick={handleBack}>Entendido</Button>
    </div>
  )
}

export default NotBusinessRulePage
