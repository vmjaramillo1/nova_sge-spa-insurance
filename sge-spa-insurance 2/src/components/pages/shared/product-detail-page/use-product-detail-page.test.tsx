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
      app: {
        products: {
          TU_BAN_PRO: {
            portal: {
              content: {
                home: {
                  sectionCoverages: {
                    isActive: true,
                    key: 'sectionCoverages',
                    order: 2,
                    actionShowCoverages: {
                      isActive: true,
                      key: 'actionShowCoverages',
                      order: 0,
                      value: 'Saber más del seguro',
                      aria: 'Saber más del seguro',
                    },
                    actionNext: {
                      isActive: true,
                      key: 'actionNext',
                      order: 1,
                      value: 'Elige tu método de pago',
                      aria: 'Elige tu método de pago',
                    },
                    title: {
                      isActive: true,
                      key: 'title',
                      order: 3,
                      value: 'Transparencia total',
                      aria: 'Transparencia total',
                    },
                    coverages: {
                      isActive: true,
                      key: 'coverages',
                      order: 5,
                      items: [
                        {
                          isActive: false,
                          key: 'COB_1',
                          order: 0,
                          description: {
                            isActive: true,
                            key: 'description',
                            order: 0,
                            value: 'Desde el primer día de contratación.',
                            aria: 'Desde el primer día de contratación.',
                          },
                          icon: {
                            isActive: true,
                            key: 'icon',
                            order: 1,
                            value: 'check',
                            color: 'darkCyan',
                          },
                        },
                        {
                          isActive: false,
                          key: 'COB_2',
                          order: 1,
                          description: {
                            isActive: true,
                            key: 'description',
                            order: 0,
                            value:
                              'Todas tus cuentas de ahorro y corriente en Banco Pichincha, incluidas sus tarjetas de débito.',
                            aria: 'Todas tus cuentas de ahorro y corriente en Banco Pichincha, incluidas sus tarjetas de débito.',
                          },
                          icon: {
                            isActive: true,
                            key: 'icon',
                            order: 1,
                            value: 'check',
                            color: 'darkCyan',
                          },
                        },
                        {
                          isActive: false,
                          key: 'COB_4',
                          order: 3,
                          description: {
                            isActive: true,
                            key: 'description',
                            order: 0,
                            value:
                              'Documentos personales: cédula, pasaporte, licencia de conducir.',
                            aria: 'Documentos personales: cédula, pasaporte, licencia de conducir.',
                          },
                          icon: {
                            isActive: true,
                            key: 'icon',
                            order: 1,
                            value: 'check',
                            color: 'darkCyan',
                          },
                        },
                      ],
                      title: {
                        isActive: true,
                        key: 'title',
                        order: 0,
                        value: 'Si cubrimos...',
                        aria: 'Si cubrimos...',
                      },
                    },
                    description: {
                      isActive: true,
                      key: 'description',
                      order: 4,
                      value:
                        'Conoce qué incluye tu seguro y qué situaciones no están cubiertas.',
                      aria: 'Conoce qué incluye tu seguro y qué situaciones no están cubiertas.',
                    },
                    exclusions: {
                      isActive: true,
                      key: 'exclusions',
                      order: 6,
                      items: [
                        {
                          isActive: false,
                          key: 'EXC_1',
                          order: 0,
                          description: {
                            isActive: true,
                            key: 'description',
                            order: 0,
                            value: 'Tarjetas y cuentas de otros bancos.',
                            aria: 'Tarjetas y cuentas de otros bancos.',
                          },
                          icon: {
                            isActive: true,
                            key: 'icon',
                            order: 1,
                            value: 'close',
                            color: 'error',
                          },
                        },
                        {
                          isActive: false,
                          key: 'EXC_2',
                          order: 1,
                          description: {
                            isActive: true,
                            key: 'description',
                            order: 0,
                            value: 'Casos ocurridos antes de contratar el seguro.',
                            aria: 'Casos ocurridos antes de contratar el seguro.',
                          },
                          icon: {
                            isActive: true,
                            key: 'icon',
                            order: 1,
                            value: 'close',
                            color: 'error',
                          },
                        },
                        {
                          isActive: false,
                          key: 'EXC_4',
                          order: 3,
                          description: {
                            isActive: true,
                            key: 'description',
                            order: 0,
                            value:
                              'Reportes realizados después de 72 horas o con documentación incompleta tras 30 días.',
                            aria: 'Reportes realizados después de 72 horas o con documentación incompleta tras 30 días.',
                          },
                          icon: {
                            isActive: true,
                            key: 'icon',
                            order: 1,
                            value: 'close',
                            color: 'error',
                          },
                        },
                      ],
                      title: {
                        isActive: true,
                        key: 'title',
                        order: 0,
                        value: 'No cubrimos...',
                        aria: 'No cubrimos...',
                      },
                    },
                    actionDownloadCertificate: {
                      isActive: true,
                      key: 'actionDownloadCertificate',
                      order: 2,
                      value: 'Previsualizar certificado',
                      aria: 'Previsualizar certificado',
                    },
                  },
                },
              },
            },
          },
        },
      },
      flow: flowValues,
      global: globalValues,
    })

    // const wrapper = createWrapper({
    //   flow: { ...flowValues },
    //   app: {
    //     portal: {
    //       productDetail: {
    //         coverages: [
    //           {
    //             key: 'coverageCode1',
    //             order: 1,
    //             isActive: false,
    //             title: 'coverageName1',
    //             subTitle: 'coverageSubtitle1',
    //             description: 'coverageDescription1',
    //             aria: 'coverageAria1',
    //             icon: 'coverage1',
    //           },
    //           {
    //             key: 'coverageCode2',
    //             order: 2,
    //             isActive: false,
    //             title: 'coverageName2',
    //             subTitle: 'coverageSubtitle2',
    //             description: 'coverageDescription2',
    //             aria: 'coverageAria2',
    //             icon: 'coverage2',
    //           },
    //         ],
    //       },
    //     },
    //     lopdp: {
    //       url: 'url',
    //       acceptedTermsConditions: true,
    //       hasConsent: true,
    //     },
    //   },
    //   global: {
    //     authEvent: { ...authEventValues },
    //   },
    // })

    const { result } = renderHook(() => useContentProductDetailPage(), {
      wrapper: createWrapperStore(store),
    })

    console.log(result.current.coverages.coverages.items)

    expect(result.current.coverages.coverages.items).toEqual([])
    // expect(result.current.coverages.exclusions.items).toEqual([])
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

  it('should navigate to product page when handleContinue is called', async () => {
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

    expect(navigateMock).toBeCalledWith(APP_ROUTES.PRODUCT_DETAIL)
  })
})
