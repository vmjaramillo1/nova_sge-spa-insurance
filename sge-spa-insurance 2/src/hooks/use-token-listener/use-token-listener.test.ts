import { renderHook, act } from '@testing-library/react'
import { WebviewEvents, TokenService } from '@pichincha/events-microsite'

import { useTokenListener } from './use-token-listener'

const { SOFTTOKEN_APP_EVENT } = WebviewEvents

jest.mock('@pichincha/events-microsite')

describe('useTokenListener', () => {
  it('should return empty values', () => {
    const { result } = renderHook(() => useTokenListener())

    expect(result.current).toEqual({
      softToken: '',
      timeLeft: 0,
    })
  })

  it('should update values on WebViewEvent', () => {
    const spyTokenService = jest.spyOn(TokenService, 'subscribeToTokenEvent')

    spyTokenService.mockImplementation((callback) => {
      document.addEventListener(SOFTTOKEN_APP_EVENT, callback)
    })

    const { result } = renderHook(() => useTokenListener())

    act(() => {
      document.dispatchEvent(
        new CustomEvent(SOFTTOKEN_APP_EVENT, {
          detail: { softToken: '283479', timeLeft: 20 },
        })
      )
    })

    expect(result.current).toEqual({
      softToken: '283479',
      timeLeft: 20,
    })
  })
})
