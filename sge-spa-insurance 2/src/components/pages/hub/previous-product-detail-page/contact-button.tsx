import Typography from '@app/components/atoms/typography'
import SmartContent from '@app/components/atoms/smart-text'

interface ContactButtonProps {
  aria: string
  text: string
  buttonText: string
  icon: string
  onClick: () => void
}

const ContactButton = ({
  aria,
  text,
  buttonText,
  icon,
  onClick,
}: ContactButtonProps) => {
  const pichinchaIconProps = {
    size: '22px',
    type: '--outlined',
    color: 'blue',
    'weight-color': '500',
  }

  return (
    <div className="previous-product-detail__contact">
      <div className="previous-product-detail__actions">
        <pichincha-icon {...pichinchaIconProps}>{icon}</pichincha-icon>
        <Typography
          variant="body"
          className="font-medium m-auto"
          aria-label={aria}
        >
          <SmartContent>{text}</SmartContent>
        </Typography>
      </div>

      <button onClick={onClick}>
        <Typography
          variant="caption"
          className="font-medium text-information-500 underline"
        >
          <SmartContent>{buttonText}</SmartContent>
        </Typography>
      </button>
    </div>
  )
}

export default ContactButton
