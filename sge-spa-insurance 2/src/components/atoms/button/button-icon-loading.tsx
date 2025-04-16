import { ButtonProps } from './button'

type ButtonIconProps = Pick<ButtonProps, 'color'>

const ButtonIconLoading = ({ color }: ButtonIconProps) => {
  const isComplementary = color === 'complementary'

  const backgroundValue = isComplementary ? '#ffffff' : '#0f265c'

  const colorValue = isComplementary
    ? 'rgba(255, 255, 255, 0.1)'
    : 'rgba(15, 38, 92, 0.1)'

  return (
    <pichincha-spinner
      size={16}
      border={4}
      background={backgroundValue}
      color={colorValue}
      role="img"
    ></pichincha-spinner>
  )
}

export default ButtonIconLoading
