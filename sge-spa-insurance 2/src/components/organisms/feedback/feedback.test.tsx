import { render, screen } from '@testing-library/react'
import FeedBack from './feedback'

describe('<FeedBack />', () => {
  it('should render title', () => {
    render(<FeedBack title="Ah ocurrido un error" />)
    const titleEl = screen.getByText('Ah ocurrido un error')
    expect(titleEl).toBeInTheDocument()
  })

  it('should render children', () => {
    render(<FeedBack title="Test">My content</FeedBack>)
    const contentEl = screen.getByText('My content')
    expect(contentEl).toBeInTheDocument()
  })

  it('should render icon', () => {
    render(<FeedBack title="Test" icon={<span>IconName</span>} />)
    const iconEl = screen.getByText('IconName')
    expect(iconEl).toBeInTheDocument()
  })

  it('should render icon by variant', () => {
    render(<FeedBack title="Test" type="info" />)
    const iconEl = screen.getByRole('img')
    expect(iconEl).toMatchSnapshot()
  })

  it('should render custom title element', () => {
    render(<FeedBack title={<h1>Custom title</h1>} />)
    const titleEl = screen.getByRole('heading')
    expect(titleEl).toBeInTheDocument()
  })
})
