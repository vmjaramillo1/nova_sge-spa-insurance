import { act, renderHook } from '@testing-library/react'
import useProductDetailPage, {
  useContentProductDetailPage,
} from './use-product-detail-page'
import { APP_ROUTES } from '@app/routes/config'
import { createWrapper } from '@app/__test__/wrappers'
import InsuranceService from '@app/services/insurance'
import MockAdapter from 'axios-mock-adapter'
import axios from 'axios'
import { useNavigate } from 'react-router-dom'
import { pushTrackEvent, openBrowser } from '@app/utils/messages'
import { FullIdentityEvent } from '@app/context/global-context'
import useIntersectionObserver from '@app/hooks/use-intersection-observer/use-intersection-observer'

jest.mock('@app/utils/messages')
jest.mock('@app/hooks/use-intersection-observer/use-intersection-observer')

const useIntersectionObserverMock = useIntersectionObserver as jest.Mock
const axiosMock = new MockAdapter(axios)

const flowValues = {
  key: 'key',
  transactionReference: 'transactionReference',
}

const authEventValues: FullIdentityEvent = {
  channel: 'channel',
  cif: 'cif',
  clientId: 'clientId',
  clientIdType: 'clientIdType',
  deeplink: 'deeplink',
  device: 'device',
  guid: 'guid',
  ip: 'ip',
  os: 'android',
  jwtToken: 'jwtToken',
  screenWidth: 'screenWidth',
  session: 'sessionId',
  xsrf: 'xsrf',
}

jest.mock('react-router-dom', () => ({
  ...jest.requireActual('react-router-dom'),
  useNavigate: jest.fn(),
}))

const useNavigateMock = useNavigate as jest.Mock

describe('useContentProductDetailPage', () => {
  it('should return reduced content', () => {
    const wrapper = createWrapper({
      flow: { ...flowValues },
      app: {
        portal: {
          productDetail: {
            coverages: [],
          },
        },
      },
      global: {
        authEvent: { ...authEventValues },
      },
    })
    const { result } = renderHook(() => useContentProductDetailPage(), { wrapper })

    expect(result.current.content).toStrictEqual({
      coverages: [],
    })
  })

  it('should return filtered and sorted coverages', () => {
    const wrapper = createWrapper({
      flow: { ...flowValues },
      app: {
        portal: {
          productDetail: {
            coverages: [
              {
                key: 'coverageCode1',
                order: 1,
                isActive: false,
                title: 'coverageName1',
                subTitle: 'coverageSubtitle1',
                description: 'coverageDescription1',
                aria: 'coverageAria1',
                icon: 'coverage1',
              },
              {
                key: 'coverageCode2',
                order: 2,
                isActive: false,
                title: 'coverageName2',
                subTitle: 'coverageSubtitle2',
                description: 'coverageDescription2',
                aria: 'coverageAria2',
                icon: 'coverage2',
              },
            ],
          },
        },
        lopdp: {
          url: 'url',
          acceptedTermsConditions: true,
          hasConsent: true,
        },
      },
      global: {
        authEvent: { ...authEventValues },
      },
    })

    const { result } = renderHook(() => useContentProductDetailPage(), { wrapper })

    expect(result.current.coverages).toEqual([])
  })
})

