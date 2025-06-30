interface RadioProps {
  checked: boolean
  className?: string
  'data-testid'?: string
}

export default function Radio(props: Readonly<RadioProps>) {
  const { checked, className, 'data-testid': dataTestId } = props

  return (
    <div className={className} data-testid={dataTestId}>
      {checked ? <RadioChecked /> : <RadioBase />}
    </div>
  )
}

const RadioBase = () => (
  <svg
    width="21"
    height="20"
    viewBox="0 0 26 27"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
  >
    <circle cx="13" cy="13.5005" r="9.76316" fill="white" stroke="#B7B7B9"/>
  </svg>
)

const RadioChecked = () => (
  <svg
    width="20"
    height="20"
    viewBox="0 0 26 27"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
  >
    <circle cx="13" cy="13.5005" r="9.76316" fill="white" stroke="#0F265C"/>
    <circle cx="12.9999" cy="13.5004" r="4.78947" fill="#0F265C"/>
  </svg>
)
