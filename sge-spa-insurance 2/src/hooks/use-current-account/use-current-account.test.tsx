import { renderHook } from '@testing-library/react'
import { createWrapper } from '@app/__test__/wrappers'
import useCurrentAccount from './use-current-account'

describe('useCurrentAccount', () => {
  it('should return null when no accounts', () => {
    const wrapper = createWrapper({
      app: { accounts: [] },
      flow: { accountHashSelected: '' },
    })

    const { result } = renderHook(() => useCurrentAccount(), { wrapper })

    expect(result.current).toBeNull()
  })

  it('should return current account', () => {
    const wrapper = createWrapper({
      app: {
        accounts: [
          {
            hash: '0x002351234',
            mask: '22XXXX54',
            type: 'SAVINGS_ACCOUNT',
            balance: 300,
            alias: 'PRINCIPAL',
            favorite: true,
            value: '232423423412e312ae3e123',
          },
          {
            hash: '0x01',
            mask: '12XXXX12',
            type: 'CHECKING_ACCOUNT',
            balance: 800,
            alias: null,
            favorite: false,
            value: '232423423412e312ae3e134234254aea254ae3',
          },
        ],
      },
      flow: {
        accountHashSelected: '0x01',
      },
    })

    const { result } = renderHook(() => useCurrentAccount(), { wrapper })

    expect(result.current).toEqual({
      accountHash: '0x01',
      description: '12XXXX12',
      type: 'CHECKING_ACCOUNT',
      alias: null,
      amount: 800,
      label: 'Corriente',
      value: '232423423412e312ae3e134234254aea254ae3',
      mask: '12XXXX12',
    })
  })

  it('should return alias in label', () => {
    const wrapper = createWrapper({
      app: {
        accounts: [
          {
            hash: '0x00',
            mask: '27XXXX57',
            type: 'SAVINGS_ACCOUNT',
            balance: 2000,
            alias: 'PRINCIPAL',
            favorite: true,
            value: '525a356sd2a5642',
          },
          {
            hash: '0x01',
            mask: '22XXXX22',
            type: 'SAVINGS_ACCOUNT',
            balance: 400,
            alias: 'OTHER',
            favorite: false,
            value: '65a3sd6a5sd36a5sd',
          },
          {
            hash: '0x01234sf2',
            mask: '23XXXX29',
            type: 'CHECKING_ACCOUNT',
            balance: 150,
            alias: null,
            favorite: false,
            value: 'as7d865as78d6a8s7d',
          },
        ],
      },
      flow: {
        accountHashSelected: '0x00',
      },
    })

    const { result } = renderHook(() => useCurrentAccount(), { wrapper })

    expect(result.current).toEqual({
      accountHash: '0x00',
      description: '27XXXX57',
      alias: 'PRINCIPAL',
      type: 'SAVINGS_ACCOUNT',
      amount: 2000,
      label: 'PRINCIPAL',
      value: '525a356sd2a5642',
      mask: '27XXXX57',
    })
  })

  it('should return null when accountHash not in accounts', () => {
    const wrapper = createWrapper({
      app: {
        accounts: [
          {
            hash: '0x02342e41a0',
            mask: '53XXXX57',
            type: 'SAVINGS_ACCOUNT',
            balance: 350,
            alias: 'PRINCIPAL',
            favorite: true,
            value: 'asd647a7sda4sd7',
          },
          {
            hash: '0x01',
            mask: '12XXXX12',
            type: 'CHECKING_ACCOUNT',
            balance: 7000,
            alias: null,
            favorite: true,
            value: 'asd87a6s73d6a5s5d89as',
          },
        ],
      },
      flow: {
        accountHashSelected: 'RANDOM',
      },
    })

    const { result } = renderHook(() => useCurrentAccount(), { wrapper })

    expect(result.current).toBeNull()
  })
})
