import { act, renderHook } from '@testing-library/react'
import useSetData from './use-set-data'
import { WebviewEvents } from '@pichincha/events-microsite'

import useFlow from '@app/context/flow-context/use-flow'
import useGlobal from '@app/context/global-context/use-global'
import useApp from '@app/context/app-context/use-app'
import { FC, PropsWithChildren } from 'react'
import { QueryClientProvider, QueryClient } from '@tanstack/react-query'
import { BrowserRouter } from 'react-router-dom'

jest.mock('@app/context/flow-context/use-flow')
jest.mock('@app/context/global-context/use-global')
jest.mock('@app/context/app-context/use-app')

const useAppMock = useApp as jest.Mock
const useFlowMock = useFlow as jest.Mock
const useGlobalMock = useGlobal as jest.Mock

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

const wrapper: FC<PropsWithChildren> = ({ children }) => (
  <QueryClientProvider client={new QueryClient()}>
    <BrowserRouter>{children}</BrowserRouter>
  </QueryClientProvider>
)

describe('useSetData', () => {
  it('should set Identity', () => {
    const mockIdentity = jest.fn()

    useGlobalMock.mockReturnValue({
      dispatchAuthenticate: mockIdentity,
    })

    useFlowMock.mockReturnValue({
      dispatchTransaction: jest.fn(),
    })

    useAppMock.mockReturnValue({
      dispatchLoadValues: jest.fn(),
    })

    renderHook(() => useSetData(), { wrapper })

    act(() => {
      document.dispatchEvent(new CustomEvent('IDENTITY_APP_EVENT', IdentityEvent))
    })

    expect(mockIdentity).toHaveBeenCalledWith({ ...IdentityEvent.detail })
  })

  it('should not set Identity if some value is not defined', () => {
    const mockIdentity = jest.fn()

    useGlobalMock.mockReturnValue({
      dispatchAuthenticate: mockIdentity,
    })

    useFlowMock.mockReturnValue({
      dispatchTransaction: jest.fn(),
    })

    useAppMock.mockReturnValue({
      dispatchLoadValues: jest.fn(),
    })

    renderHook(() => useSetData(), { wrapper })

    act(() => {
      document.dispatchEvent(
        new CustomEvent(WebviewEvents.IDENTITY_APP_EVENT, { detail: {} })
      )
    })

    expect(mockIdentity).not.toHaveBeenCalled()
  })
})
