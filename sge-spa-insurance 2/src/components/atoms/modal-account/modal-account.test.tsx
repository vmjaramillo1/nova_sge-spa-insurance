import { render, screen } from '@testing-library/react'
import ModalAccount from './modal-account'
import { Provider } from 'react-redux'
import { fireEvent } from '@testing-library/react'

import { createWrapperStore, makeStore } from '@app/__test__/wrappers'
import { flowValues, globalValues, appValues } from '@app/__test__/values'

const store = makeStore({
  app: appValues,
  flow: flowValues,
  global: globalValues,
})

const wrapper = createWrapperStore(store)

describe('<ModalAccount />', () => {
  const content = {
    title: { value: 'Cuenta a debitar', aria: 'Cuenta a debitar' },
    inputByAccount: { value: 'Cuenta a debitar', aria: 'Cuenta a debitar' },
    inputByCard: { value: 'Tarjeta a debitar', aria: 'Tarjeta a debitar' },
  } 

  it('should render', () => {
    render(
      <ModalAccount content={content} handleClose={() => console.log('close')} />,
      {
        wrapper: wrapper,
      }
    )

    const accounts = screen.getAllByText('Cuenta a debitar')
    const creditCard = screen.getByText('Tarjeta a debitar')

    expect(accounts.length).toBeGreaterThan(0)
    expect(creditCard).toBeInTheDocument()
  })

  it('should change to selected account', () => {
    render(
      <Provider store={store}>
        <ModalAccount content={content} handleClose={() => console.log('close')} />
      </Provider>
    )

    const button = screen.getByTestId(
      'btn-account-row-4f356a5446717258743858436149306c317a2b5653396b74384e67454168735350624e5850775135476e413d'
    )
    fireEvent.click(button)

    const state = store.getState()
    expect(state.flow.shared.accountHashSelected).toBe(
      '4f356a5446717258743858436149306c317a2b5653396b74384e67454168735350624e5850775135476e413d'
    )
  })
})
