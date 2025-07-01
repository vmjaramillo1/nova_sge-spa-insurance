import { act, renderHook } from '@testing-library/react'
import useProductDetailPage, {
  useContentProductDetailPage,
} from './use-product-detail-page'
import { APP_ROUTES } from '@app/routes/config'
import MockAdapter from 'axios-mock-adapter'
import axios from 'axios'
import { useNavigate } from 'react-router-dom'
import useIntersectionObserver from '@app/hooks/use-intersection-observer/use-intersection-observer'
import { createWrapperStore, makeStore } from '@app/__test__/wrappers'
import { flowValues, globalValues, appValues } from '@app/__test__/values'
import { isValidElement } from 'react'

jest.mock('@app/utils/messages')
jest.mock('@app/hooks/use-intersection-observer/use-intersection-observer')

const useIntersectionObserverMock = useIntersectionObserver as jest.Mock
const axiosMock = new MockAdapter(axios)

jest.mock('react-router-dom', () => ({
  ...jest.requireActual('react-router-dom'),
  useNavigate: jest.fn(),
}))

const useNavigateMock = useNavigate as jest.Mock

const validateTextWithAria = (obj: any) => {
  expect(obj).toEqual(
    expect.objectContaining({
      isActive: expect.any(Boolean),
      key: expect.any(String),
      order: expect.any(Number),
      value: expect.any(String),
      aria: expect.any(String),
    })
  )
}

// Valida una entrada del array de items (ítems de coverages/exclusions)
const validateSectionItemEntry = (item: any) => {
  expect(item).toEqual(
    expect.objectContaining({
      key: expect.any(String),
      isActive: expect.any(Boolean),
      order: expect.any(Number),
      description: expect.any(Object),
      icon: expect.any(Object),
    })
  )
  validateTextWithAria(item.description)
}

// Valida un bloque de coverages o exclusions
const validateSectionItem = (sectionItem: any) => {
  expect(sectionItem).toHaveProperty('title')
  expect(sectionItem).toHaveProperty('items')

  validateTextWithAria(sectionItem.title)

  expect(Array.isArray(sectionItem.items)).toBe(true)
  sectionItem.items.forEach(validateSectionItemEntry)
}

describe('useContentProductDetailPage', () => {
  it('should return reduced questions', () => {
    const store = makeStore({
      app: appValues,
      flow: flowValues,
      global: globalValues,
    })

    const { result } = renderHook(() => useContentProductDetailPage(), {
      wrapper: createWrapperStore(store),
    })

    expect(Array.isArray(result.current.questions)).toBe(true)
    expect(result.current.questions.length).toBeGreaterThan(0)

    const questions = result.current.questions
    questions.forEach((q) => {
      expect(typeof q.key).toBe('string')
      expect(typeof q.isActive).toBe('boolean')
      expect(typeof q.order).toBe('number')

      expect(q.question).toEqual(
        expect.objectContaining({
          value: expect.any(String),
          aria: expect.any(String),
        })
      )

      expect(q.answer).toEqual(
        expect.objectContaining({
          value: expect.any(String),
          aria: expect.any(String),
        })
      )

      expect(typeof q.track).toBe('string')
      expect(isValidElement(q.icon)).toBe(true)

      expect(q.classes).toEqual(
        expect.objectContaining({
          icon: expect.any(String),
        })
      )
    })
  })

  it('should return reduced coverages/exclusions', () => {
    const store = makeStore({
      app: appValues,
      flow: flowValues,
      global: globalValues,
    })

    const { result } = renderHook(() => useContentProductDetailPage(), {
      wrapper: createWrapperStore(store),
    })

    const section = result.current.coverages

    // Valida todo el objeto sectionCoverages
    const validateSectionCoverages = (section: any) => {
      expect(section).toEqual(
        expect.objectContaining({
          isActive: expect.any(Boolean),
          key: expect.any(String),
          order: expect.any(Number),
        })
      )

      validateSectionItem(section.coverages)
      validateSectionItem(section.exclusions)
    }

    validateSectionCoverages(section)
  })

  it('should return filtered and sorted coverages', () => {
    const store = makeStore({
      app: appValues,
      flow: flowValues,
      global: globalValues,
    })

    const { result } = renderHook(() => useContentProductDetailPage(), {
      wrapper: createWrapperStore(store),
    })

    expect(result.current.coverages.coverages.items.length).toBeGreaterThan(0)
  })
})
 

describe('useProductDetailPage', () => {
  beforeEach(() => {
    jest.clearAllMocks()
    axiosMock.reset()
    useIntersectionObserverMock.mockReturnValue({ isIntersecting: true })
  })

  it('should return the correct values', () => {
    const store = makeStore({
      app: appValues,
      flow: flowValues,
      global: globalValues,
    })

    const { result } = renderHook(() => useProductDetailPage(), {
      wrapper: createWrapperStore(store),
    })

    expect(result.current.showModalCoverage).toBe(false)
    expect(result.current.handleModalCoverage).toBeInstanceOf(Function)
    expect(result.current.handleContinue).toBeInstanceOf(Function)
  })

  it('should change showModalCoverage', () => {
    const store = makeStore({
      app: appValues,
      flow: flowValues,
      global: globalValues,
    })

    const { result } = renderHook(() => useProductDetailPage(), {
      wrapper: createWrapperStore(store),
    })

    act(() => {
      result.current.handleModalCoverage()
    })

    expect(result.current.showModalCoverage).toBe(true)
  })

  it('should navigate to acceptance when handleContinue is called', async () => {
    const navigateMock = jest.fn()
    useNavigateMock.mockReturnValue(navigateMock)

    const store = makeStore({
      app: appValues,
      flow: flowValues,
      global: globalValues,
    })

    const { result } = renderHook(() => useProductDetailPage(), {
      wrapper: createWrapperStore(store),
    })

    act(() => {
      result.current.handleContinue()
    })

    expect(navigateMock).toBeCalledWith(APP_ROUTES.ACCEPTANCE)
  })
})
