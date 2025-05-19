import { render, screen, fireEvent } from '@testing-library/react'
import { useNavigate } from 'react-router-dom'
// import SmartContent, { smartText } from './smart-text'
import SmartContent from '@app/components/atoms/smart-text'
import Typography from '@app/components/atoms/typography'

import { APP_ROUTES } from '@app/routes/config'

jest.mock('react-router-dom', () => ({
  ...jest.requireActual('react-router-dom'),
  useNavigate: jest.fn(),
}))

describe('<SmartContent />', () => {
  it('should render content', () => {
    const test = 'Test de data'

    render(<SmartContent>{test}</SmartContent>)

    const cardEl = screen.getByTestId('coverage-1')

    expect(cardEl).toBeInTheDocument()
  })
})
