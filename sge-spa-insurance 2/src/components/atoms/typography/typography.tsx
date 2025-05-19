import {
  FC,
  HTMLAttributes,
  memo,
  PropsWithChildren,
  AnchorHTMLAttributes,
} from 'react'

import clsx from 'clsx'

type TypographyVariants =
  | 'hero'
  | 'headline1'
  | 'headline2'
  | 'headline3'
  | 'title'
  | 'subtitle'
  | 'body'
  | 'caption'
  | 'legal'
  | 'amount'
  | 'amountSmall'
  | 'button'
  | 'buttonSmall'

const componentByVariant: Record<TypographyVariants, keyof JSX.IntrinsicElements> = {
  hero: 'p',
  headline1: 'h1',
  headline2: 'h2',
  headline3: 'h3',
  title: 'h1',
  subtitle: 'h2',
  body: 'p',
  caption: 'p',
  legal: 'p',
  amount: 'span',
  amountSmall: 'span',
  button: 'span',
  buttonSmall: 'span',
}

export interface TypographyProps extends HTMLAttributes<HTMLElement> {
  as?: keyof JSX.IntrinsicElements
  variant?: TypographyVariants
  className?: string
  onClick?: () => void
}

const Typography: FC<PropsWithChildren<TypographyProps>> = ({
  children,
  className,
  onClick,
  variant = 'body',
  as,
  ...restProps
}) => {
  const Component = as ?? componentByVariant[variant]

  if (Component === 'a') {
    ;(restProps as AnchorHTMLAttributes<HTMLAnchorElement>).href = '#'
  }

  return (
    <Component
      onClick={onClick}
      className={clsx(`text-${variant}`, className)}
      {...restProps}
    >
      {children}
    </Component>
  )
}

export default memo(Typography)
