import { renderHook } from '@testing-library/react'
import usePage from './use-page'
import { createWrapper } from '@app/__test__/wrappers'
import { FlowStatus, RoutesAlias, RoutesFraudAlias } from '@app/utils/enums'

jest.mock('@pichincha/events-microsite')

describe('usePage', () => {
  let contextValues = {}

  beforeEach(() => {
    contextValues = {
      isLoading: false,
      changeTitle: jest.fn(),
    }
  })

  it('should return defaults', () => {
    const wrapper = createWrapper(
      {
        flow: {
          status: FlowStatus.NORMAL,
          step: RoutesFraudAlias.PRODUCT_DETAIL,
        },
      },
      { outletValues: { ...contextValues } }
    )

    const { result } = renderHook(() => usePage('my title'), { wrapper })

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
    const wrapper = createWrapper(
      {
        flow: {
          status: FlowStatus.NORMAL,
          step: RoutesFraudAlias.PRODUCT_DETAIL,
        },
      },
      {
        outletValues: {
          isLoading: false,
          changeTitle,
        },
      }
    )

    renderHook(() => usePage('my title'), { wrapper })

    expect(changeTitle).toHaveBeenCalledWith('my title')
  })

  it('should return isEndSuccess true', () => {
    const wrapper = createWrapper(
      {
        flow: {
          status: FlowStatus.END_SUCCESS,
          step: RoutesFraudAlias.SUCCESS,
        },
      },
      { outletValues: { ...contextValues } }
    )

    const { result } = renderHook(() => usePage('my title'), { wrapper })

    expect(result.current.isEndSuccess).toBe(true)
  })

  it('should return isEndRetryError true', () => {
    const wrapper = createWrapper(
      {
        flow: {
          status: FlowStatus.RETRY_ACCEPTANCE_ERROR,
          step: RoutesAlias.RETRY_ACCEPTANCE,
        },
      },
      { outletValues: { ...contextValues } }
    )

    const { result } = renderHook(() => usePage('my title'), { wrapper })

    expect(result.current.isEndRetryError).toBe(true)
  })

  it('should return isEndError true', () => {
    const wrapper = createWrapper(
      {
        flow: {
          status: FlowStatus.END_ERROR,
          step: RoutesAlias.GENERAL_ERROR,
        },
      },
      { outletValues: { ...contextValues } }
    )

    const { result } = renderHook(() => usePage('my title'), { wrapper })

    expect(result.current.isEndError).toBe(true)
  })
})
