import { act, renderHook } from '@testing-library/react'
import useModal from './use-modal'

describe('useModal', () => {
  it('should be defined', () => {
    const { result } = renderHook(() => useModal())

    expect(result.current.isOpen).toBe(false)
    expect(result.current.toggle).toBeInstanceOf(Function)
  })

  it('should toggle change isOpen to true', () => {
    const { result } = renderHook(() => useModal())

    expect(result.current.isOpen).toBe(false)

    act(() => {
      result.current.toggle()
    })

    expect(result.current.isOpen).toBe(true)
  })
})
