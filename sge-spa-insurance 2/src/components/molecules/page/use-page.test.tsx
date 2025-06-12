import { renderHook } from '@testing-library/react'
import usePage from './use-page'
import { FlowStatus, RoutesHubAlias, RoutesFraudAlias } from '@app/utils/enums'
import { createWrapperStore, makeStore } from '@app/__test__/wrappers'
import { globalValues, appValues } from '@app/__test__/values'
import { useOutletContext } from 'react-router-dom' // importa el hook aquí

jest.mock('@pichincha/events-microsite')

jest.mock('react-router-dom', () => ({
  ...jest.requireActual('react-router-dom'),
  useOutletContext: jest.fn(),
}))

describe('usePage', () => {
  it('should return defaults', () => {
    ;(useOutletContext as jest.Mock).mockReturnValue({
      isLoading: false,
      changeTitle: jest.fn(),
    })

    const store = makeStore({
      app: appValues,
      flow: {
        shared: {
          productCode: 'TU_BAN_PRO',
          accountHashSelected:
            '42e976aea883be9ad3b29487ab3d1a64778bdbfbac9d02f30941d30600b76585',
          planSelected: 'TU_BAN_PRO_2',
          periodicitySelected: 'MONTHLY',
          transactionReference: '60547864-a16d-4571-9771-25d0f98ffc11',
          key: 'aUYg77Dfr/mA8NhDEHfVRbksKZjbdPnuV3ARE29k3vCL2/dnEgSBJl1xbo/Dey3t5LXDvGIRgV7QUAvEacJSHKqyrns3ej5fFPxl59bAxPBTM4cONP2NyRJKomx9RmLA9QOv9x4=',
          contentLoaded: true,
          status: FlowStatus.NORMAL,
          step: RoutesFraudAlias.PRODUCT_DETAIL,
        },
      },
      global: globalValues,
    })

    const { result } = renderHook(() => usePage('my title'), {
      wrapper: createWrapperStore(store),
    })

    expect(result.current).toEqual({
      isLoading: false,
      isEndSuccess: false,
      isEndRetryError: false,
      isEndError: false,
      step: 'PRODUCT_DETAIL',
    })
  })

  it('should call changeTitle', () => {
    const changeTitle = jest.fn()
    ;(useOutletContext as jest.Mock).mockReturnValue({
      isLoading: false,
      changeTitle: changeTitle,
    })

    const store = makeStore({
      app: appValues,
      flow: {
        shared: {
          productCode: 'TU_BAN_PRO',
          accountHashSelected:
            '42e976aea883be9ad3b29487ab3d1a64778bdbfbac9d02f30941d30600b76585',
          planSelected: 'TU_BAN_PRO_2',
          periodicitySelected: 'MONTHLY',
          transactionReference: '60547864-a16d-4571-9771-25d0f98ffc11',
          key: 'aUYg77Dfr/mA8NhDEHfVRbksKZjbdPnuV3ARE29k3vCL2/dnEgSBJl1xbo/Dey3t5LXDvGIRgV7QUAvEacJSHKqyrns3ej5fFPxl59bAxPBTM4cONP2NyRJKomx9RmLA9QOv9x4=',
          contentLoaded: true,
          status: FlowStatus.NORMAL,
          step: RoutesFraudAlias.PRODUCT_DETAIL,
        },
      },
      global: globalValues,
    })

    renderHook(() => usePage('my title'), {
      wrapper: createWrapperStore(store),
    })
    expect(changeTitle).toHaveBeenCalledWith('my title')
  })

  it('should return isEndSuccess true', () => {
    const changeTitle = jest.fn()
    ;(useOutletContext as jest.Mock).mockReturnValue({
      isLoading: false,
      changeTitle: changeTitle,
    })

    const store = makeStore({
      app: appValues,
      flow: {
        shared: {
          productCode: 'TU_BAN_PRO',
          accountHashSelected:
            '42e976aea883be9ad3b29487ab3d1a64778bdbfbac9d02f30941d30600b76585',
          planSelected: 'TU_BAN_PRO_2',
          periodicitySelected: 'MONTHLY',
          transactionReference: '60547864-a16d-4571-9771-25d0f98ffc11',
          key: 'aUYg77Dfr/mA8NhDEHfVRbksKZjbdPnuV3ARE29k3vCL2/dnEgSBJl1xbo/Dey3t5LXDvGIRgV7QUAvEacJSHKqyrns3ej5fFPxl59bAxPBTM4cONP2NyRJKomx9RmLA9QOv9x4=',
          contentLoaded: true,
          status: FlowStatus.END_SUCCESS,
          step: RoutesFraudAlias.SUCCESS,
        },
      },
      global: globalValues,
    })

    const { result } = renderHook(() => usePage('my title'), {
      wrapper: createWrapperStore(store),
    })

    expect(result.current.isEndSuccess).toBe(true)
  })

  it('should return isEndRetryError true', () => {
    const changeTitle = jest.fn()
    ;(useOutletContext as jest.Mock).mockReturnValue({
      isLoading: false,
      changeTitle: changeTitle,
    })

    const store = makeStore({
      app: appValues,
      flow: {
        shared: {
          productCode: 'TU_BAN_PRO',
          accountHashSelected:
            '42e976aea883be9ad3b29487ab3d1a64778bdbfbac9d02f30941d30600b76585',
          planSelected: 'TU_BAN_PRO_2',
          periodicitySelected: 'MONTHLY',
          transactionReference: '60547864-a16d-4571-9771-25d0f98ffc11',
          key: 'aUYg77Dfr/mA8NhDEHfVRbksKZjbdPnuV3ARE29k3vCL2/dnEgSBJl1xbo/Dey3t5LXDvGIRgV7QUAvEacJSHKqyrns3ej5fFPxl59bAxPBTM4cONP2NyRJKomx9RmLA9QOv9x4=',
          contentLoaded: true,
          status: FlowStatus.RETRY_ACCEPTANCE_ERROR,
          step: RoutesHubAlias.RETRY_ACCEPTANCE,
        },
      },
      global: globalValues,
    })

    const { result } = renderHook(() => usePage('my title'), {
      wrapper: createWrapperStore(store),
    })
    expect(result.current.isEndRetryError).toBe(true)
  })

  it('should return isEndError true', () => {
    const changeTitle = jest.fn()
    ;(useOutletContext as jest.Mock).mockReturnValue({
      isLoading: false,
      changeTitle: changeTitle,
    })

    const store = makeStore({
      app: appValues,
      flow: {
        shared: {
          productCode: 'TU_BAN_PRO',
          accountHashSelected:
            '42e976aea883be9ad3b29487ab3d1a64778bdbfbac9d02f30941d30600b76585',
          planSelected: 'TU_BAN_PRO_2',
          periodicitySelected: 'MONTHLY',
          transactionReference: '60547864-a16d-4571-9771-25d0f98ffc11',
          key: 'aUYg77Dfr/mA8NhDEHfVRbksKZjbdPnuV3ARE29k3vCL2/dnEgSBJl1xbo/Dey3t5LXDvGIRgV7QUAvEacJSHKqyrns3ej5fFPxl59bAxPBTM4cONP2NyRJKomx9RmLA9QOv9x4=',
          contentLoaded: true,
          status: FlowStatus.END_ERROR,
          step: RoutesHubAlias.GENERAL_ERROR,
        },
      },
      global: globalValues,
    })

    const { result } = renderHook(() => usePage('my title'), {
      wrapper: createWrapperStore(store),
    })
    expect(result.current.isEndError).toBe(true)
  })
})
