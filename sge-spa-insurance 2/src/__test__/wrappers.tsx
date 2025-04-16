import { FC, PropsWithChildren, ReactNode } from 'react'
import { MemoryRouter, Outlet, Route, Routes } from 'react-router-dom'

import { AppProvider, AppState } from '@app/context/app-context'
import { FlowProvider, FlowState } from '@app/context/flow-context'
import { GlobalProvider, GlobalState } from '@app/context/global-context'
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'

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

export interface WrapperProvidersProps {
  flow?: Partial<FlowState>
  app?: Partial<AppState<unknown>>
  global?: Partial<GlobalState>
}

export const WrapperProviders: FC<PropsWithChildren<WrapperProvidersProps>> = ({
  children,
  app = {},
  flow = {},
  global = {},
}) => (
  <QueryClientProvider client={new QueryClient()}>
    <GlobalProvider initialValues={{ ...global }}>
      <AppProvider initialValues={{ ...app }}>
        <FlowProvider initialValues={{ ...flow }}>{children}</FlowProvider>
      </AppProvider>
    </GlobalProvider>
  </QueryClientProvider>
)

export const createWrapper = (
  providers?: WrapperProvidersProps,
  routing?: WrapperRoutesProps
): FC<PropsWithChildren> => {
  return ({ children }) => (
    <WrapperProviders {...providers}>
      <WrapperRoutes {...routing}>{children}</WrapperRoutes>
    </WrapperProviders>
  )
}
