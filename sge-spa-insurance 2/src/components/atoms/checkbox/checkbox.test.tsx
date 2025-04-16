import { fireEvent, render, screen } from '@testing-library/react'
import CheckBox from './checkbox'

describe('<Checkbox />', () => {
  it('should render base', () => {
    render(<CheckBox />)

    const checkboxEl = screen.getByRole('checkbox')
    expect(checkboxEl).toBeInTheDocument()
  })

  it('should render checked', () => {
    render(<CheckBox checked />)

    const checkboxEl = screen.getByRole('checkbox')
    expect(checkboxEl).toBeChecked()
  })

  it('should render with className', () => {
    render(<CheckBox className="test" />)

    const checkboxEl = screen.getByRole('checkbox')
    expect(checkboxEl?.classList.contains('test')).toBe(true)
  })

  it('should render unchecked', () => {
    render(<CheckBox />)

    const checkboxEl = screen.getByRole('checkbox')
    expect(checkboxEl).not.toBeChecked()
  })

  it('should call change onClick', () => {
    const onChange = jest.fn()
    render(<CheckBox onChange={onChange} />)

    const checkboxEl = screen.getByRole('checkbox')

    fireEvent.click(checkboxEl)
    expect(onChange).toBeCalledWith(true)

    fireEvent.click(checkboxEl)
    expect(onChange).toBeCalledWith(false)
    expect(onChange).toBeCalledTimes(2)
  })
})
