import { render } from '@testing-library/react'
import ModalCoverage from './modal-coverage'

describe('<ModalCoverage />', () => {
  it('should render the component', () => {
    const propsModal = {
      title: {
        value: 'title test',
        aria: 'title test',
      },
      description: {
        value: 'title test',
        aria: 'title test',
      },
      actionDownloadCertificate: {
        value: 'title test',
        aria: 'title test',
      },
      exclusions: {
        title: {
          value: 'title test',
          aria: 'title test',
        },
        items: [
          {
            key: 'title test',
            description: {
              value: 'title test',
              aria: 'title test',
            },
            icon: (
              <pichincha-icon
                size="24px"
                type="--outlined"
                color="blue"
                weight_color="500"
                aria-hidden="true"
              >
                close
              </pichincha-icon>
            ),
          },
        ],
      },
      coverages: {
        title: {
          value: 'title test',
          aria: 'title test',
        },
        items: [
          {
            key: 'title test',
            description: {
              value: 'title test',
              aria: 'title test',
            },
            icon: (
              <pichincha-icon
                size="24px"
                type="--outlined"
                color="blue"
                weight_color="500"
                aria-hidden="true"
              >
                close
              </pichincha-icon>
            ),
          },
        ],
      },
      handleClose: () => console.log('close'),
    }

    const { container } = render(<ModalCoverage {...propsModal} />)

    expect(container).toMatchSnapshot()
  })
})
