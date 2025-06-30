import { fireEvent, render, screen } from '@testing-library/react'
import AccountRow from './account-row'
import { act } from 'react-dom/test-utils'

describe('<AccountRow />', () => {
  it('should be render', () => {
    render(
      <AccountRow
        value="3123123123"
        label="My custom label"
        description="My custom description"
        amount="My custom value"
      />
    )

    const accountRowLabelEl = screen.getByText('My custom label')
    const accountRowDescriptionEl = screen.getByText('My custom description')
    const accountRowValueEl = screen.getByText('My custom value')
    const actionableEl = screen.queryByText('Desde')

    expect(accountRowLabelEl).toBeInTheDocument()
    expect(accountRowDescriptionEl).toBeInTheDocument()
    expect(accountRowValueEl).toBeInTheDocument()
    expect(actionableEl).toBeNull()
  })

  it('should be show selected', () => {
    render(
      <AccountRow
        value="3451252354"
        label="My custom label"
        description="My custom description"
        amount="My custom value"
        groupSelected={true}
        selected={true}
      />
    )

    const actionableContentEl = screen.getByTestId('checked-icon')
    expect(actionableContentEl).toBeInTheDocument()
  })

  it('should be show selected style', () => {
    render(
      <AccountRow
        value="3451252354"
        label="My custom label"
        description="My custom description"
        amount="My custom value"
        groupSelected={true}
        selected={true}
      />
    )

    const accountRowEl = screen.getByRole('button')
    expect(accountRowEl).toHaveClass('account-row--selected')
  })

  it('should be show disabled style', () => {
    render(
      <AccountRow
        value="3451252354"
        label="My custom label"
        description="My custom description"
        amount="My custom value"
        disabled={true}
      />
    )

    const accountRowEl = screen.getByRole('button')
    expect(accountRowEl).toHaveClass('account-row--disabled')
  })

  it('should be call onClick', () => {
    const onClick = jest.fn()
    render(
      <AccountRow
        value="4574658345t234"
        label="My custom label"
        description="My custom description"
        amount="My custom value"
        onClick={onClick}
      />
    )

    const accountRowEl = screen.getByRole('button')

    act(() => {
      fireEvent.click(accountRowEl)
    })

    expect(onClick).toHaveBeenCalled()
  })
})
