import { act, fireEvent, render, screen } from '@testing-library/react'
import StackClose from './stack-close'

describe('<StackClose />', () => {
  it('should render', () => {
    const onClose = jest.fn()
    render(<StackClose onClose={onClose} />)

    const closeEl = screen.getByRole('button')

    expect(closeEl).toBeInTheDocument()
  })

  it('should call onClose', () => {
    const onClose = jest.fn()
    render(<StackClose onClose={onClose} />)

    const buttonEl = screen.getByRole('button')

    act(() => {
      fireEvent.click(buttonEl)
    })

    expect(onClose).toHaveBeenCalled()
  })
})
