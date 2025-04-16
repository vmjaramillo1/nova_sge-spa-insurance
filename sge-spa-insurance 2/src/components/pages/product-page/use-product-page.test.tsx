import { createWrapper } from '@app/__test__/wrappers'
import useProductPage from './use-product-page'
import { act, renderHook } from '@testing-library/react'
import { APP_ROUTES } from '@app/routes/config'

import { useNavigate } from 'react-router-dom'
import { LocalEvents } from '@pichincha/events-microsite'
import { appValues, flowValues } from '@app/__test__/values'

jest.mock('@pichincha/events-microsite')
jest.mock('react-router-dom', () => ({
  ...jest.requireActual('react-router-dom'),
  useNavigate: jest.fn(),
}))

const useNavigateMock = useNavigate as jest.Mock

describe('useProductPage', () => {
  it('should return defaults values', () => {
    const wrapper = createWrapper({
      flow: { ...flowValues },
      app: { ...appValues },
      global: {},
    })

    const { result } = renderHook(() => useProductPage(), { wrapper })

    expect(result.current.isMultiAccount).toBe(false)
    expect(result.current.accepted).toBe(false)
    expect(result.current.currentAccount).toEqual({
      ariaLabelAccount: '',
      description: '',
      label: '',
      value: '$ 0,00',
    })
    expect(result.current.handleClickAccount).toBeInstanceOf(Function)
    expect(result.current.handleClickContinue).toBeInstanceOf(Function)
    expect(result.current.handleCheckLegal).toBeInstanceOf(Function)
    expect(result.current.handleDownload).toBeInstanceOf(Function)
  })

  it('should navigate to acceptance on handleClickContinue', () => {
    const navigateMock = jest.fn()
    useNavigateMock.mockReturnValue(navigateMock)

    const wrapper = createWrapper({
      flow: { ...flowValues },
      app: { ...appValues },
      global: {},
    })

    const { result } = renderHook(() => useProductPage(), { wrapper })

    act(() => {
      result.current.handleClickContinue()
    })

    expect(navigateMock).toBeCalledWith(APP_ROUTES.ACCEPTANCE)
  })

  it('should change accepted when handleCheckLegal is called', () => {
    const wrapper = createWrapper({
      flow: { ...flowValues },
      app: { ...appValues },
    })

    const { result } = renderHook(() => useProductPage(), { wrapper })

    act(() => {
      result.current.handleCheckLegal()
    })

    expect(result.current.accepted).toBe(true)
  })

  it('should preserve route if is not multiAccount', () => {
    const wrapper = createWrapper({
      flow: { ...flowValues },
      app: { ...appValues },
    })

    const navigateMock = jest.fn()
    useNavigateMock.mockReturnValue(navigateMock)

    const { result } = renderHook(() => useProductPage(), { wrapper })

    act(() => {
      result.current.handleClickAccount()
    })

    expect(navigateMock).not.toBeCalled()
  })

  it('should navigate to select account if is multiAccount', () => {
    const wrapper = createWrapper({
      flow: { ...flowValues },
      app: {
        ...appValues,
        accounts: [
          {
            hash: '123io12au3',
            mask: '22222XXXX',
            alias: 'PRINCIPAL',
            balance: 1234,
            type: 'SAVINGS_ACCOUNT',
            favorite: true,
            value: '655a4s7d654as76d567asd',
          },
          {
            hash: '123123sd142sw',
            mask: '2345XXXX',
            alias: 'SECUNDARIA',
            balance: 2352.56,
            type: 'CHECKING_ACCOUNT',
            favorite: false,
            value: '64a3sda675s76da8s7d',
          },
        ],
      },
      global: {},
    })

    const navigateMock = jest.fn()
    useNavigateMock.mockReturnValue(navigateMock)

    const { result } = renderHook(() => useProductPage(), { wrapper })

    act(() => {
      result.current.handleClickAccount()
    })

    expect(navigateMock).toBeCalledWith(APP_ROUTES.SELECT_ACCOUNT)
  })

  it('shod back to productDetail on back press', () => {
    const wrapper = createWrapper({
      flow: { ...flowValues },
      app: { ...appValues },
    })
    const navigateMock = jest.fn()
    useNavigateMock.mockReturnValue(navigateMock)

    renderHook(() => useProductPage(), { wrapper })

    act(() => {
      document.dispatchEvent(new CustomEvent(LocalEvents.HEADER_PRESS_EVENT))
    })

    expect(navigateMock).toBeCalledWith(APP_ROUTES.PRODUCT_DETAIL)
  })
})
