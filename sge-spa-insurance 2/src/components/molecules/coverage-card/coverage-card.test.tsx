import { render, screen } from '@testing-library/react'
import CoverageCard from './coverage-card'

describe('<CoverageCard />', () => {
  it('should render base', () => {
    const { baseElement } = render(<CoverageCard icon={null} title="Test" />)
    expect(baseElement).toBeInTheDocument()
  })

  it('should render with title', () => {
    render(<CoverageCard icon={null} title="Test" />)

    const coverageCardEl = screen.getByText('Test')
    expect(coverageCardEl).toBeInTheDocument()
  })

  it('should render with icon', () => {
    render(<CoverageCard icon={<div>Icon Test</div>} title="Test" />)

    const coverageCardEl = screen.getByText('Icon Test')
    expect(coverageCardEl).toBeInTheDocument()
  })

  it('should render with children', () => {
    render(
      <CoverageCard icon={null} title="Title test">
        Content Test
      </CoverageCard>
    )

    const coverageCardEl = screen.getByText('Content Test')
    expect(coverageCardEl).toBeInTheDocument()
  })

  it('should render with custom classes', () => {
    render(
      <CoverageCard
        icon={null}
        title="Title test"
        classes={{
          root: 'root-test',
          title: 'title-test',
          description: 'description-test'
        }}
      >
        Content test
      </CoverageCard>
    )

    const coverageCardRootEl = screen.getByRole('presentation')
    expect(coverageCardRootEl).toHaveClass('root-test')

    const titleEl = screen.getByText('Title test')
    expect(titleEl).toHaveClass('title-test')

    const contentEl = screen.getByText('Content test')
    expect(contentEl).toHaveClass('description-test')
  })
})
