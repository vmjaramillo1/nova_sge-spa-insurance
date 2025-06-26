import { fireEvent, render, screen } from '@testing-library/react'
import PreviousProductCard, { StatusType } from './previous-product-card'

import { createWrapperStore, makeStore } from '@app/__test__/wrappers'
import { flowValues, globalValues, appValues } from '@app/__test__/values'

const store = makeStore({
  app: appValues,
  flow: flowValues,
  global: globalValues,
})

const wrapper = createWrapperStore(store)

describe('<PreviousProductCard />', () => {
  const CONTENT = {
    title: {
      value: 'Previous Product Title',
      aria: 'Previous Product Title',
    },
    account: {
      value: 'Account',
      aria: 'Account',
    },
    nextPayment: {
      value: '0',
      aria: 'Next Payment',
      text: 'Next Payment',
    },
    amount: {
      value: '12',
      aria: 'Amount',
      text: 'Amount',
    },
    action: {
      value: 'Action',
      aria: 'Action',
      text: 'Action',
    },
    handleClick: () => console.log('Clicked Previous Product'),
  }

  it('should render status whit status success', () => {
    const CONTENT_WITH_STATUS = {
      ...CONTENT,
      status: 'success' as StatusType,
    }

    render(<PreviousProductCard {...CONTENT_WITH_STATUS} />, {
      wrapper: wrapper,
    })

    const element = screen.getByText('check_circle')
    expect(element).toBeInTheDocument()
  })

  it('should render title/account/nextPayment/amount', () => {
    render(<PreviousProductCard {...CONTENT} />, {
      wrapper: wrapper,
    })

    const elementTitle = screen.getByText('Previous Product Title')
    const elementAccount = screen.getByText('Account')
    const elementNextPaymentText = screen.getByText('Next Payment')
    const elementNextPaymentValue = screen.getByText('0')
    const elementAmountText = screen.getByText('Amount')
    const elementAmountValue = screen.getByText('12')
    const elementAction = screen.getByText('Action')

    expect(elementTitle).toBeInTheDocument()
    expect(elementAccount).toBeInTheDocument()
    expect(elementNextPaymentText).toBeInTheDocument()
    expect(elementNextPaymentValue).toBeInTheDocument()
    expect(elementAmountText).toBeInTheDocument()
    expect(elementAmountValue).toBeInTheDocument()
    expect(elementAction).toBeInTheDocument()
  })

  it('should trigger the click', () => {
    const onClick = jest.fn()

    const CONTENT_WITH_CLICK = {
      ...CONTENT,
      handleClick: onClick,
    }

    render(<PreviousProductCard {...CONTENT_WITH_CLICK} />, {
      wrapper: wrapper,
    })

    const element = screen.getByRole('button')

    expect(onClick).toBeCalledTimes(0)
    fireEvent.click(element)
    expect(onClick).toHaveBeenCalled()
  })
})
