import { render, screen } from '@testing-library/react'
import AppTitle from './app-title'

describe('<AppTitle />', () => {
  it('should render the component', () => {
    render(<AppTitle>Mi Text</AppTitle>)

    const titleEl = screen.getByText('Mi Text')

    expect(titleEl).toBeInTheDocument()
  })

  it('should render the component with success icon', () => {
    render(<AppTitle isSuccess>Mi Text</AppTitle>)

    const titleEl = screen.getByRole('img', {
      hidden: true,
    })
    const titleTextEl = screen.queryByText('Mi Text')

    expect(titleEl).toBeInTheDocument()
    expect(titleTextEl).toBeNull()
  })
})