describe('useProductDetailPage', () => {
  beforeEach(() => {
    jest.clearAllMocks()
    axiosMock.reset()
    useIntersectionObserverMock.mockReturnValue({ isIntersecting: true })
  })

  it('should return the correct values', () => {
    const wrapper = createWrapper()
    const { result } = renderHook(() => useProductDetailPage(), { wrapper })

    expect(result.current.acceptTC).toBe(false)
    expect(result.current.handleAcceptTC).toBeInstanceOf(Function)
    expect(result.current.handleContinue).toBeInstanceOf(Function)
    expect(result.current.handleDownloadUseGuide).toBeInstanceOf(Function)
    expect(result.current.handleLopdp).toBeInstanceOf(Function)
  })

  it('should change acceptTC when handleAcceptTC is called', () => {
    const wrapper = createWrapper()

    const { result } = renderHook(() => useProductDetailPage(), { wrapper })

    act(() => {
      result.current.handleAcceptTC(true)
    })

    expect(result.current.acceptTC).toBe(true)
  })

  it('should stop when response is not success', async () => {
    const navigateMock = jest.fn()
    useNavigateMock.mockReturnValue(navigateMock)

    axiosMock.onPost().reply(200, {
      code: '500',
      message: 'Error',
    })

    const wrapper = createWrapper({
      flow: { ...flowValues },
      app: {
        lopdp: {
          url: 'url',
          acceptedTermsConditions: false,
          hasConsent: false,
        },
      },
      global: {
        authEvent: { ...authEventValues },
      },
    })

    const { result } = renderHook(() => useProductDetailPage(), { wrapper })

    act(() => {
      result.current.handleAcceptTC(true)
    })

    await act(async () => {
      await result.current.handleContinue()
    })

    expect(navigateMock).not.toBeCalled()
  })

  it('should call Insurance.consent when not acceptedTermsConditions', async () => {
    useNavigateMock.mockReturnValue(jest.fn())

    axiosMock.onPost().reply(200, {
      code: '0',
      message: 'Ok',
    })

    const wrapper = createWrapper({
      flow: { ...flowValues },
      app: {
        lopdp: {
          url: 'url',
          acceptedTermsConditions: false,
          hasConsent: false,
        },
      },
      global: {
        authEvent: { ...authEventValues },
      },
    })

    const spyConcentLopdp = jest.spyOn(InsuranceService, 'consentLopdp')

    const { result } = renderHook(() => useProductDetailPage(), { wrapper })

    act(() => {
      result.current.handleAcceptTC(true)
    })

    await act(async () => {
      await result.current.handleContinue()
    })

    expect(spyConcentLopdp).toBeCalledWith({
      acceptedTermsConditions: true,
      hasConsent: true,
      action: 'UPDATE_ACCEPT_ACTION_CODE',
      url: 'url',
      identity: { cif: 'cif', dni: 'clientId', dniType: 'clientIdType' },
    })
  })

  it('should navigate to product page when handleContinue is called', async () => {
    const navigateMock = jest.fn()
    useNavigateMock.mockReturnValue(navigateMock)

    const wrapper = createWrapper({
      flow: { ...flowValues },
      app: {
        lopdp: {
          url: 'url',
          acceptedTermsConditions: true,
          hasConsent: true,
        },
      },
      global: {
        authEvent: { ...authEventValues },
      },
    })

    const { result } = renderHook(() => useProductDetailPage(), { wrapper })

    await act(async () => {
      await result.current.handleContinue()
    })

    expect(navigateMock).toBeCalledWith(APP_ROUTES.PRODUCT)
  })

  it('should call InsuranceService.findDocuments when handleDownloadUseGuide is called', () => {
    const wrapper = createWrapper({
      flow: { ...flowValues },
      app: {
        lopdp: {
          url: 'url',
          acceptedTermsConditions: true,
          hasConsent: true,
        },
      },
      global: {
        authEvent: { ...authEventValues },
      },
    })

    const spyFindDocuments = jest.spyOn(InsuranceService, 'findDocuments')

    const { result } = renderHook(() => useProductDetailPage(), { wrapper })

    act(() => {
      result.current.handleDownloadUseGuide()
    })

    expect(spyFindDocuments).toBeCalledWith({
      transactionReference: 'transactionReference',
      key: 'key',
      identity: {
        cif: 'cif',
        dni: 'clientId',
        dniType: 'clientIdType',
      },
      documentsReference: ['DOC_FRAUDS_USE_GUIDE'],
    })
  })

  it('should call pushTrackEvent and openBrowser when handleLopdp is called', () => {
    const wrapper = createWrapper({
      flow: { ...flowValues },
      app: {
        lopdp: {
          url: 'url',
          acceptedTermsConditions: true,
          hasConsent: true,
        },
      },
      global: {
        authEvent: { ...authEventValues },
      },
    })

    const { result } = renderHook(() => useProductDetailPage(), { wrapper })

    const pushTrackEventMock = pushTrackEvent as jest.Mock
    const openBrowserMock = openBrowser as jest.Mock

    act(() => {
      result.current.handleLopdp()
    })

    expect(pushTrackEventMock).toBeCalledWith('BM_Segu_Frau_01Onbor_Link_Dwl_Lopdp')
    expect(openBrowserMock).toBeCalledWith('url')
  })
})
