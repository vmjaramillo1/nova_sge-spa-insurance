import Radio from '@app/components/atoms/radio/radio'
import Toggle from '@app/components/atoms/toggle/toggle'
import Typography from '@app/components/atoms/typography'
import { useSmartText } from '@app/components/atoms/smart-text'


import './periodicity-card.scss'

interface PeriodicityCardProps {
  selected: boolean
  badge?: string
  name: string
  value: string
  additional?: string
  price: string

  onClick: (value: string) => void
  'data-testid'?: string
  ariaLabel?: string
}

export default function PeriodicityCard(props: Readonly<PeriodicityCardProps>) {
  const {
    selected,
    badge,
    additional,
    name,
    value,
    price,
    onClick,
    'data-testid': testid,
    ariaLabel = '',
  } = props

  const handleClick = (_event: unknown, code: string) => {
    onClick?.(code)
  }

  const ariaCard = useSmartText(ariaLabel ?? '')

  return (
    <Toggle
      className="periodicity-card"
      selected={selected}
      value={value}
      onClick={handleClick}
      aria-label={ariaCard}
    >
      {badge && (
        <div className="periodicity-card__badge" aria-hidden={true}>
          {badge}
        </div>
      )}
      <Typography variant="body" className="font-medium" aria-hidden={true}>
        {name}
      </Typography>
      <Typography variant="amountSmall" className="font-semibold" aria-hidden={true}>
        {price}{' '}
      </Typography>
      {additional && (
        <Typography variant="caption" className="font-semibold" aria-hidden={true}>
          Antes <span className="periodicity-card__through">{additional}</span>
        </Typography>
      )}
      <Typography variant="caption" aria-hidden={true}>
        Incluye impuestos
      </Typography>
      <Radio
        checked={selected}
        className="periodicity-card__radio"
        data-testid={`${testid}-radio`}
        aria-hidden={true}
      />
    </Toggle>
  )
}
