import { renderHook } from '@testing-library/react'
import useOsType from './use-os-type'
import { createWrapper } from '@app/__test__/wrappers'
import { FullIdentityEvent } from '@app/context/global-context'

const authEventValues: FullIdentityEvent = {
  channel: 'channel',
  cif: 'cif',
  clientId: 'clientId',
  clientIdType: 'clientIdType',
  deeplink: 'deeplink',
  device: 'device',
  guid: 'guid',
  ip: 'ip',
  os: 'unknown',
  jwtToken: 'jwtToken',
  screenWidth: 'screenWidth',
  session: 'sessionId',
  xsrf: 'xsrf',
}

describe('useOsType', () => {
  it('should be unknown', () => {
    const wrapper = createWrapper({
      global: {
        authEvent: { ...authEventValues },
      },
    })

    const { result } = renderHook(() => useOsType(), { wrapper })

    expect(result.current).toStrictEqual({
      type: 'unknown',
      isUnknown: true,
      isAndroid: false,
      isIos: false,
    })
  })

  it('should be android', () => {
    const wrapper = createWrapper({
      global: {
        authEvent: { ...authEventValues, os: 'android' },
      },
    })

    const { result } = renderHook(() => useOsType(), { wrapper })

    expect(result.current).toStrictEqual({
      type: 'android',
      isUnknown: false,
      isAndroid: true,
      isIos: false,
    })
  })

  it('should be ios', () => {
    const wrapper = createWrapper({
      global: {
        authEvent: { ...authEventValues, os: 'ios' },
      },
    })

    const { result } = renderHook(() => useOsType(), { wrapper })

    expect(result.current).toStrictEqual({
      type: 'ios',
      isUnknown: false,
      isAndroid: false,
      isIos: true,
    })
  })
})
