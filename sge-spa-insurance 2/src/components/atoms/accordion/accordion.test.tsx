import { render, screen } from '@testing-library/react'
import Accordion from './accordion'

describe('<Accordion />', () => {
  it('should be render', () => {
    render(
      <Accordion title="My custom title" dataTestId="accordion">
        <div>content</div>
      </Accordion>
    )

    const accordionEl = screen.getByTestId('accordion')

    expect(accordionEl).toBeInTheDocument()
  })

  it('should render title', () => {
    render(
      <Accordion title="My custom title">
        <div>content</div>
      </Accordion>
    )

    const titleEl = screen.getByText('My custom title')

    expect(titleEl).toBeInTheDocument()
  })

  it('should render content', () => {
    render(
      <Accordion title="My custom title" active>
        <div>content</div>
      </Accordion>
    )

    const contentEl = screen.getByText('content')

    expect(contentEl).toBeInTheDocument()
  })

  it('should change called', () => {
    const onChange = jest.fn()

    render(
      <Accordion title="My custom title" value="value" onChange={onChange}>
        <div>content</div>
      </Accordion>
    )

    const titleEl = screen.getByText('My custom title')

    titleEl.click()

    expect(onChange).toBeCalledWith('value')
  })

  it('should not change called', () => {
    const onChange = jest.fn()

    render(
      <Accordion title="My custom title">
        <div>content</div>
      </Accordion>
    )

    const titleEl = screen.getByText('My custom title')

    titleEl.click()

    expect(onChange).not.toBeCalled()
  })
})
