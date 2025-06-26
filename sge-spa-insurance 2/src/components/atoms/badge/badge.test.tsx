import { render, screen } from '@testing-library/react'
import Badge from './badge'

describe('<Badge />', () => {
  it('should render success', () => {
    render(<Badge type="success">content</Badge>)

    const element = screen.getByText('check_circle')
    expect(element).toBeInTheDocument()
  })

  it('should render error', () => {
    render(<Badge type="error">content</Badge>)

    const element = screen.getByText('error')
    expect(element).toBeInTheDocument()
  })

  it('should render warning', () => {
    render(<Badge type="warning">content</Badge>)

    const element = screen.getByText('info')
    expect(element).toBeInTheDocument()
  })

  it('should change info', () => {
    render(<Badge type="info">content</Badge>)
    const element = screen.getByText('info')
    expect(element).toBeInTheDocument()
  })

  it('should render content', () => {
    render(<Badge type="success">content</Badge>)

    const element = screen.getByText('content')
    expect(element).toBeInTheDocument()
  })
})
