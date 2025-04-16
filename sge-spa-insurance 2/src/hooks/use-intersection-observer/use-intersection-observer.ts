import { useEffect, useMemo, useState } from 'react'

interface UseIntersectionObserver<T extends HTMLElement> {
  element: T | null
  options?: IntersectionObserverInit
}

export default function useIntersectionObserver<T extends HTMLElement>(
  params: UseIntersectionObserver<T>
) {
  const { element, options } = params

  const [isIntersecting, setIsIntersecting] = useState<boolean>(false)

  const observer = useMemo(
    () =>
      new IntersectionObserver(([entry]) => {
        setIsIntersecting(entry.isIntersecting)
      }, options),
    [options]
  )

  useEffect(() => {
    if (!element) return

    observer.observe(element)

    return () => observer.disconnect()
  }, [observer, element])

  return {
    isIntersecting,
  }
}
