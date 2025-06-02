import { render, screen } from '@testing-library/react'
import ModalAccount from './modal-account'
import { configureStore } from '@reduxjs/toolkit'
import { Provider } from 'react-redux'
import { fireEvent } from '@testing-library/react'
import { createSlice } from '@reduxjs/toolkit'

const initialState = {
  shared: {
    accountHashSelected: '123456',
  },
}

const flowSlice = createSlice({
  name: 'flow',
  initialState,
  reducers: {
    setSelectedAccount(state, action) {
      state.shared.accountHashSelected = action.payload
    },
  },
})

describe('<ModalAccount />', () => {
  const mockAppReducer = () => ({
    accounts: {
      0: {
        hash: '123456',
        type: 'CHECKING_ACCOUNT',
        mask: '******2008',
        balance: 2000,
      },
      1: {
        hash: '345678',
        type: 'CHECKING_ACCOUNT',
        mask: '******2228',
        balance: 100,
      },
      2: {
        hash: '344558',
        type: 'DEFAULT_CARD',
        mask: '5555555555554444',
        balance: 1111,
      },
    },
  })

  const store = configureStore({
    reducer: {
      flow: flowSlice.reducer,
      app: mockAppReducer,
    },
  })

  it('should render', () => {
    const { getByText } = render(
      <Provider store={store}>
        <ModalAccount handleClose={() => console.log('close')} />
      </Provider>
    )

    expect(getByText('Cuenta a debitar')).toBeInTheDocument()
    expect(getByText('Tarjeta a debitar')).toBeInTheDocument()
  })

  it('should change to selected account', () => {
    render(
      <Provider store={store}>
        <ModalAccount handleClose={() => console.log('close')} />
      </Provider>
    )

    const button = screen.getByTestId('btn-account-row-344558')
    fireEvent.click(button)

    const state = store.getState()
    expect(state.flow.shared.accountHashSelected).toBe('344558')
  })
})
