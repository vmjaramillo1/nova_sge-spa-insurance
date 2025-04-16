import { act, renderHook } from '@testing-library/react'
import useIntersectionObserver from './use-intersection-observer'

const observerMap = new Map()

function intersect(element: Element, isIntersecting: boolean) {
  const cb = observerMap.get(element)
  if (cb) {
    cb([
      {
        isIntersecting,
        target: element,
        intersectionRatio: isIntersecting ? 1 : -1,
      },
    ])
  }
}

describe('useIntersectionObserver', () => {
  beforeEach(() => {
    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
    // @ts-ignore
    global.IntersectionObserver = jest.fn((cb, options = {}) => ({
      thresholds: Array.isArray(options.threshold)
        ? options.threshold
        : [options.threshold],
      root: options.root,
      rootMargin: options.rootMargin,
      observe: jest.fn((element: Element) => {
        observerMap.set(element, cb)
      }),
      unobserve: jest.fn((element: Element) => {
        observerMap.delete(element)
      }),
      disconnect: jest.fn(),
    }))
  })

  afterEach(() => {
    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
    // @ts-ignore
    global.IntersectionObserver.mockReset()
    observerMap.clear()
  })

  it('should return true when element is intersecting', () => {
    const element = document.createElement('div')
    const { result } = renderHook(() =>
      useIntersectionObserver({ element, options: {} })
    )

    expect(result.current.isIntersecting).toBe(false)
  })

  it('should return false when element is not intersecting', () => {
    const element = document.createElement('div')
    const { result } = renderHook(() =>
      useIntersectionObserver({ element, options: {} })
    )

    act(() => {
      intersect(element, true)
    })

    expect(result.current.isIntersecting).toBe(true)
  })
})
