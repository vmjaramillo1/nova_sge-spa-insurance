import {
  createWrapperStore,
  makeStore,
} from '@app/__test__/wrappers'
import { flowValues, globalValues, appValues } from '@app/__test__/values'
import useTermsAndConditionPage from './use-terms-and-condition-page'
import { act, renderHook } from '@testing-library/react'
import { APP_ROUTES } from '@app/routes/config'

import * as messagesUtils from '@app/utils/messages'

jest.mock('@pichincha/events-microsite')

jest.mock('@app/utils/messages', () => ({
  __esModule: true,
  ...jest.requireActual('@app/utils/messages'),
}))

const mockNavigate = jest.fn()

jest.mock('react-router-dom', () => ({
  ...jest.requireActual('react-router-dom'),
  useNavigate: () => mockNavigate,
}))

const store = makeStore({
  app: {
    ...appValues,
    lopdp: {
      acceptedTermsConditions: false,
      hasConsent: false,
      url: 'https://www.pichincha.com/portal/Portals/0/Transparencia/autorizacion-para-tratamiento-de-documentos-personales-v02.pdf',
    },
  },
  flow: flowValues,
  global: globalValues,
})

describe('useAlreadyPage', () => {
  it('acceptTC should to be false', () => {
    const { result } = renderHook(() => useTermsAndConditionPage(), {
      wrapper: createWrapperStore(store),
    })

    expect(result.current.acceptTC).toBeDefined()
    expect(result.current.acceptTC).toBe(false)
  })

  it('should change acceptTC/canContinue', () => {
    const { result } = renderHook(() => useTermsAndConditionPage(), {
      wrapper: createWrapperStore(store),
    })

    expect(result.current.handleAcceptTC).toBeInstanceOf(Function)
    expect(result.current.canContinue).toBe(false)
    expect(result.current.acceptTC).toBe(false)

    act(() => {
      result.current.handleAcceptTC(true)
    })

    expect(result.current.acceptTC).toEqual(true)
    expect(result.current.canContinue).toEqual(true)
  })

  it('should open Browser (TyC)', () => {
    const spyOpenBrowser = jest.spyOn(messagesUtils, 'openBrowser')

    const { result } = renderHook(() => useTermsAndConditionPage(), {
      wrapper: createWrapperStore(store),
    })

    act(() => {
      result.current.handleLopdp()
    })

    expect(spyOpenBrowser).toBeCalledWith(
      'https://www.pichincha.com/portal/Portals/0/Transparencia/autorizacion-para-tratamiento-de-documentos-personales-v02.pdf'
    )
  })

  it('should canContinue false', () => {
    const { result } = renderHook(() => useTermsAndConditionPage(), {
      wrapper: createWrapperStore(store),
    })

    expect(result.current.canContinue).toBeDefined()
    expect(result.current.canContinue).toBe(false)
  })

  it('should Continue to home', async () => {
    const store = makeStore({
      app: {
        ...appValues,
        lopdp: {
          acceptedTermsConditions: true,
          hasConsent: false,
          url: 'https://www.pichincha.com/portal/Portals/0/Transparencia/autorizacion-para-tratamiento-de-documentos-personales-v02.pdf',
        },
      },
      flow: flowValues,
      global: globalValues,
    })

    const { result } = renderHook(() => useTermsAndConditionPage(), {
      wrapper: createWrapperStore(store),
    })

    act(() => {
      result.current.handleAcceptTC(true)
    })

    await act(async () => {
      await result.current.handleContinue()
    })

    expect(mockNavigate).toHaveBeenCalledWith(APP_ROUTES.INSURANCE_PORTAL, {
      replace: true,
    })
  })
})
