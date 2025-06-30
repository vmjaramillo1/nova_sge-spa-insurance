import { render, screen } from '@testing-library/react'
import BPIcon from './BPIcon'
import DownloadIcon from './DownloadIcon'
import ArrowIcon from './ArrowIcon'
import ArrowBackIcon from './ArrowBackIcon'
import FamilyUnitIcon from './FamilyUnitIcon'
import CheckIcon from './CheckIcon'
import AdminMedsIcon from './AdminMedsIcon'
import ClinicalNotesIcon from './ClinicalNotesIcon'
import DocumentCheckIcon from './DocumentCheckIcon'
import EcgHeartIcon from './EcgHeartIcon'
import ExperimentIcon from './ExperimentIcon'
import FavoriteIcon from './FavoriteIcon'
import FraudsIconBanner from './FraudsIconBanner'
import InsuranceIconLifeHealth from './InsuranceIconLifeHealth'
import InsuranceIconTuBanPro from './InsuranceIconTuBanPro'
import LifeIconBanner from './LifeIconBanner'
import MasterCard from './MasterCard'
import SuccessFraudIcon from './SuccessFraudIcon'
import SuccessIcon from './SuccessIcon'
import VisaIcon from './VisaIcon'
import WhatsappIcon from './WhatsappIcon'

describe('<AdminMedsIcon />', () => {
  it('should render AdminMedsIcon', () => {
    render(<AdminMedsIcon />)

    const iconEl = screen.getByRole('img', {
      hidden: true,
    })

    expect(iconEl).toMatchSnapshot()
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

describe('<CheckIcon />', () => {
  it('should render CheckIcon', () => {
    render(<CheckIcon width={18} height={18} />)

    const iconEl = screen.getByRole('img', {
      hidden: true,
    })

    expect(iconEl).toBeInTheDocument()
    expect(iconEl).toHaveStyle({ width: '18', height: '18' })
  })
})

describe('<ClinicalNotesIcon />', () => {
  it('should render ClinicalNotesIcon', () => {
    render(<ClinicalNotesIcon />)

    const iconEl = screen.getByRole('img', {
      hidden: true,
    })

    expect(iconEl).toMatchSnapshot()
  })
})

describe('<DocumentCheckIcon />', () => {
  it('should render ClinicalNotesIcon', () => {
    render(<DocumentCheckIcon />)

    const iconEl = screen.getByRole('img', {
      hidden: true,
    })

    expect(iconEl).toMatchSnapshot()
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

describe('<EcgHeartIcon />', () => {
  it('should be render', () => {
    render(<EcgHeartIcon />)

    const iconEl = screen.getByRole('img', {
      hidden: true,
    })

    expect(iconEl).toMatchSnapshot()
  })
})

describe('<ExperimentIcon />', () => {
  it('should be render', () => {
    render(<ExperimentIcon />)

    const iconEl = screen.getByRole('img', {
      hidden: true,
    })

    expect(iconEl).toMatchSnapshot()
  })
})

describe('<FamilyUnitIcon />', () => {
  it('should render FamilyUnitIcon', () => {
    render(<FamilyUnitIcon />)

    const iconEl = screen.getByRole('img', {
      hidden: true,
    })

    expect(iconEl).toMatchSnapshot()
  })
})

describe('<FavoriteIcon />', () => {
  it('should render FavoriteIcon', () => {
    render(<FavoriteIcon />)

    const iconEl = screen.getByRole('img', {
      hidden: true,
    })

    expect(iconEl).toMatchSnapshot()
  })
})

describe('<FraudsIconBanner />', () => {
  it('should render FraudsIconBanner', () => {
    render(<FraudsIconBanner />)

    const iconEl = screen.getByRole('img', {
      hidden: true,
    })

    expect(iconEl).toMatchSnapshot()
  })
})

describe('<InsuranceIconLifeHealth />', () => {
  it('should render InsuranceIconLifeHealth', () => {
    render(<InsuranceIconLifeHealth />)

    const iconEl = screen.getByRole('img', {
      hidden: true,
    })

    expect(iconEl).toMatchSnapshot()
  })
})

describe('<LifeIconBanner />', () => {
  it('should render LifeIconBanner', () => {
    render(<LifeIconBanner />)

    const iconEl = screen.getByRole('img', {
      hidden: true,
    })

    expect(iconEl).toMatchSnapshot()
  })
})

describe('<MasterCard />', () => {
  it('should render MasterCard', () => {
    render(<MasterCard />)

    const iconEl = screen.getByRole('img', {
      hidden: true,
    })

    expect(iconEl).toMatchSnapshot()
  })
})

describe('<SuccessFraudIcon />', () => {
  it('should render SuccessFraudIcon', () => {
    render(<SuccessFraudIcon />)

    const iconEl = screen.getByRole('img', {
      hidden: true,
    })

    expect(iconEl).toMatchSnapshot()
  })
})

describe('<SuccessIcon />', () => {
  it('should be render SuccessIcon', () => {
    render(<SuccessIcon />)

    const iconEl = screen.getByRole('img', {
      hidden: true,
    })

    expect(iconEl).toMatchSnapshot()
  })
})

describe('<VisaIcon />', () => {
  it('should be render VisaIcon', () => {
    render(<VisaIcon />)

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

describe('<InsuranceIcon />', () => {
  it('should be render', () => {
    render(<InsuranceIconTuBanPro width={56} height={56} />)

    const iconEl = screen.getByRole('img', {
      hidden: true,
    })

    expect(iconEl).toBeInTheDocument()
    expect(iconEl).toHaveStyle({ width: '56', height: '56' })
  })
})
