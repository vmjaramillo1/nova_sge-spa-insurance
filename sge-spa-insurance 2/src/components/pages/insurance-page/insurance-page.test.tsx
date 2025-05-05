import { render } from '@testing-library/react'
import InsurancePage from './insurance-page'
import useIntersectionObserver from '@app/hooks/use-intersection-observer/use-intersection-observer'
import { createWrapper } from '@app/__test__/wrappers'
import { FullIdentityEvent } from '@app/context/global-context'

jest.mock('@app/hooks/use-intersection-observer/use-intersection-observer')
const useIntersectionObserverMock = useIntersectionObserver as jest.Mock

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

describe('<InsurancePage />', () => {
  beforeEach(() => {
    useIntersectionObserverMock.mockReturnValue({ isIntersecting: true })
  })

  it('should render correctly', () => {
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
        hasOffer: false,
      },
      global: {
        authEvent: { ...authEventValues },
      },
    })

    const { container } = render(<InsurancePage />, { wrapper })

    expect(container).toMatchSnapshot()
  })
})
