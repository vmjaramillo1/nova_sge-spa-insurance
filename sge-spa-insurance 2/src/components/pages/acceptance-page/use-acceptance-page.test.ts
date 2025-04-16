import { renderHook } from '@testing-library/react'
import useAcceptancePage from './use-acceptance-page'
import { createWrapper } from '@app/__test__/wrappers'
import { FlowStatus } from '@app/utils/enums'
import { TokenService } from '@pichincha/events-microsite'
import MockAdapter from 'axios-mock-adapter'
import axios from 'axios'
import { useNavigate } from 'react-router-dom'
import { appValues, flowValues } from '@app/__test__/values'

const axiosMock = new MockAdapter(axios)

jest.mock('@pichincha/events-microsite')

jest.mock('react-router-dom', () => ({
  ...jest.requireActual('react-router-dom'),
  useNavigate: jest.fn(),
}))

const useNavigateMock = useNavigate as jest.Mock

const acceptanceDefaultContent = {
  descriptions: {
    aria: '',
    from: '',
    toPay: '',
  },
}

describe('useAcceptancePage', () => {
  it('should be defined', () => {
    const wrapper = createWrapper({
      flow: {
        ...flowValues,
        status: FlowStatus.NORMAL,
        accountHashSelected: '0x0013123',
      },
      app: {
        ...appValues,
        accounts: [
          {
            alias: 'PRINCIPAL',
            balance: 1340,
            favorite: true,
            hash: '0x0013123',
            mask: '******0234',
            type: 'SAVINGS_ACCOUNT',
            value: '0000',
          },
        ],
        portal: { acceptance: { ...acceptanceDefaultContent } },
      },
    })

    const { result } = renderHook(() => useAcceptancePage(), { wrapper })

    expect(result.current.SoftTokenView).toBeDefined()
    expect(result.current.CountDownView).toBeDefined()
    expect(result.current.handleCancel).toBeInstanceOf(Function)
    expect(result.current.handleConfirm).toBeInstanceOf(Function)
    expect(result.current.disabled).toBe(true)
    expect(result.current.softToken).toEqual({
      value: '',
      ariaLabel: 'Hemos asegurado tu contratación tu código de seguridad es ',
    })
  })

  it('should be return softToken values', () => {
    jest
      .spyOn(TokenService, 'subscribeToTokenEvent')
      .mockImplementation((callback) => {
        callback({ detail: { softToken: '112343', timeLeft: '39' } })
      })

    const wrapper = createWrapper({
      flow: {
        ...flowValues,
        accountHashSelected: '0x00',
      },
      app: {
        ...appValues,
        accounts: [
          {
            alias: 'PREFERIDA',
            balance: 1340,
            favorite: true,
            hash: '0x00',
            mask: '******0340',
            type: 'CHECKING_ACCOUNT',
            value: '0000',
          },
        ],
        portal: { acceptance: { ...acceptanceDefaultContent } },
      },
    })

    const { result } = renderHook(() => useAcceptancePage(), { wrapper })

    expect(result.current.softToken).toEqual({
      value: '112343',
      ariaLabel:
        'Hemos asegurado tu contratación tu código de seguridad es 1 1 2 3 4 3',
    })
  })

  it('should return formatted content', () => {
    const wrapper = createWrapper({
      flow: {
        ...flowValues,
        status: FlowStatus.NORMAL,
        accountHashSelected: '0x00',
      },
      app: {
        ...appValues,
        accounts: [
          {
            alias: 'ADICIONAL',
            balance: 67854,
            favorite: true,
            hash: '0x00',
            mask: '******0534',
            type: 'SAVINGS_ACCOUNT',
            value: '0000',
          },
        ],
        portal: {
          acceptance: {
            descriptions: {
              aria: 'aria {0}',
              from: 'from {0}',
              toPay: '',
            },
          },
        },
      },
    })

    const { result } = renderHook(() => useAcceptancePage(), { wrapper })

    expect(result.current.content).toEqual({
      descriptions: {
        aria: 'aria Transaccional',
        from: 'from Ahorros',
        toPay: '',
      },
    })
  })

  it('should confirm acceptance and navigate success page', async () => {
    axiosMock.onPost().reply(200, {
      code: '0',
      message: 'Ok',
      value: 'ACCEPTED',
    })

    jest
      .spyOn(TokenService, 'subscribeToTokenEvent')
      .mockImplementation((callback) => {
        callback({ detail: { softToken: '112343', timeLeft: '39' } })
      })

    const wrapper = createWrapper({
      flow: {
        status: FlowStatus.NORMAL,
        accountHashSelected: '0x00',
        key: 'key',
        transactionReference: 'transactionReference',
        planSelected: 'PLAN01',
        periodicitySelected: 'MONTHLY',
      },
      app: {
        accounts: [
          {
            alias: 'DESCONOCIDA',
            balance: 125678,
            favorite: true,
            hash: '0x00',
            mask: '******0512',
            type: 'SAVINGS_ACCOUNT',
            value: '2235234234',
          },
        ],
        plans: {
          PLAN01: {
            periodicityOptions: {
              MONTHLY: { totalPrice: 1000 },
            },
            paymentMethodOptions: {
              MONTHLY: { totalPrice: 1000 },
            },
          },
        } as never,
        portal: { acceptance: { ...acceptanceDefaultContent } },
      },
      global: {
        authEvent: {
          channel: 'movil',
          cif: '134634534',
          clientId: '4444444444',
          clientIdType: '0000',
          deeplink: 'deeplink',
          device: 'as453d2as456d3a54sd',
          guid: 'a6s54d34as5td786as',
          ip: 'ip',
          os: 'ios',
          jwtToken: 'jwtToken',
          screenWidth: '1920',
          session: '45as3d476asd5as5d',
          xsrf: 'xsrf',
        },
      },
    })

    const navigate = jest.fn()
    useNavigateMock.mockImplementation(() => navigate)

    const { result } = renderHook(() => useAcceptancePage(), { wrapper })

    await result.current.handleConfirm()

    expect(navigate).toBeCalledWith('/compra-exitosa', { replace: true })
  })

  it('should fail acceptance and navigate retry page', async () => {
    const wrapper = createWrapper({
      flow: {
        ...flowValues,
        status: FlowStatus.NORMAL,
        accountHashSelected: '0x002134233',
      },
      app: {
        ...appValues,
        accounts: [
          {
            alias: 'AHO',
            balance: 67854,
            favorite: true,
            hash: '0x002134233',
            mask: '******5467',
            type: 'CHECKING_ACCOUNT',
            value: '12431231235423',
          },
        ],
        portal: { acceptance: { ...acceptanceDefaultContent } },
      },
    })

    const navigate = jest.fn()
    useNavigateMock.mockImplementation(() => navigate)

    const { result } = renderHook(() => useAcceptancePage(), { wrapper })

    await result.current.handleConfirm()

    expect(navigate).toBeCalledWith('/reintentar-aceptacion', { replace: true })
  })
})
