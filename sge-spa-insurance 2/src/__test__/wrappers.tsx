import { FC, PropsWithChildren, ReactNode } from 'react'
import { MemoryRouter, Outlet, Route, Routes } from 'react-router-dom'

// import { FlowProvider, FlowState } from '@app/context/flow-context'
// import { GlobalProvider, GlobalState } from '@app/context/global-context'
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

// export interface WrapperProvidersProps {
//   // flow?: Partial<FlowState>
//   // global?: Partial<GlobalState>
// }

// export const WrapperProviders: FC<PropsWithChildren<WrapperProvidersProps>> = ({
//   children,
//   flow = {},
//   global = {},
// }) => (
//   <QueryClientProvider client={new QueryClient()}>
//     <GlobalProvider initialValues={{ ...global }}>
//       <FlowProvider initialValues={{ ...flow }}>{children}</FlowProvider>
//     </GlobalProvider>
//   </QueryClientProvider>
// )

// export const createWrapper = (
//   providers?: WrapperProvidersProps,
//   routing?: WrapperRoutesProps
// ): FC<PropsWithChildren> => {
//   return ({ children }) => (
//     <WrapperProviders {...providers}>
//       <WrapperRoutes {...routing}>{children}</WrapperRoutes>
//     </WrapperProviders>
//   )
// }

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

export const createWrapperMemoryStore = (
  store: ReturnType<typeof makeStore>,
  routing?: WrapperRoutesProps
): FC<PropsWithChildren> => {
  return ({ children }) => (
    <Provider store={store}>
      <QueryClientProvider client={new QueryClient()}>
          <WrapperRoutes {...routing}>{children}</WrapperRoutes>
          {children}
      </QueryClientProvider>
    </Provider>
  )
}
