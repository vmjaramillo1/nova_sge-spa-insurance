import { fireEvent, render, screen } from '@testing-library/react'
import Button from './button'

describe('Button', () => {
  it('should display inner text', () => {
    render(<Button>Hazme click</Button>)

    const buttonEl = screen.getByRole('button')

    expect(buttonEl).toBeDefined()
    expect(buttonEl).toHaveTextContent('Hazme click')
  })

  it('should trigger the click', () => {
    const onClick = jest.fn()

    render(<Button onClick={onClick}>Hazme click</Button>)

    const buttonEl = screen.getByRole('button')

    expect(onClick).toBeCalledTimes(0)
    fireEvent.click(buttonEl)
    expect(onClick).toHaveBeenCalled()
  })

  it('should be disabled', () => {
    render(<Button disabled>Hazme click</Button>)

    const buttonEl = screen.getByRole('button')

    expect(buttonEl).toBeDisabled()
  })

  it('should have a custom class', () => {
    render(<Button className="custom-class">Hazme click</Button>)

    const buttonEl = screen.getByRole('button')

    expect(buttonEl).toHaveClass('custom-class')
  })

  it('should render loading', () => {
    let isLoading = true

    const { rerender } = render(<Button loading>Hazme click</Button>)
    const buttonEl = screen.getByRole('button')
    expect(buttonEl).toMatchSnapshot()

    isLoading = false

    rerender(<Button loading={isLoading}>Hazme click</Button>)
    expect(buttonEl).toHaveTextContent('Hazme click')
  })
})
