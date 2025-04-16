import { FC, PropsWithChildren } from 'react'
import { act, renderHook } from '@testing-library/react'
import useGlobal from './use-global'
import GlobalProvider from './global-provider'
import { FullIdentityEvent } from './global-context.interface'

const wrapper: FC<PropsWithChildren> = ({ children }) => (
  <GlobalProvider>{children}</GlobalProvider>
)

describe('useGlobal', () => {
  it('should throw without GlobalProvider', () => {
    let error: Error | undefined = undefined

    try {
      renderHook(() => useGlobal())
    } catch (err) {
      error = err as Error
    }

    expect(error).toBeDefined()
    expect(error?.message).toBe('useGlobal must be used within a GlobalProvider')
  })

  it('should return global context', () => {
    const { result } = renderHook(() => useGlobal(), { wrapper })

    expect(result.current.isAuthenticated).toBe(false)
    expect(result.current.authEvent).toBeUndefined()
    expect(result.current.error).toBe(undefined)

    expect(result.current.dispatchAuthenticate).toBeInstanceOf(Function)
    expect(result.current.dispatchError).toBeInstanceOf(Function)
    expect(result.current.dispatch).toBeInstanceOf(Function)
  })

  it('should dispatchAuthenticate', () => {
    const { result } = renderHook(() => useGlobal(), { wrapper })

    expect(result.current.isAuthenticated).toBe(false)

    const values: FullIdentityEvent = {
      clientId: '1701071480',
      clientIdType: '0001',
      device: '1853f7d7bb7c2183',
      guid: '08dd3b0dcc1a4533b1f608bbdbbfce28',
      session: 'bbfd6972-3ae1-455c-85da-fa7e6a43d73a',
      ip: '157.100.00.233',
      cif: '1235',
      jwtToken: 'eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9',
      channel: 'movil',
      xsrf: '',
      os: 'android',
      screenWidth: '',
      deeplink: undefined,
    }

    act(() => {
      result.current.dispatchAuthenticate(values)
    })

    expect(result.current.isAuthenticated).toBe(true)
    expect(result.current.authEvent).toEqual(values)
  })

  it('should dispatchSetTitle', () => {
    const { result } = renderHook(() => useGlobal(), { wrapper })

    expect(result.current.error).toBeUndefined()

    act(() => {
      result.current.dispatchError({
        code: 'ERROR_GENERIC',
        title: 'Error',
        message: 'Cannot show information',
        details: {},
      })
    })

    expect(result.current.error).toEqual({
      code: 'ERROR_GENERIC',
      title: 'Error',
      message: 'Cannot show information',
      details: {},
    })
  })

  it('should preserve state if an invalid action is passed', () => {
    const { result } = renderHook(() => useGlobal(), { wrapper })

    expect(result.current.isAuthenticated).toBe(false)

    const prevState = {
      isAuthenticated: result.current.isAuthenticated,
      authEvent: result.current.authEvent,
      isHeaderVisible: result.current.error,
    }

    act(() => {
      result.current.dispatch({ type: 'RANDOM' } as never)
    })

    const newState = {
      isAuthenticated: result.current.isAuthenticated,
      authEvent: result.current.authEvent,
      isHeaderVisible: result.current.error,
    }

    expect(newState).toEqual(prevState)
  })
})
