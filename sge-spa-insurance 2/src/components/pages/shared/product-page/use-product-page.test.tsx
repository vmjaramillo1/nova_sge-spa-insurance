import useProductPage from './use-product-page'
import { act, renderHook } from '@testing-library/react'
import { APP_ROUTES } from '@app/routes/config'

import { useNavigate } from 'react-router-dom'

import { createWrapperStore, makeStore } from '@app/__test__/wrappers'
import { flowValues, globalValues, appValues } from '@app/__test__/values'

jest.mock('@pichincha/events-microsite')
jest.mock('react-router-dom', () => ({
  ...jest.requireActual('react-router-dom'),
  useNavigate: jest.fn(),
}))

const useNavigateMock = useNavigate as jest.Mock

describe('useProductPage', () => {
  it('should return defaults values', () => {
    const store = makeStore({
      app: appValues,
      flow: flowValues,
      global: globalValues,
    })

    const { result } = renderHook(() => useProductPage(), {
      wrapper: createWrapperStore(store),
    })

    expect(result.current.isMultiAccount).toBe(true)
    expect(result.current.accepted).toBe(false)
    expect(result.current.currentAccount).toEqual({
      ariaLabelAccount:
        'Desde cuenta corriente principal, con saldo disponible de 2000 dólares, Número de cuenta termina en 2 0 0 8',
      description: '******2008',
      label: 'PRINCIPAL',
      value: '$ 2.000,00',
    })
    expect(result.current.handleClickContinue).toBeInstanceOf(Function)
    expect(result.current.handleCheckLegal).toBeInstanceOf(Function)
    expect(result.current.handleDownload).toBeInstanceOf(Function)
    expect(result.current.handleClickPeriodicity).toBeInstanceOf(Function)
  })

  it('should navigate to acceptance on handleClickContinue', () => {
    const navigateMock = jest.fn()
    useNavigateMock.mockReturnValue(navigateMock)

    const store = makeStore({
      app: appValues,
      flow: flowValues,
      global: globalValues,
    })

    const { result } = renderHook(() => useProductPage(), {
      wrapper: createWrapperStore(store),
    })

    act(() => {
      result.current.handleClickContinue()
    })

    expect(navigateMock).toBeCalledWith(APP_ROUTES.ACCEPTANCE)
  })

  it('should change accepted when handleCheckLegal is called', () => {
    const store = makeStore({
      app: appValues,
      flow: flowValues,
      global: globalValues,
    })

    const { result } = renderHook(() => useProductPage(), {
      wrapper: createWrapperStore(store),
    })

    act(() => {
      result.current.handleCheckLegal()
    })

    expect(result.current.accepted).toBe(true)
  })
})
