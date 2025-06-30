import { FC, PropsWithChildren, ReactNode } from 'react'
import { MemoryRouter, Outlet, Route, Routes } from 'react-router-dom'

import { QueryClient, QueryClientProvider } from '@tanstack/react-query'

import { BrowserRouter } from 'react-router-dom'
import { configureStore } from '@reduxjs/toolkit'
import appSlice from '@app/store/reducers/app-slice'
import globalSlice from '@app/store/reducers/global-slice'
import flowSlice from '@app/store/reducers/flow-slice'
import { Provider } from 'react-redux'

interface WrapperRoutesProps {
  routes?: ReactNode
  outletValues?: unknown
}

export const WrapperRoutes: FC<PropsWithChildren<WrapperRoutesProps>> = ({
  children,
  routes = <></>,
  outletValues = {},
}) => (
  <MemoryRouter>
    <Routes>
      <Route path="/" element={<Outlet context={outletValues} />}>
        <Route index element={<>{children}</>} />
        {routes}
      </Route>
    </Routes>
  </MemoryRouter>
)

export const makeStore = (preloadedState = {}) =>
  configureStore({
    reducer: {
      app: appSlice.reducer,
      flow: flowSlice.reducer,
      global: globalSlice.reducer,
    },
    preloadedState,
  })

export const createWrapperStore = (
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

import { useOutletContext } from 'react-router-dom'

type WrapperOptions = {
  outletValues?: any
  routes?: React.ReactNode
  initialEntries?: string[]
}

export const createWrapperMemoryStore = (
  preloadedState: Parameters<typeof makeStore>[0],
  options: WrapperOptions = {}
): FC<PropsWithChildren> => {
  const store = makeStore(preloadedState)

  if (options.outletValues) {
    ;(useOutletContext as jest.Mock).mockReturnValue(options.outletValues)
  }

  const client = new QueryClient()

  return ({ children }) => (
    <Provider store={store}>
      <QueryClientProvider client={client}>
        <MemoryRouter initialEntries={options.initialEntries || ['/']}>
          <Routes>
            {options.routes}
            <Route path="*" element={children} />
          </Routes>
        </MemoryRouter>
      </QueryClientProvider>
    </Provider>
  )
}
