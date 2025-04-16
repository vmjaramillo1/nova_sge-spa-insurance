import { fireEvent, render, screen } from '@testing-library/react'
import Header from './header'

describe('<Header />', () => {
  it('should render', () => {
    const title = 'Mi banca protegida'

    render(<Header>{title}</Header>)

    const headerEl = screen.getByText(title)

    expect(headerEl).toBeInTheDocument()
  })

  it('should render with back button', () => {
    const spyDispatch = jest.spyOn(document, 'dispatchEvent')

    render(<Header />)

    const backButtonEl = screen.getByRole('button')

    expect(backButtonEl).toBeInTheDocument()

    fireEvent.click(backButtonEl)

    expect(spyDispatch).toHaveBeenCalledTimes(1)
  })
})
