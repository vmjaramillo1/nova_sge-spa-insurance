import { render, screen } from '@testing-library/react'
import Toggle from './toggle'

describe('<Toggle />', () => {
  it('should render', () => {
    render(<Toggle value="1">My content</Toggle>)

    expect(screen.getByRole('button', { name: /My content/ })).toBeInTheDocument()
  })

  it('should render unselected for default', () => {
    const { baseElement } = render(<Toggle value="1">My content</Toggle>)

    expect(baseElement).toMatchSnapshot()
  })

  it('should render selected', () => {
    const { baseElement } = render(
      <Toggle value="1" selected>
        My content
      </Toggle>
    )

    expect(baseElement).toMatchSnapshot()
  })

  it('should call onClick', () => {
    const onClick = jest.fn()
    render(
      <Toggle value="1" onClick={onClick}>
        My content
      </Toggle>
    )

    screen.getByRole('button').click()
    expect(onClick).toHaveBeenCalled()
  })

  it('should render with custom aria-label', () => {
    render(
      <Toggle value="1" aria-label="My aria label">
        My content
      </Toggle>
    )

    expect(screen.getByRole('button').getAttribute('aria-label')).toBe(
      'My aria label'
    )
  })
})
