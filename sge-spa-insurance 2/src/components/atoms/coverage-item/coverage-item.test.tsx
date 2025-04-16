import { render, screen } from '@testing-library/react'
import CoverageItem from './coverage-item'

describe('<CoverageItem />', () => {
  it('should render', () => {
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
})
