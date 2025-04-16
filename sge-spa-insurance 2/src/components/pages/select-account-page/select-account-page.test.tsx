import { render, screen } from '@testing-library/react'
import SelectAccountPage from './select-account-page'
import { createWrapper } from '@app/__test__/wrappers'

describe('<SelectAccountPage />', () => {
  it('should render', () => {
    const wrapper = createWrapper()

    const { baseElement } = render(<SelectAccountPage />, { wrapper })

    expect(baseElement).toMatchSnapshot()
  })

  it('should render with accounts', () => {
    const wrapper = createWrapper({
      app: {
        accounts: [
          {
            hash: '21123412034ser234qwe13r13r0212008',
            mask: '******2008',
            type: 'CHECKING_ACCOUNT',
            balance: 2000,
            alias: 'PRINCIPAL',
            favorite: true,
            value: '67as45d756as45d6574as675d',
          },
          {
            hash: '220402p3o4i2i3o4yh23iu4y23p4o12348092',
            mask: '******8092',
            type: 'SAVINGS_ACCOUNT',
            balance: 800,
            alias: null,
            favorite: false,
            value: '6453a65sd5a7sd6asd',
          },
        ],
      },
    })

    render(<SelectAccountPage />, { wrapper })

    const buttonsElements = screen.getAllByRole('button')

    expect(buttonsElements.length).toBe(2)
  })
})
