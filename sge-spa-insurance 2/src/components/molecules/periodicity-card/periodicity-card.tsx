import Radio from '@app/components/atoms/radio/radio'
import Toggle from '@app/components/atoms/toggle/toggle'
import Typography from '@app/components/atoms/typography'

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
  } = props

  const handleClick = (_event: unknown, code: string) => {
    onClick?.(code)
  }

  return (
    <Toggle
      className="periodicity-card"
      selected={selected}
      value={value}
      onClick={handleClick}
    >
      {badge && <div className="periodicity-card__badge">{badge}</div>}
      <Typography variant="body" className="font-medium">
        {name}
      </Typography>
      <Typography variant="amountSmall" className="font-semibold">
        {price}{' '}
      </Typography>
      {additional && (
        <Typography variant="caption" className="font-semibold">
          Antes <span className="periodicity-card__through">{additional}</span>
        </Typography>
      )}
      <Typography variant="caption">Incluye impuestos</Typography>
      <Radio
        checked={selected}
        className="periodicity-card__radio"
        data-testid={`${testid}-radio`}
      />
    </Toggle>
  )
}
