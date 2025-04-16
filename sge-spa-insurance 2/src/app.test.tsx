import { render, screen } from '@testing-library/react'
import App from './app'

jest.mock('@pichincha/events-microsite')

describe('<App />', () => {
  it('should render successfully', () => {
    render(<App />)

    const screenEl = screen.getByTestId('webviews-app')

    expect(screenEl).toBeDefined()
  })
})
