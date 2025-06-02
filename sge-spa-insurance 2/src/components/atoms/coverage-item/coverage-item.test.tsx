import { render, screen } from '@testing-library/react'
import CoverageItem from './coverage-item'

describe('<CoverageItem />', () => {
  it('should render complete card', () => {
    render(
      <CoverageItem icon={null} title="Title test" subTitle="Subtitle Test">
        Content Test
      </CoverageItem>
    )

    const titleEl = screen.getByText('Title test')
    const subtitleEl = screen.getByText('Subtitle Test')
    const contentEl = screen.getByText('Content Test')

    expect(titleEl).toBeInTheDocument()
    expect(subtitleEl).toBeInTheDocument()
    expect(contentEl).toBeInTheDocument()
  })

  it('should render only title', () => {
    render(
      <CoverageItem icon={null} title="Title test">
        Content Test
      </CoverageItem>
    )

    const titleEl = screen.getByText('Title test')
    const subTitleEl = screen.queryByText('Subtitle Test')
    const contentEl = screen.getByText('Content Test')

    expect(titleEl).toBeInTheDocument()
    expect(subTitleEl).not.toBeInTheDocument()
    expect(contentEl).toBeInTheDocument()
  })

  it('should render only subTitle', () => {
    render(
      <CoverageItem icon={null} subTitle="Subtitle Test">
        Content Test
      </CoverageItem>
    )

    const titleEl = screen.queryByText('Title test')
    const subtitleEl = screen.getByText('Subtitle Test')
    const contentEl = screen.getByText('Content Test')

    expect(titleEl).not.toBeInTheDocument()
    expect(subtitleEl).toBeInTheDocument()
    expect(contentEl).toBeInTheDocument()
  })

  it('should render only content card', () => {
    render(<CoverageItem icon={null}>Content Test</CoverageItem>)

    const titleEl = screen.queryByText('Title test')
    const subtitleEl = screen.queryByText('Subtitle Test')
    const contentEl = screen.getByText('Content Test')

    expect(titleEl).not.toBeInTheDocument()
    expect(subtitleEl).not.toBeInTheDocument()
    expect(contentEl).toBeInTheDocument()
  })
})
