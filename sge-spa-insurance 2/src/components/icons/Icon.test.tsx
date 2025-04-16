import { render, screen } from '@testing-library/react'
import BPIcon from './BPIcon'
import DownloadIcon from './DownloadIcon'
import FraudsIcon from './FraudsIcon'
import InsuranceIcon from './InsuranceIcon'
import ArrowIcon from './ArrowIcon'
import SuccessIcon from './SuccessIcon'
import WhatsappIcon from './WhatsappIcon'
import ArrowBackIcon from './ArrowBackIcon'

describe('<BPIcon />', () => {
  it('should render the component', () => {
    render(<BPIcon />)

    const iconEl = screen.getByRole('img', {
      hidden: true,
    })

    expect(iconEl).toBeInTheDocument()
  })

  it('should render the component with and height', () => {
    render(<BPIcon width={100} height={100} />)

    const iconEl = screen.getByRole('img', {
      hidden: true,
    })

    expect(iconEl).toBeInTheDocument()
    expect(iconEl).toHaveStyle({ width: '100', height: '100' })
  })
})

describe('<DownloadIcon />', () => {
  it('should render the component', () => {
    render(<DownloadIcon />)

    const iconEl = screen.getByRole('img', {
      hidden: true,
    })

    expect(iconEl).toBeInTheDocument()
  })

  it('should render the component with and height', () => {
    render(<DownloadIcon width={100} height={100} />)

    const iconEl = screen.getByRole('img', {
      hidden: true,
    })

    expect(iconEl).toBeInTheDocument()
    expect(iconEl).toHaveStyle({ width: '100', height: '100' })
  })
})

describe('<ArrowBackIcon />', () => {
  it('should render the component', () => {
    render(<ArrowBackIcon />)

    const iconEl = screen.getByRole('img', {
      hidden: true,
    })

    expect(iconEl).toBeInTheDocument()
  })

  it('should render the component with and height', () => {
    render(<ArrowBackIcon width={100} height={100} />)

    const iconEl = screen.getByRole('img', {
      hidden: true,
    })

    expect(iconEl).toBeInTheDocument()
    expect(iconEl).toHaveStyle({ width: '100', height: '100' })
  })
})

describe('<FraudsIcon />', () => {
  it('should be render', () => {
    render(<FraudsIcon />)

    const iconEl = screen.getByRole('img', {
      hidden: true,
    })

    expect(iconEl).toMatchSnapshot()
  })
})

describe('<InsuranceIcon />', () => {
  it('should be render', () => {
    render(<InsuranceIcon />)

    const iconEl = screen.getByRole('img', {
      hidden: true,
    })

    expect(iconEl).toMatchSnapshot()
  })
})

describe('<SuccessIcon />', () => {
  it('should be render', () => {
    render(<SuccessIcon />)

    const iconEl = screen.getByRole('img', {
      hidden: true,
    })

    expect(iconEl).toMatchSnapshot()
  })
})

describe('<WhatsappIcon />', () => {
  it('should be render', () => {
    render(<WhatsappIcon />)

    const iconEl = screen.getByRole('img', {
      hidden: true,
    })

    expect(iconEl).toMatchSnapshot()
  })
})

describe('<ArrowIcon />', () => {
  it('should render ArrowIcon', () => {
    render(
      <ArrowIcon
        direction="down"
        fill="#FFF"
        width={24}
        height={24}
        viewBox="0 0 24 24"
        dataTestId="arrow"
      />
    )

    const iconEl = screen.getByTestId('arrow')

    expect(iconEl).toMatchSnapshot()
  })
})
