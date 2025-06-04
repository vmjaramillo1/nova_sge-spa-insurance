import { render, screen } from '@testing-library/react'
import SmartContent, { smartText } from '@app/components/atoms/smart-text'
import Typography from '@app/components/atoms/typography'

import { APP_ROUTES } from '@app/routes/config'

jest.mock('react-router-dom', () => ({
  ...jest.requireActual('react-router-dom'),
  useNavigate: jest.fn(),
}))

describe('<SmartContent />', () => {
  it('should render normal content', () => {
    const test = 'Test de data'

    render(<SmartContent>{test}</SmartContent>)

    const textData = screen.getByText("Test de data")

    expect(textData).toBeInTheDocument()
  })

  it('should render h1 content', () => {
    const test = '<H1>Test de data<H1>'

    render(<SmartContent>{test}</SmartContent>)

    const heading = screen.getByRole('heading', { level: 1 })
    expect(heading).toBeInTheDocument()
  })

  it('should render context data content', () => {
    const test = 'Test de data'

    render(<SmartContent>{test}</SmartContent>)

    const cardEl = screen.getByTestId('coverage-1')

    expect(cardEl).toBeInTheDocument()
  })

  it('should render format data', () => {
    const test = 'Test de data'

    render(<SmartContent>{test}</SmartContent>)

    const cardEl = screen.getByTestId('coverage-1')

    expect(cardEl).toBeInTheDocument()
  })

   it('should render context format data', () => {
    const test = 'Test de data'

    render(<SmartContent>{test}</SmartContent>)

    const cardEl = screen.getByTestId('coverage-1')

    expect(cardEl).toBeInTheDocument()
  })

})
