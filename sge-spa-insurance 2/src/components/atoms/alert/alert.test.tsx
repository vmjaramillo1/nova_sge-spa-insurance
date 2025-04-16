import { render, screen } from '@testing-library/react'
import Alert, { AlertProps } from './alert'

describe('<Alert />', () => {
  it('should be render', () => {
    render(<Alert>My custom text</Alert>)

    const element = screen.getByText('My custom text')

    expect(element).toBeDefined()
  })

  it('should be render with many types', () => {
    let variant: AlertProps['type'] = 'success'

    const result = render(<Alert type={variant}>My custom text</Alert>)

    const element = screen.getByRole('alert')
    expect(element).toHaveClass(`alert--${variant}`)

    variant = 'error'
    result.rerender(<Alert type={variant}>My custom text</Alert>)
    expect(element).toHaveClass(`alert--${variant}`)

    variant = 'warning'
    result.rerender(<Alert type={variant}>My custom text</Alert>)
    expect(element).toHaveClass(`alert--${variant}`)
  })

  it('should be render with icon', () => {
    render(<Alert icon={<div data-testid="test-icon" />}>My custom text</Alert>)

    const elementRoot = screen.getByRole('alert')
    const elementIcon = screen.getByTestId('test-icon')

    expect(elementRoot).toContainElement(elementIcon)
    expect(elementRoot).toHaveClass('alert--icon')
    expect(elementIcon).toBeDefined()
  })
})
