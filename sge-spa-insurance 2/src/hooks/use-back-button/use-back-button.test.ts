import { renderHook } from '@testing-library/react'
import { useBackButton } from './use-back-button'
import { LocalEvents, WebviewEvents } from '@pichincha/events-microsite'

const { HEADER_PRESS_EVENT } = LocalEvents
const { GO_BACK_SCREEN_EVENT } = WebviewEvents

describe('useBackButton', () => {
  it('should', () => {
    const onBack = jest.fn()

    renderHook(() => useBackButton(onBack))

    document.dispatchEvent(new CustomEvent(HEADER_PRESS_EVENT))
    document.dispatchEvent(new CustomEvent(GO_BACK_SCREEN_EVENT))

    expect(onBack).toHaveBeenCalledTimes(2)
  })
})
