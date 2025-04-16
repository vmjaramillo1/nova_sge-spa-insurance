import { renderHook } from '@testing-library/react'
import useAcceptance from './use-acceptance'
import { createWrapper } from '@app/__test__/wrappers'
import { act } from 'react-dom/test-utils'
import InsuranceService from '@app/services/insurance/insurance.service'
import { InvalidBodyError } from '@app/utils/classes'

describe('useAcceptance', () => {
  it('should return function', () => {
    const wrapper = createWrapper()

    const { result } = renderHook(() => useAcceptance(), { wrapper })

    expect(result.current).toBeInstanceOf(Function)
  })

  it('should reject promise if has missing values', async () => {
    const wrapper = createWrapper() // missing values key, transactionReference, currentAccount

    const { result } = renderHook(() => useAcceptance(), { wrapper })

    await expect(() => result.current('3434654')).rejects.toThrow(InvalidBodyError)
  })

  it('should called InsuranceService.processTransaction', () => {
    const spyProcessTransaction = jest.spyOn(InsuranceService, 'processTransaction')

    const wrapper = createWrapper({
      app: {
        code: 'TU_BAN_PRO',
        plans: {
          TU_BAN_PRO: {
            name: 'TU BAN PRO',
            paymentMethodOptions: {
              MONTHLY: {
                name: 'Mensual',
                order: 1,
                description: 'Mensual',
              },
            },
            periodicityOptions: {
              MONTHLY: {
                name: 'Mensual',
                description: 'Mensual',
                factor: 1,
                order: 1,
                price: '3.99',
                taxes: '0.8',
                totalPrice: '4.79',
              },
            },
            coverages: {},
          },
        },
        accounts: [
          {
            hash: '00x1',
            mask: '*******3424',
            alias: 'PRINCIPAL',
            balance: 5467,
            type: 'SAVINGS_ACCOUNT',
            favorite: true,
            value: 'q5w6eq3weq4eq4w',
          },
        ],
      },
      flow: {
        key: 'test',
        transactionReference: 'test',
        accountHashSelected: '00x1',
        planSelected: 'TU_BAN_PRO',
        periodicitySelected: 'MONTHLY',
      },
      global: {
        authEvent: {
          channel: 'WEB',
          cif: '1718137154001',
          clientId: '1718137154001',
          clientIdType: '0001',
          deeplink: 'https://www.pichincha.com/',
          device: 'WEB',
          guid: '123456789',
          ip: '',
          os: 'ios',
          jwtToken: '123456789',
          screenWidth: '1920',
          session: '123456789',
          xsrf: '123456789',
        },
      },
    })

    const { result } = renderHook(() => useAcceptance(), { wrapper })

    act(() => {
      result.current('3434654')
    })

    expect(spyProcessTransaction).toBeCalledWith({
      key: 'test',
      transactionReference: 'test',
      acceptanceReference: '3434654',
      accountType: 'SAVINGS_ACCOUNT',
      accountValue: 'q5w6eq3weq4eq4w',
      identity: {
        cif: '1718137154001',
        dni: '1718137154001',
        dniType: '0001',
      },
      paymentMethodCode: 'MONTHLY',
      paymentPeriodicityCode: 'MONTHLY',
      planCode: 'TU_BAN_PRO',
      productCode: 'TU_BAN_PRO',
    })
  })
})
