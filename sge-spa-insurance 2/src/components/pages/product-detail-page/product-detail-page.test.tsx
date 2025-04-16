import { createWrapper } from '@app/__test__/wrappers'
import { render } from '@testing-library/react'
import ProductDetailPage from './product-detail-page'
import useIntersectionObserver from '@app/hooks/use-intersection-observer/use-intersection-observer'

jest.mock('@app/hooks/use-intersection-observer/use-intersection-observer')
const useIntersectionObserverMock = useIntersectionObserver as jest.Mock

describe('<ProductDetailPage />', () => {
  beforeEach(() => {
    useIntersectionObserverMock.mockReturnValue({ isIntersecting: true })
  })

  it('should render correctly', () => {
    const wrapper = createWrapper({
      app: {
        portal: {
          productDetail: {
            title: {
              value: 'title',
              aria: 'titleAria',
            },
            description: {
              value: 'description',
              aria: 'descriptionAria',
            },
            alert: {
              description: 'alertDescription',
              action: {
                value: 'alertAction',
                aria: 'alertActionAria',
              },
            },
            coverages: [
              {
                key: 'coverageCode1',
                order: 1,
                isActive: true,
                title: 'coverageName1',
                subTitle: 'coverageSubtitle1',
                description: 'coverageDescription1',
                aria: 'coverageAria1',
                icon: 'coverage1',
              },
              {
                key: 'coverageCode2',
                order: 2,
                isActive: true,
                title: 'coverageName2',
                subTitle: 'coverageSubtitle2',
                description: 'coverageDescription2',
                aria: 'coverageAria2',
                icon: 'coverage2',
              },
            ],
            faq: {
              title: {
                value: 'faqTitle',
                aria: 'faqTitleAria',
              },
              questions: [
                {
                  key: 'faqKey1',
                  order: 1,
                  isActive: true,
                  track: 'faqTrack1',
                  title: 'faqTitle1',
                  answer: 'faqAnswer1',
                },
                {
                  key: 'faqKey2',
                  order: 2,
                  isActive: true,
                  track: 'faqTrack2',
                  title: 'faqTitle2',
                  answer: 'faqAnswer2',
                },
              ],
            },
            legal: {
              description: 'legalDescription',
              action: 'legalAction',
            },
          },
        },
      },
    })

    const { container } = render(<ProductDetailPage />, { wrapper })

    expect(container).toMatchSnapshot()
  })
})
