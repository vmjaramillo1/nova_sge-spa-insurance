import { act, renderHook } from '@testing-library/react'
import useSetData from './use-set-data'

import { FC, PropsWithChildren } from 'react'
import { QueryClientProvider, QueryClient } from '@tanstack/react-query'
import { BrowserRouter } from 'react-router-dom'
import { configureStore } from '@reduxjs/toolkit'
import appSlice from '@app/store/reducers/app-slice'
import globalSlice from '@app/store/reducers/global-slice'
import flowSlice from '@app/store/reducers/flow-slice'
import { Provider } from 'react-redux'

import { createWrapperStore, makeStore } from '@app/__test__/wrappers'
import { flowValues, globalValues, appValues } from '@app/__test__/values'

const IdentityEvent = {
  detail: {
    clientId: '1701071480',
    clientIdType: '0001',
    device: '1853f7d7bb7c2183',
    guid: '08dd3b0d-cc1a-4533-b1f6-08bbdbbfce28',
    session: 'bbfd6972-3ae1-455c-85da-fa7e6a43d73a',
    ip: '157.100.00.233',
    cif: '1235',
    jwtToken:
      'eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJzdWIiOiJzdWJqZWN0LXN1YmplY3QiLCJhdWQiOlsiYXVkaWVuY2UxIiwiYXVkaWVuY2UyIl0sInByb2QiOiJwcml2YXRlLkROSSIsImlzcyI6InVybjpcL1wvYXBpZ2VlLWVkZ2UtSldULXBvbGljeS10ZXN0IiwiQ2VkdWxhIjoiMTgwMzk4MzQ2NyIsImV4cCI6MTY2OTc0MTMyMywiaWF0IjoxNjY5NzQwNzIzLCJqdGkiOiI3MmM1ZjhmMC00ZGQ2LTQ5M2QtOGU0Yy1lYTQ4ZmE3NDZhNGMifQ.cyIsH9a72cSaS3zVLMC8gxs_1alIrcadgABu6eWrY24',
    channel: 'movil',
  },
}

describe('useSetData', () => {
  it('should set Identity', () => {
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

    renderHook(() => useSetData(), {
      wrapper: createWrapperStore(store),
    })

    act(() => {
      document.dispatchEvent(new CustomEvent('IDENTITY_APP_EVENT', IdentityEvent))
    })

    const state = store.getState()
    expect(state.global.security.authEvent).toEqual(IdentityEvent.detail)
  })

  it('should not dispatch identity if data is incomplete', () => {
    const store = makeStore({
      app: appValues,
      flow: flowValues,
      global: {
        ...globalValues,
        security: {
          authEvent: undefined,
          isAuthenticated: false,
        },
      },
    })

    renderHook(() => useSetData(), {
       wrapper: createWrapperStore(store),
    })

    act(() => {
      document.dispatchEvent(new CustomEvent('IDENTITY_APP_EVENT', { detail: {} }))
    })

    const state = store.getState()
    expect(state.global.security.authEvent).toBeUndefined()
  })
})
