import { fireEvent, render, screen } from '@testing-library/react'
import ActionButton from './action-button'

describe('<ActionButton />', () => {
  it('should render correctly', () => {
    render(<ActionButton icon={<span>Icon</span>}>Content</ActionButton>)
    const contentEl = screen.getByText('Content')
    const iconEl = screen.getByText('Icon')

    expect(contentEl).toBeInTheDocument()
    expect(iconEl).toBeInTheDocument()
  })

  it('should call onClick', () => {
    const onClick = jest.fn()
    render(
      <ActionButton icon={null} onClick={onClick}>
        Content
      </ActionButton>
    )
    const contentEl = screen.getByText('Content')

    fireEvent.click(contentEl)

    expect(onClick).toHaveBeenCalledTimes(1)
  })
})
