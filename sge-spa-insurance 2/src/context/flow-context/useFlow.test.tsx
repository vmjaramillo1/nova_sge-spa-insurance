import { FC, PropsWithChildren } from 'react'
import { act, renderHook } from '@testing-library/react'
import useFlow from './use-flow'
import FlowProvider from './flow-provider'
import { initialState } from './flow-context'
import { FlowState } from './flow-context.interface'
import { RoutesHubAlias, FlowStatus, RoutesFraudAlias } from '@app/utils/enums'

const wrapper: FC<PropsWithChildren> = ({ children }) => (
  <FlowProvider>{children}</FlowProvider>
)

describe('useFlow', () => {
  it('should throw an error if used outside of FlowProvider', () => {
    let error: Error | undefined = undefined

    try {
      renderHook(() => useFlow())
    } catch (err) {
      error = err as Error
    }

    expect(error).toBeDefined()
    expect(error?.message).toBe('useFlow must be used within a FlowProvider')
  })

  it('should return the flow context', () => {
    const { result } = renderHook(() => useFlow(), { wrapper })

    const currentState: FlowState = {
      periodicitySelected: result.current.periodicitySelected,
      planSelected: result.current.planSelected,
      status: result.current.status,
      accountHashSelected: result.current.accountHashSelected,
      step: result.current.step,
      key: result.current.key,
      transactionReference: result.current.transactionReference,
      contentLoaded: result.current.contentLoaded,
    }

    expect(result.current.dispatchSelectedAccount).toBeInstanceOf(Function)
    expect(result.current.dispatchTransaction).toBeInstanceOf(Function)
    expect(result.current.dispatchStep).toBeInstanceOf(Function)
    expect(result.current.dispatch).toBeInstanceOf(Function)
    expect(currentState).toEqual(initialState)
  })

  it('should dispatchSelectedAccount', () => {
    const { result } = renderHook(() => useFlow(), { wrapper })

    expect(result.current.accountHashSelected).toBe('')

    act(() => {
      result.current.dispatchSelectedAccount('00x0000123')
    })

    expect(result.current.accountHashSelected).toBe('00x0000123')
  })

  it('should dispatchTransaction without accountSelected', () => {
    const { result } = renderHook(() => useFlow(), { wrapper })

    act(() => {
      result.current.dispatchTransaction({
        key: 'key',
        transactionReference: '123456789',
      })
    })

    expect(result.current.key).toBe('key')
    expect(result.current.transactionReference).toBe('123456789')
  })

  it('should dispatchStep', () => {
    const { result } = renderHook(() => useFlow(), { wrapper })

    expect(result.current.step).toBe(RoutesFraudAlias.PRODUCT_DETAIL)

    act(() => {
      result.current.dispatchStep(RoutesHubAlias.NOT_PRODUCT)
    })

    expect(result.current.step).toBe(RoutesHubAlias.NOT_PRODUCT)
  })

  it('should dispatchFlowStatus', () => {
    const { result } = renderHook(() => useFlow(), { wrapper })

    expect(result.current.status).toBe(FlowStatus.WAIT_LOAD)

    act(() => {
      result.current.dispatchFlowStatus(FlowStatus.NORMAL)
    })

    expect(result.current.status).toBe(FlowStatus.NORMAL)
  })

  it('should dispatchContentLoaded', () => {
    const { result } = renderHook(() => useFlow(), { wrapper })

    expect(result.current.contentLoaded).toBe(false)

    act(() => {
      result.current.dispatchContentLoaded(true)
    })

    expect(result.current.contentLoaded).toBe(true)
  })

  it('should preserve state if an invalid action is passed', () => {
    const { result } = renderHook(() => useFlow(), { wrapper })

    const prevState: FlowState = {
      planSelected: result.current.planSelected,
      periodicitySelected: result.current.periodicitySelected,
      accountHashSelected: result.current.accountHashSelected,
      step: result.current.step,
      key: result.current.key,
      transactionReference: result.current.transactionReference,
      contentLoaded: result.current.contentLoaded,
      status: FlowStatus.NORMAL,
    }

    act(() => {
      result.current.dispatch({ type: 'INVALID_ACTION' } as never)
    })

    const newState: FlowState = {
      planSelected: result.current.planSelected,
      periodicitySelected: result.current.periodicitySelected,
      accountHashSelected: result.current.accountHashSelected,
      step: result.current.step,
      key: result.current.key,
      transactionReference: result.current.transactionReference,
      contentLoaded: result.current.contentLoaded,
      status: FlowStatus.NORMAL,
    }

    expect(prevState).toEqual(newState)
  })
})
