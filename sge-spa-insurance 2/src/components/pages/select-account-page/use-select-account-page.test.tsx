import { renderHook } from '@testing-library/react'
import { createWrapper } from '@app/__test__/wrappers'
import useSelectAccountPage from './use-select-account-page'

jest.mock('react-router-dom', () => ({
  ...jest.requireActual('react-router-dom'),
  useNavigate: jest.fn(),
}))

describe('useSelectAccountPage', () => {
  it('should return default', () => {
    const wrapper = createWrapper({
      app: {
        accounts: [],
        portal: {
          selectAccount: {},
        },
      },
    })

    const { result } = renderHook(() => useSelectAccountPage(), { wrapper })

    expect(result.current.accounts).toBeInstanceOf(Array)
    expect(result.current.accountHashSelected).toBe('')
    expect(result.current.content).toEqual({})
    expect(result.current.handleSelect).toBeInstanceOf(Function)
  })

  it('should return accounts', () => {
    const wrapper = createWrapper({
      app: {
        accounts: [
          {
            hash: '42e976aea883be9ad3b29487ab3d1a64778bdbfbac9d02f30941d30600b76585',
            mask: '******2008',
            balance: 2000,
            type: 'CHECKING_ACCOUNT',
            alias: 'PRINCIPAL',
            favorite: true,
            value: 'das452d5asd7as6d',
          },
          {
            hash: 'abf0a7dad05cfe2f3fd9a98ca0fcd93458143b692970cfcabdcf938d06a9f9fc',
            mask: '******8092',
            balance: 800,
            type: 'SAVINGS_ACCOUNT',
            alias: null,
            favorite: false,
            value: 'a56sd3as65d7as6d4as',
          },
        ],
      },
    })

    const { result } = renderHook(() => useSelectAccountPage(), { wrapper })

    const [firstAccount] = result.current.accounts

    expect(firstAccount.hash).toBe(
      '42e976aea883be9ad3b29487ab3d1a64778bdbfbac9d02f30941d30600b76585'
    )
    expect(firstAccount.mask).toBe('******2008')
    expect(firstAccount.balance).toBe(2000)
    expect(firstAccount.type).toBe('CHECKING_ACCOUNT')
    expect(firstAccount.label).toBe('PRINCIPAL')
  })

  it('should return accountHashSelected', () => {
    const wrapper = createWrapper({
      app: {
        accounts: [
          {
            hash: '42e976aea883be9ad3b29487ab3d1a64778bdbfbac9d02f30941d30600b76585',
            mask: '******2008',
            balance: 2000,
            type: 'CHECKING_ACCOUNT',
            alias: 'PRINCIPAL',
            favorite: true,
            value: 'as5d342a4sd6576',
          },
          {
            hash: 'abf0a7dad05cfe2f3fd9a98ca0fcd93458143b692970cfcabdcf938d06a9f9fc',
            mask: '******8092',
            balance: 800,
            type: 'SAVINGS_ACCOUNT',
            alias: null,
            favorite: false,
            value: 'a6sd5a7sd67a98sd',
          },
        ],
      },
      flow: {
        accountHashSelected:
          '42e976aea883be9ad3b29487ab3d1a64778bdbfbac9d02f30941d30600b76585',
      },
    })

    const { result } = renderHook(() => useSelectAccountPage(), { wrapper })

    expect(result.current.accountHashSelected).toBe(
      '42e976aea883be9ad3b29487ab3d1a64778bdbfbac9d02f30941d30600b76585'
    )
  })

  it('should return content', () => {
    const wrapper = createWrapper({
      app: {
        portal: {
          selectAccount: {
            title: 'Select an account',
            subtitle: 'Select an account to make the transfer',
            button: 'Continue',
          },
        },
      },
    })

    const { result } = renderHook(() => useSelectAccountPage(), { wrapper })

    expect(result.current.content).toEqual({
      title: 'Select an account',
      subtitle: 'Select an account to make the transfer',
      button: 'Continue',
    })
  })
})
