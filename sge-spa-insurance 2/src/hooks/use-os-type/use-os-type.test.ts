import { renderHook } from '@testing-library/react'
import useOsType from './use-os-type'
import { createWrapperStore, makeStore } from '@app/__test__/wrappers'
import { flowValues, globalValues, appValues } from '@app/__test__/values'

describe('useOsType', () => {
  it('should be unknown', () => {
    const store = makeStore({
      app: appValues,
      flow: flowValues,
      global: {
        ...globalValues,
        security: {
          authEvent: {
            clientId: '1703603132',
            clientIdType: '0001',
            device: 'hvOi3g0+VYx0HWfSLHp+iVSbRGJVgV6eWs56ElRyctrx',
            guid: '8d4d1a40-5901-44be-9046-cf26f9a468d6',
            session: '9b8cb2a8-757d-46a6-a891-ccee5a032090',
            ip: '0.0.0.0',
            jwtToken:
              'eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJzdWIiOiJzdWJqZWN0LXN1YmplY3QiLCJhdWQiOlsiYXVkaWVuY2UxIiwiYXVkaWVuY2UyIl0sImlzcyI6InVybjpcL1wvYXBpZ2VlLWVkZ2UtSldULXBvbGljeS10ZXN0IiwiZXhwIjoxNjkyMzMwNzE5LCJpYXQiOjE2OTIzMzAxMTksImp0aSI6IjYyZDc1ZGRiLTIyZDMtNGFmOS05NWEyLTE3NDAyZDlhNjJjYiJ9.17fqp3Dxc-lvJ--m_axZz2t-RBfEqVpIOvwRDkYCc5c',
            cif: '2383122',
            os: 'unknown',
            channel: 'movil',
          },
          isAuthenticated: true,
        },
      },
    })

    const { result } = renderHook(() => useOsType(), {
      wrapper: createWrapperStore(store),
    })

    expect(result.current).toStrictEqual({
      type: 'unknown',
      isUnknown: true,
      isAndroid: false,
      isIos: false,
    })
  })

  it('should be android', () => {
    const store = makeStore({
      app: appValues,
      flow: flowValues,
      global: {
        ...globalValues,
        security: {
          authEvent: {
            clientId: '1703603132',
            clientIdType: '0001',
            device: 'hvOi3g0+VYx0HWfSLHp+iVSbRGJVgV6eWs56ElRyctrx',
            guid: '8d4d1a40-5901-44be-9046-cf26f9a468d6',
            session: '9b8cb2a8-757d-46a6-a891-ccee5a032090',
            ip: '0.0.0.0',
            jwtToken:
              'eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJzdWIiOiJzdWJqZWN0LXN1YmplY3QiLCJhdWQiOlsiYXVkaWVuY2UxIiwiYXVkaWVuY2UyIl0sImlzcyI6InVybjpcL1wvYXBpZ2VlLWVkZ2UtSldULXBvbGljeS10ZXN0IiwiZXhwIjoxNjkyMzMwNzE5LCJpYXQiOjE2OTIzMzAxMTksImp0aSI6IjYyZDc1ZGRiLTIyZDMtNGFmOS05NWEyLTE3NDAyZDlhNjJjYiJ9.17fqp3Dxc-lvJ--m_axZz2t-RBfEqVpIOvwRDkYCc5c',
            cif: '2383122',
            os: 'android',
            channel: 'movil',
          },
          isAuthenticated: true,
        },
      },
    })

    const { result } = renderHook(() => useOsType(), {
      wrapper: createWrapperStore(store),
    })

    expect(result.current).toStrictEqual({
      type: 'android',
      isUnknown: false,
      isAndroid: true,
      isIos: false,
    })
  })

  it('should be ios', () => {
    const store = makeStore({
      app: appValues,
      flow: flowValues,
      global: {
        ...globalValues,
        security: {
          authEvent: {
            clientId: '1703603132',
            clientIdType: '0001',
            device: 'hvOi3g0+VYx0HWfSLHp+iVSbRGJVgV6eWs56ElRyctrx',
            guid: '8d4d1a40-5901-44be-9046-cf26f9a468d6',
            session: '9b8cb2a8-757d-46a6-a891-ccee5a032090',
            ip: '0.0.0.0',
            jwtToken:
              'eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJzdWIiOiJzdWJqZWN0LXN1YmplY3QiLCJhdWQiOlsiYXVkaWVuY2UxIiwiYXVkaWVuY2UyIl0sImlzcyI6InVybjpcL1wvYXBpZ2VlLWVkZ2UtSldULXBvbGljeS10ZXN0IiwiZXhwIjoxNjkyMzMwNzE5LCJpYXQiOjE2OTIzMzAxMTksImp0aSI6IjYyZDc1ZGRiLTIyZDMtNGFmOS05NWEyLTE3NDAyZDlhNjJjYiJ9.17fqp3Dxc-lvJ--m_axZz2t-RBfEqVpIOvwRDkYCc5c',
            cif: '2383122',
            os: 'ios',
            channel: 'movil',
          },
          isAuthenticated: true,
        },
      },
    })

    const { result } = renderHook(() => useOsType(), {
      wrapper: createWrapperStore(store),
    })
    expect(result.current).toStrictEqual({
      type: 'ios',
      isUnknown: false,
      isAndroid: false,
      isIos: true,
    })
  })
})
