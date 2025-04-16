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
    viewBox="0 0 21 20"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
  >
    <rect x="1.00391" y="0.5" width="19" height="19" rx="9.5" fill="white" />
    <rect x="1.00391" y="0.5" width="19" height="19" rx="9.5" stroke="#6E6E73" />
  </svg>
)

const RadioChecked = () => (
  <svg
    width="20"
    height="20"
    viewBox="0 0 20 20"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
  >
    <rect width="20" height="20" rx="10" fill="#2F7ABF" />
    <rect
      x="5.83331"
      y="5.83325"
      width="8.33333"
      height="8.33333"
      rx="4.16667"
      fill="white"
    />
  </svg>
)
