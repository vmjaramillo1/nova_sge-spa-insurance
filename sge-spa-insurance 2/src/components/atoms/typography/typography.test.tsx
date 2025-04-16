import { act, fireEvent, render, screen } from '@testing-library/react'
import Typography from './typography'

describe('<Typography />', () => {
  it('should be render', () => {
    render(<Typography>My custom text</Typography>)
    const element = screen.getByText('My custom text')
    expect(element).toHaveClass('text-body')
  })

  it('should be render with custom class', () => {
    render(<Typography className="custom-class">My custom text</Typography>)
    const element = screen.getByText('My custom text')
    expect(element).toHaveClass('custom-class')
  })

  it('should be render with custom tag', () => {
    render(<Typography as="h1">Main title</Typography>)
    const element = screen.getByText('Main title')
    expect(element.tagName.toLowerCase()).toBe('h1')
  })

  it('should be render with variant', () => {
    const variant = 'headline2'
    render(<Typography variant={variant}>Content</Typography>)
    const element = screen.getByText('Content')
    expect(element).toHaveClass(`text-${variant}`)
  })

  it('should be click', () => {
    const handleClick = jest.fn()
    render(<Typography onClick={handleClick}>Content</Typography>)

    const element = screen.getByText('Content')

    act(() => {
      fireEvent.click(element)
    })

    expect(handleClick).toHaveBeenCalled()
  })

  it('should have href if as is anchor', () => {
    render(<Typography as="a">Content</Typography>)

    const element = screen.getByText('Content')

    expect(element.tagName.toLowerCase()).toBe('a')
    expect(element).toHaveAttribute('href', '#')
  })
})
