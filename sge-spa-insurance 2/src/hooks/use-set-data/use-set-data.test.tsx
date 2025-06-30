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

const IdentityEvent = {
  detail: {
    clientId: '1701071480',
    clientIdType: '0001',
    device: '1853f7d7bb7c2183',
    guid: '08dd3b0dcc1a4533b1f608bbdbbfce28',
    session: 'bbfd6972-3ae1-455c-85da-fa7e6a43d73a',
    ip: '157.100.00.233',
    cif: '1235',
    jwtToken:
      'eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJzdWIiOiJzdWJqZWN0LXN1YmplY3QiLCJhdWQiOlsiYXVkaWVuY2UxIiwiYXVkaWVuY2UyIl0sInByb2QiOiJwcml2YXRlLkROSSIsImlzcyI6InVybjpcL1wvYXBpZ2VlLWVkZ2UtSldULXBvbGljeS10ZXN0IiwiQ2VkdWxhIjoiMTgwMzk4MzQ2NyIsImV4cCI6MTY2OTc0MTMyMywiaWF0IjoxNjY5NzQwNzIzLCJqdGkiOiI3MmM1ZjhmMC00ZGQ2LTQ5M2QtOGU0Yy1lYTQ4ZmE3NDZhNGMifQ.cyIsH9a72cSaS3zVLMC8gxs_1alIrcadgABu6eWrY24',
    channel: 'movil',
  },
}

const makeStore = (preloadedState = {}) =>
  configureStore({
    reducer: {
      app: appSlice.reducer,
      flow: flowSlice.reducer,
      global: globalSlice.reducer,
    },
    preloadedState,
  })

const createWrapper = (
  store: ReturnType<typeof makeStore>
): FC<PropsWithChildren> => {
  return ({ children }) => (
    <Provider store={store}>
      <QueryClientProvider client={new QueryClient()}>
        <BrowserRouter>{children}</BrowserRouter>
      </QueryClientProvider>
    </Provider>
  )
}

describe('useSetData', () => {
  it('should set Identity', () => {
    const store = makeStore()

    renderHook(() => useSetData(), {
      wrapper: createWrapper(store),
    })

    act(() => {
      document.dispatchEvent(new CustomEvent('IDENTITY_APP_EVENT', IdentityEvent))
    })

    const state = store.getState()
    expect(state.global.security.authEvent).toEqual(IdentityEvent.detail)
  })

  it('should not dispatch identity if data is incomplete', () => {
    const store = makeStore()

    renderHook(() => useSetData(), {
      wrapper: createWrapper(store),
    })

    act(() => {
      document.dispatchEvent(new CustomEvent('IDENTITY_APP_EVENT', { detail: {} }))
    })

    const state = store.getState()
    expect(state.global.security.authEvent).toBeUndefined()
  })
})
